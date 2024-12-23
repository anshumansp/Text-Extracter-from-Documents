# React Native Testing Guide (Expo Specific)

This guide focuses on testing a React Native application built using Expo, without requiring the download of an Android emulator. It includes step-by-step instructions and API contracts for testing functionality such as OCR scanning, text analysis, and PDF generation.

---

## **Prerequisites**
1. **Expo Setup**:
   - Ensure Expo CLI is installed: `npm install -g expo-cli`.
   - Install the Expo Go app on your physical device (available on iOS and Android).

2. **Dependencies**:
   - `expo-camera`: For accessing the device camera.
   - `react-native-text-detector`: For OCR functionality.
   - `react-native-pdf-lib`: For PDF generation.

3. **Testing Tools**:
   - Use Expo's live reload feature to test your app on a physical device via the Expo Go app.
   - Install tools like **Postman** to validate any API calls.

---

## **Testing Instructions**

### 1. **Camera Functionality**

#### **Objective:** Verify that the camera captures images correctly.

**Steps:**
1. Open the app in the Expo Go app on your physical device.
2. Navigate to the camera screen.
3. Grant the camera permission when prompted.
4. Capture an image.

**Validation:**
- The captured image URI should be logged in the console.
- Verify the image URI in the device's temporary storage (or display the captured image on the screen).

**API Contract:**
```json
{
  "status": "success",
  "imageUri": "file:///path/to/captured/image.jpg"
}
```

---

### 2. **OCR Functionality**

#### **Objective:** Verify that text is accurately extracted from the captured image.

**Steps:**
1. Capture an image with clear text.
2. Process the image using the OCR function.

**Validation:**
- Detected text blocks should be logged in the console.
- Verify that the extracted text matches the text in the image.

**API Contract:**
```json
{
  "status": "success",
  "textBlocks": [
    {
      "text": "Sample Text",
      "bounding": [10, 20, 100, 50],
      "confidence": 0.95
    }
  ]
}
```

---

### 3. **Text Analysis**

#### **Objective:** Validate the text analysis and processing logic.

**Steps:**
1. Feed sample text blocks into the analysis function.
2. Check the console output for the analyzed result.

**Validation:**
- Ensure the processed text output meets the requirements (e.g., formatted text, keyword extraction).

**Example Output:**
```json
{
  "status": "success",
  "analyzedText": "Formatted Sample Text with Keywords Highlighted."
}
```

---

### 4. **PDF Generation**

#### **Objective:** Verify that the app generates PDFs correctly.

**Steps:**
1. Pass analyzed text to the PDF generation function.
2. Save the generated PDF to the device.

**Validation:**
- Verify the saved PDF file location.
- Open the file on your device to confirm the content.

**API Contract:**
```json
{
  "status": "success",
  "pdfPath": "file:///path/to/generated/output.pdf"
}
```

---

### 5. **End-to-End Testing**

#### **Objective:** Test the entire flow from image capture to PDF generation.

**Steps:**
1. Capture an image using the camera.
2. Extract text using the OCR function.
3. Process the text using the analysis function.
4. Generate a PDF from the processed text.

**Validation:**
- Ensure that the final PDF file contains the extracted and analyzed text correctly formatted.

---

## **Additional Notes**
- **Device Testing:** Always test on both iOS and Android physical devices using the Expo Go app.
- **Performance:** Monitor app performance during testing and optimize as needed.
- **Error Handling:** Verify the app's behavior with invalid input (e.g., blurry images, empty text blocks).

---

## **API Error Contracts**

### Camera Access Error
```json
{
  "status": "error",
  "message": "Camera permission denied."
}
```

### OCR Failure
```json
{
  "status": "error",
  "message": "Failed to process image for text detection."
}
```

### PDF Generation Error
```json
{
  "status": "error",
  "message": "Failed to generate PDF."
}
```

---

By following this guide, you can comprehensively test your React Native app using Expo without the need for an Android emulator.

