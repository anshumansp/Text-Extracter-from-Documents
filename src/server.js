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

const fileFilter = (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || '').split(',');
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
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
    let processedImage = null;
    
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

        const fileType = path.extname(req.file.originalname).toLowerCase();
        let result = {};

        try {
            switch (fileType) {
                case '.png':
                case '.jpg':
                case '.jpeg':
                    console.log('Processing image file...');
                    processedImage = await processImage(req.file.path);
                    console.log('Image processed, extracting text...');
                    const text = await extractText(processedImage);
                    result = { text };
                    break;

                case '.pdf':
                    console.log('Processing PDF file...');
                    result = await processPDF(req.file.path);
                    break;

                default:
                    throw new Error(`Unsupported file type: ${fileType}`);
            }

            res.json({
                success: true,
                data: result
            });

        } finally {
            // Cleanup files after response is sent
            if (processedImage) {
                await safeFileCleanup(processedImage);
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

// Test endpoint for image text extraction
app.post('/api/test-ocr', upload.single('file'), async (req, res) => {
    let processedImage = null;
    
    try {
        if (!req.file) {
            return res.status(400).json({
                error: {
                    message: 'No image uploaded',
                    code: 'NO_FILE'
                }
            });
        }

        const fileType = path.extname(req.file.originalname).toLowerCase();
        if (!['.png', '.jpg', '.jpeg'].includes(fileType)) {
            return res.status(400).json({
                error: {
                    message: 'Invalid file type. Please upload a PNG or JPEG image.',
                    code: 'INVALID_FILE_TYPE'
                }
            });
        }

        processedImage = await processImage(req.file.path);
        const text = await extractText(processedImage);
        console.log(text);

        res.json({
            success: true,
            data: {
                text,
                originalFile: req.file.originalname
            }
        });
    } catch (error) {
        console.error('OCR Test Error:', error);
        res.status(500).json({
            error: {
                message: error.message,
                code: error.code || 'OCR_ERROR'
            }
        });
    } finally {
        // Cleanup files after response is sent
        if (processedImage) {
            await safeFileCleanup(processedImage);
        }
        if (req.file) {
            await safeFileCleanup(req.file.path);
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
