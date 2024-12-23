# **Text and Document Processing Application**

This document outlines the workflow for a Node.js application that processes various file types (images, PDFs, Word documents, and Excel sheets) and extracts text and data from them.

## **1. Project Setup**

### **1.1. Prerequisites**
- Node.js (v14 or higher)
- npm (v6 or higher)

### **1.2. Installation**
```bash
# Install dependencies
npm install express cors dotenv multer tesseract.js sharp pdf-parse mammoth xlsx

# Development dependencies
npm install nodemon --save-dev
```

### **1.3. Project Structure**
```
project-root/
├── src/
│   ├── server.js
│   ├── middleware/
│   │   ├── ensureDirectories.js
│   │   └── errorLogger.js
│   └── utils/
│       ├── imageProcessing.js
│       ├── textExtraction.js
│       ├── pdfProcessing.js
│       └── documentProcessing.js
├── uploads/        # Uploaded files
├── temp/          # Temporary processing files
├── logs/          # Error logs
├── __tests__/     # Test files
├── .env
└── package.json
```

## **2. Configuration**

### **2.1. Environment Variables (.env)**
```env
PORT=3000
NODE_ENV=development
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf
UPLOAD_DIR=uploads
TEMP_DIR=temp
TESSERACT_LANG=eng
```

## **3. Core Features**

### **3.1. File Processing**
- **Images (PNG, JPG, JPEG)**
  - Image preprocessing with Sharp
  - OCR using Tesseract.js

- **PDFs**
  - Text extraction using pdf-parse
  - PDF to image conversion for OCR

- **Word Documents (DOCX)**
  - Text extraction using mammoth

- **Excel Files (XLS, XLSX)**
  - Data extraction using xlsx
  - Conversion to JSON format

### **3.2. File Handling**
- Automatic directory creation
- Safe file cleanup
- Error logging
- File type validation
- Size limits enforcement

## **4. API Endpoints**

### **4.1. Process Files**
```http
POST /api/process
Content-Type: multipart/form-data
```

**Request Body:**
- `file`: The file to process (image/PDF/DOCX/XLSX)

**Success Response:**
```json
{
    "success": true,
    "data": {
        "text": "string" // for images, PDFs, and DOCX
        // OR
        "data": {} // for Excel files
    },
    "metadata": {
        "originalFile": "filename.ext",
        "fileType": "mimetype",
        "processedAt": "timestamp",
        "textLength": 123,      // for text files
        "wordCount": 45,        // for text files
        "sheets": ["Sheet1"],   // for Excel files
        "totalRows": 100        // for Excel files
    }
}
```

### **4.2. Health Check**
```http
GET /health
```

## **5. Error Handling**

### **5.1. Common Error Responses**
```json
{
    "error": {
        "message": "Error description",
        "code": "ERROR_CODE",
        "type": "ErrorType"
    }
}
```

### **5.2. Error Codes**
- `NO_FILE`: No file uploaded
- `INVALID_FILE_TYPE`: Unsupported format
- `FILE_TOO_LARGE`: Exceeds size limit
- `PROCESSING_ERROR`: Processing failed

## **6. Development**

### **6.1. Running the Application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### **6.2. Testing**
```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## **7. Libraries Used**

| Library | Purpose |
|---------|----------|
| express | Server framework |
| multer | File upload handling |
| sharp | Image processing |
| tesseract.js | OCR processing |
| pdf-parse | PDF text extraction |
| mammoth | Word document processing |
| xlsx | Excel file processing |
| cors | Cross-origin support |
| dotenv | Environment variables |

## **8. Best Practices**

1. **File Handling**
   - Always clean up temporary files
   - Validate file types before processing
   - Handle file locks properly

2. **Error Handling**
   - Log all errors
   - Provide meaningful error messages
   - Include error types and codes

3. **Processing**
   - Preprocess images for better OCR
   - Handle large files efficiently
   - Provide detailed metadata

4. **Security**
   - Validate file types
   - Limit file sizes
   - Clean up uploaded files
```
