# Document and Image Text Extractor

A robust Node.js application that extracts text from various file formats including images, PDFs, Word documents, and Excel sheets. The application uses OCR (Optical Character Recognition) for images and specialized libraries for document processing.

## Features

- **Multi-format Support**:
  - Images (PNG, JPG, JPEG)
  - PDF Documents
  - Word Documents (DOCX)
  - Excel Sheets (XLS, XLSX)

- **Advanced Processing**:
  - OCR for images using Tesseract.js
  - Image preprocessing for better OCR results
  - PDF text extraction
  - Excel data conversion to JSON
  - Word document text extraction

- **Robust Error Handling**:
  - File type validation
  - Size limits
  - Processing error management
  - Automatic file cleanup

- **Metadata Generation**:
  - Text length and word count
  - Sheet information for Excel files
  - Processing timestamps
  - Original file information

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

bash
git clone https://github.com/anshumansp/Text-Extracter-from-Documents.git
cd Text-Extracter-from-Documents


2. Install dependencies:

bash
npm install


3. Create environment file (.env):

env
PORT=3000
NODE_ENV=development
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf
UPLOAD_DIR=uploads
TEMP_DIR=temp
TESSERACT_LANG=eng


4. Create required directories:


## Usage

### Starting the Server

Development mode:

bash
npm run dev


Production mode:

bash
npm start


### API Endpoints

#### 1. Process Files

http
POST /api/process


- **Request**: Multipart form data with file
- **Supported File Types**: 
  - Images: .jpg, .jpeg, .png
  - Documents: .pdf, .docx
  - Spreadsheets: .xls, .xlsx

**Example Response (Image/PDF):**

json
{
"success": true,
"data": {
"text": "Extracted text content..."
},
"metadata": {
"originalFile": "sample.jpg",
"fileType": "image/jpeg",
"processedAt": "2024-03-20T10:30:00.000Z",
"textLength": 1500,
"wordCount": 250
}
}


**Example Response (Excel):**

json
{
"success": true,
"data": {
"Sheet1": [...],
"Sheet2": [...]
},
"metadata": {
"originalFile": "data.xlsx",
"fileType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
"processedAt": "2024-03-20T10:30:00.000Z",
"sheets": ["Sheet1", "Sheet2"],
"totalRows": 150
}
}


#### 2. Health Check

http
GET /health

## Error Handling

The API returns appropriate error responses with status codes:

json
{
"error": {
"message": "Error description",
"code": "ERROR_CODE",
"type": "ErrorType"
}
}

Common error codes:
- `NO_FILE`: No file uploaded
- `INVALID_FILE_TYPE`: Unsupported file format
- `FILE_TOO_LARGE`: File exceeds size limit
- `PROCESSING_ERROR`: Error during file processing

## Development

### Running Tests

bash
Run all tests
npm test
Watch mode
npm run test:watch
Coverage report
npm run test:coverage

### Project Structure

project-root/
├── src/
│ ├── server.js
│ ├── middleware/
│ │ ├── ensureDirectories.js
│ │ └── errorLogger.js
│ └── utils/
│ ├── imageProcessing.js
│ ├── textExtraction.js
│ ├── pdfProcessing.js
│ └── documentProcessing.js
├── uploads/
├── temp/
├── logs/
└── tests/


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Tesseract.js for OCR capabilities
- Sharp for image processing
- PDF-Parse for PDF text extraction
- Mammoth for Word document processing
- XLSX for Excel file handling