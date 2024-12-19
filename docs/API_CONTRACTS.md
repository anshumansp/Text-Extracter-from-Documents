# API Documentation

## Text Extraction API Contracts

### Extract Text from File
Extracts text from images, PDFs, and diagrams.

**Endpoint:** `POST /api/extract`

**Content-Type:** `multipart/form-data`

**Request Body:**
```
file: File (Required) - Image or PDF file to process
```

**Supported File Types:**
- Images: .jpg, .jpeg, .png
- Documents: .pdf

**Maximum File Size:** 5MB

**Success Response:**
```json
{
    "success": true,
    "data": {
        "text": "string",
        "diagrams": [] // Optional, present for images with diagrams
    }
}
```

**Error Responses:**

1. File Too Large (413)
```json
{
    "error": {
        "message": "File too large",
        "code": "FILE_TOO_LARGE"
    }
}
```

2. Invalid File Type (400)
```json
{
    "error": {
        "message": "Invalid file type",
        "code": "INVALID_FILE_TYPE"
    }
}
```

3. No File Uploaded (400)
```json
{
    "error": {
        "message": "No file uploaded",
        "code": "NO_FILE"
    }
}
```

4. Processing Error (500)
```json
{
    "error": {
        "message": "Error message details",
        "code": "PROCESSING_ERROR"
    }
}
```

### Health Check
Check if the service is running.

**Endpoint:** `GET /health`

**Success Response:**
```json
{
    "status": "ok"
}
```

## Installation and Setup

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm (v6 or higher)

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd <project-directory>

   # Install dependencies
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   NODE_ENV=development
   MAX_FILE_SIZE=5242880
   ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf
   UPLOAD_DIR=uploads
   TEMP_DIR=temp
   TESSERACT_LANG=eng
   ```

4. **Directory Setup**
   ```bash
   mkdir uploads temp
   ```

5. **Running the Server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## Testing

Run tests using:
```bash
npm test
``` 