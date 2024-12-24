import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import Tesseract from 'tesseract.js';

// Workaround for TypeScript issues with expo-camera
const CameraView = Camera as any;

const CameraScanner: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scannedText, setScannedText] = useState<string>('');
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const cameraRef = useRef<any>(null);
    const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === 'granted');
            } catch (error) {
                console.error('Error requesting camera permission:', error);
                setHasPermission(false);
            }
        })();

        return () => {
            if (scanIntervalRef.current) {
                clearInterval(scanIntervalRef.current);
            }
        };
    }, []);

    const processFrame = async (base64Image: string) => {
        try {
            const { data: { text } } = await Tesseract.recognize(
                base64Image,
                'eng',
                {
                    logger: m => console.log(m)
                }
            );
            if (text.trim()) {
                setScannedText(text.trim());
            }
        } catch (err) {
            console.error('OCR error:', err);
        }
    };

    const captureAndProcess = useCallback(async () => {
        if (!cameraRef.current || isProcessing) return;

        try {
            setIsProcessing(true);
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.5,
                base64: true,
            });

            // Resize the image for better performance
            const manipResult = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 800 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
            );

            if (manipResult.base64) {
                await processFrame(manipResult.base64);
            }
        } catch (error) {
            console.error('Error capturing frame:', error);
        } finally {
            setIsProcessing(false);
        }
    }, [isProcessing]);

    const toggleScanning = useCallback(() => {
        setIsScanning(prev => {
            if (!prev) {
                // Start scanning
                scanIntervalRef.current = setInterval(captureAndProcess, 3000); // Scan every 3 seconds
                return true;
            } else {
                // Stop scanning
                if (scanIntervalRef.current) {
                    clearInterval(scanIntervalRef.current);
                    scanIntervalRef.current = null;
                }
                return false;
            }
        });
    }, [captureAndProcess]);

    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {hasPermission && (
                <View style={styles.cameraContainer}>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        type={0} // 0 for back camera, 1 for front camera
                    >
                        <View style={styles.overlay}>
                            {isProcessing && (
                                <View style={styles.processingContainer}>
                                    <ActivityIndicator size="large" color="#ffffff" />
                                    <Text style={styles.processingText}>Processing...</Text>
                                </View>
                            )}
                            <View style={styles.buttonContainer}>
                                <Button
                                    title={isScanning ? "Stop Scanning" : "Start Scanning"}
                                    onPress={toggleScanning}
                                />
                            </View>
                        </View>
                    </CameraView>
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>Scanned Text:</Text>
                <Text style={styles.scannedText}>{scannedText || 'No text detected'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    cameraContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    processingContainer: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    processingText: {
        color: '#ffffff',
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textContainer: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        maxHeight: '30%',
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    scannedText: {
        fontSize: 14,
    },
});

export default CameraScanner;
