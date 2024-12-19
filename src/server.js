const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const { processImage } = require('./utils/imageProcessing');
const { extractText } = require('./utils/textExtraction');
const { processPDF } = require('./utils/pdfProcessing');
const { detectDiagrams } = require('./utils/diagramsDetection');
const ensureDirectories = require('./middleware/ensureDirectories');
const errorLogger = require('./middleware/errorLogger');
const { 
    extractTextFromPDF, 
    extractTextFromDocx, 
    extractDataFromExcel 
} = require('./utils/documentProcessing');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(ensureDirectories);

// Add this near the top of the file
const PROJECT_ROOT = path.resolve(__dirname, '..');

let fileCounter = 1;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(PROJECT_ROOT, process.env.UPLOAD_DIR || 'uploads');
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        const ext = path.extname(fileName);
        const basename = path.basename(fileName, ext);
        
        // Add counter only if file exists
        const finalName = `${basename}${ext}`;
        if (fs.existsSync(path.join(PROJECT_ROOT, 'uploads', finalName))) {
            cb(null, `${basename}_${fileCounter++}${ext}`);
        } else {
            cb(null, finalName);
        }
    }
});

// Update fileFilter in multer configuration
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'image/jpeg',
        'image/png'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Supported types: PDF, DOCX, XLSX, XLS, JPG, PNG'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB default
    }
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal server error',
            code: err.code || 'INTERNAL_ERROR'
        }
    });
};

// Add this utility function at the top of server.js
async function safeFileCleanup(filePath) {
    try {
        await fs.promises.access(filePath);
        await fs.promises.unlink(filePath);
        console.log(`Successfully cleaned up file: ${filePath}`);
    } catch (error) {
        if (error.code === 'EPERM') {
            console.warn(`File is locked, will be cleaned up later: ${filePath}`);
            // Schedule cleanup for later
            setTimeout(async () => {
                try {
                    await fs.promises.unlink(filePath);
                    console.log(`Delayed cleanup successful: ${filePath}`);
                } catch (err) {
                    console.error(`Failed delayed cleanup: ${filePath}`, err);
                }
            }, 1000); // Try again after 1 second
        } else {
            console.warn(`Failed to cleanup file: ${filePath}`, error);
        }
    }
}

// Routes
// Update the /api/extract route
app.post('/api/extract', upload.single('file'), async (req, res, next) => {
    let processedFile = null;
    
    try {
        console.log('Processing upload request...');

        if (!req.file) {
            const error = new Error('No file uploaded');
            error.status = 400;
            error.code = 'NO_FILE_UPLOADED';
            throw error;
        }

        console.log('File received:', {
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype
        });

        let result = {};

        try {
            switch (req.file.mimetype) {
                case 'application/pdf':
                    result = { text: await extractTextFromPDF(req.file.path) };
                    break;

                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    result = { text: await extractTextFromDocx(req.file.path) };
                    break;

                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                case 'application/vnd.ms-excel':
                    result = { data: await extractDataFromExcel(req.file.path) };
                    break;

                case 'image/jpeg':
                case 'image/png':
                    processedFile = await processImage(req.file.path);
                    const text = await extractText(processedFile);
                    result = { text };
                    break;

                default:
                    throw new Error('Unsupported file type');
            }

            res.json({
                success: true,
                data: result
            });

        } finally {
            // Cleanup files after response is sent
            if (processedFile) {
                await safeFileCleanup(processedFile);
            }
            if (req.file) {
                await safeFileCleanup(req.file.path);
            }
        }
    } catch (error) {
        console.error('Processing error:', error);
        next(error);
    }
});

// Unified test endpoint for all file types
app.post('/api/process', upload.single('file'), async (req, res) => {
    let processedFile = null;
    
    try {
        if (!req.file) {
            return res.status(400).json({
                error: {
                    message: 'No file uploaded',
                    code: 'NO_FILE'
                }
            });
        }

        console.log('Processing file:', {
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            path: req.file.path
        });

        let result;
        // First, check by mimetype for documents
        switch (req.file.mimetype) {
            case 'application/pdf':
                result = { text: await extractTextFromPDF(req.file.path) };
                break;

            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                result = { text: await extractTextFromDocx(req.file.path) };
                break;

            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            case 'application/vnd.ms-excel':
                result = { data: await extractDataFromExcel(req.file.path) };
                break;

            case 'image/jpeg':
            case 'image/png':
                // Process image files
                processedFile = await processImage(req.file.path);
                const text = await extractText(processedFile);
                result = { text };
                break;

            default:
                // If mimetype check fails, try checking by file extension
                const fileType = path.extname(req.file.originalname).toLowerCase();
                if (['.png', '.jpg', '.jpeg'].includes(fileType)) {
                    processedFile = await processImage(req.file.path);
                    const text = await extractText(processedFile);
                    result = { text };
                } else if (fileType === '.pdf') {
                    result = { text: await extractTextFromPDF(req.file.path) };
                } else if (fileType === '.docx') {
                    result = { text: await extractTextFromDocx(req.file.path) };
                } else if (['.xlsx', '.xls'].includes(fileType)) {
                    result = { data: await extractDataFromExcel(req.file.path) };
                } else {
                    return res.status(400).json({
                        error: {
                            message: 'Unsupported file type. Please upload a PDF, DOCX, XLSX, or image file (PNG/JPG).',
                            code: 'UNSUPPORTED_FILE_TYPE'
                        }
                    });
                }
        }

        console.log("Result:", result);

        // Add metadata to the response
        const response = {
            success: true,
            data: result,
            metadata: {
                originalFile: req.file.originalname,
                fileType: req.file.mimetype,
                processedAt: new Date().toISOString()
            }
        };

         // For images and PDFs, add additional processing info
         if (result.text) {
            response.metadata.textLength = result.text.length;
            response.metadata.wordCount = result.text.split(/\s+/).length;
        }
        // For Excel files, add sheet information
        if (result.data) {
            response.metadata.sheets = Object.keys(result.data);
            response.metadata.totalRows = Object.values(result.data)
                .reduce((total, sheet) => total + sheet.length, 0);
        }

        res.json(response);

    } catch (error) {
        console.error('Processing error:', error);
        res.status(500).json({
            error: {
                message: error.message,
                code: error.code || 'PROCESSING_ERROR',
                type: error.constructor.name
            }
        });
    } finally {
        // Cleanup files after response is sent
        try {
            if (processedFile) {
                await safeFileCleanup(processedFile);
            }
            if (req.file) {
                await safeFileCleanup(req.file.path);
            }
        } catch (cleanupError) {
            console.error('Cleanup error:', cleanupError);
        }
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use(errorLogger);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});
