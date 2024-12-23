import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import { TesseractOcr } from "react-native-tesseract-ocr";

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedText, setScannedText] = useState("");
  const cameraRef = useRef(null);

  const initializeCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const startScanning = async () => {
    setIsScanning(true);
    const options = { quality: 1, base64: true };
    if (cameraRef.current) {
      try {
        const image = await cameraRef.current.takePictureAsync(options);
        const text = await TesseractOcr.recognize(
          image.base64,
          TesseractOcr.LANG_ENGLISH,
          {}
        );
        setScannedText(text);
      } catch (error) {
        console.error("Error scanning text:", error);
      } finally {
        setIsScanning(false);
      }
    }
  };

  React.useEffect(() => {
    initializeCamera();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permissions...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      {isScanning ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={startScanning}>
          <Text style={styles.buttonText}>Start Scanning</Text>
        </TouchableOpacity>
      )}
      {scannedText ? (
        <View style={styles.textContainer}>
          <Text style={styles.scannedText}>{scannedText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  button: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    position: "absolute",
    top: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  scannedText: {
    color: "#fff",
    fontSize: 14,
  },
});
export default App;
