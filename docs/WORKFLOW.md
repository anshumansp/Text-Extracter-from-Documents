# **Workflow for Text Extraction Application**

This document outlines a detailed workflow to create a **Text Extraction Application** using **Node.js**. The application will support text extraction from images, PDFs, and diagrams (like flowcharts) while handling both printed and handwritten text. It will use free libraries and APIs to ensure cost efficiency.

## **1. Project Setup**

### **1.1. Install Required Tools**
- **Node.js**: Download and install the latest LTS version from [Node.js](https://nodejs.org/).
- **Code Editor**: Install Visual Studio Code (VS Code) or any preferred IDE.

### **1.2. Project Initialization**
1. Create a new directory for the project:

2. Initialize a Node.js project:
   ```bash
   npm init -y
   ```
3. Install necessary dependencies:
   ```bash
   npm install express multer tesseract.js sharp pdf-lib @google-cloud/vision
   ```

### **1.3. Project Structure**
```
text-extraction-app/
├── node_modules/
├── uploads/        # Stores uploaded files
├── src/            # Core logic of the app
│    ├── server.js  # Main server file
│    ├── utils/
│         ├── imageProcessing.js   # Image preprocessing logic
│         ├── textExtraction.js    # Text extraction logic
│         ├── pdfProcessing.js     # PDF processing logic
│         ├── flowchartDetection.js # Flowchart detection logic
└── package.json
```

---

## **2. Application Flow**

1. **File Upload**: User uploads an image, PDF, or document.
2. **Image Preprocessing**: Enhance the quality of the image (grayscale, contrast, etc.).
3. **File Type Handling**: If it's a PDF, extract images from the PDF.
4. **Text Extraction**: Use OCR (Tesseract.js) to extract printed or handwritten text.
5. **Flowchart/Diagram Detection**: Detect and extract diagram data.
6. **Response**: Return extracted text, flowchart data, and file status.

---

## **3. Detailed Workflow**

### **3.1. File Upload**
- **Tools**: Use **Multer** to upload files.
- **Route**: `/upload`

**Code Snippet:**
```javascript
const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ message: 'File uploaded successfully', filePath: req.file.path });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

### **3.2. Image Preprocessing**
- **Tools**: Use **Sharp** for image preprocessing.
- **Objective**: Convert image to grayscale, resize it, and adjust contrast for better OCR performance.

**Code Snippet:**
```javascript
const sharp = require('sharp');

async function preprocessImage(filePath) {
  const processedImagePath = filePath.replace(/\.[^/.]+$/, ".png");
  await sharp(filePath)
    .grayscale()
    .resize(1000, 1000, { fit: 'inside' })
    .toFile(processedImagePath);
  return processedImagePath;
}

module.exports = { preprocessImage };
```

---

### **3.3. Extract Text from Images**
- **Tools**: Use **Tesseract.js** for Optical Character Recognition (OCR).
- **Objective**: Extract both printed and handwritten text from images.

**Code Snippet:**
```javascript
const Tesseract = require('tesseract.js');

async function extractTextFromImage(filePath) {
  const { data: { text } } = await Tesseract.recognize(filePath, 'eng', {
    logger: (m) => console.log(m.progress)
  });
  return text;
}

module.exports = { extractTextFromImage };
```

---

### **3.4. PDF File Handling**
- **Tools**: Use **PDF-lib** to extract images from PDF files.
- **Objective**: Extract images from PDFs and prepare them for OCR.

**Code Snippet:**
```javascript
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');

async function extractImagesFromPDF(filePath) {
  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();

  for (let i = 0; i < pages.length; i++) {
    const { width, height } = pages[i].getSize();
    const imageBytes = await pages[i].getImage();
    const outputImagePath = `./uploads/page-${i + 1}.png`;

    await sharp(imageBytes)
      .resize(width, height)
      .toFile(outputImagePath);
  }
}

module.exports = { extractImagesFromPDF };
```

---

### **3.5. Flowchart Detection**
- **Tools**: Use Google Vision API.
- **Objective**: Detect and extract diagrams or flowcharts from images.

**Code Snippet:**
```javascript
const vision = require('@google-cloud/vision');

async function detectFlowchart(filePath) {
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.objectLocalization(filePath);
  return result.localizedObjectAnnotations;
}

module.exports = { detectFlowchart };
```

---

## **4. Deployment**

### **4.1. Hosting**
- Use **Render** or **Railway** for free deployment.
- Add build and start scripts to `package.json`:
  ```json
  "scripts": {
    "start": "node src/server.js"
  }
  ```

### **4.2. Deploy Steps**
1. Create an account on [Render](https://render.com/).
2. Link your GitHub repository.
3. Deploy the service.

---

## **5. Error Handling**
- **File Type Errors**: Check file extensions (e.g., .png, .jpg, .pdf).
- **File Size Errors**: Limit file sizes using **Multer**.
- **API Rate Limits**: Handle API request limits for Google Vision.

---

## **6. Enhancements & Future Scope**
- **UI/UX**: Build a simple front-end to allow file uploads.
- **Data Storage**: Store files and extracted text in a database (like MongoDB).
- **Custom ML Models**: Create custom models for diagram detection.

---

## **7. Summary of Key Libraries**
| **Library**      | **Purpose**                |
|-----------------|--------------------------|
| **Express**      | Server creation           |
| **Multer**       | File uploads              |
| **Sharp**        | Image preprocessing       |
| **Tesseract.js** | OCR for printed/handwritten text |
| **PDF-lib**      | PDF processing            |
| **Google Vision**| Flowchart/diagram detection |

---

By following this workflow, you'll have a fully functional **Text Extraction Application** capable of processing images, PDFs, and diagrams while handling handwritten and printed text. You can deploy it on **Render** or **Railway** to make it accessible online. Each module is modular and can be reused or enhanced for future updates. Let me know if you'd like any adjustments or additions to this workflow.

