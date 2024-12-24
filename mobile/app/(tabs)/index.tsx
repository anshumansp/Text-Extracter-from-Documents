import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CameraScanner from '../../components/CameraScanner';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the OCR Scanner</Text>
      {/* <View style={styles.cameraContainer}>
        <CameraScanner />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
});

export default HomeScreen;
