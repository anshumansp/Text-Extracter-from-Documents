import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import CameraScanner from '../../components/CameraScanner';

const { width } = Dimensions.get('window');

interface Feature {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: 'text-fields',
    title: 'Text Extraction',
    description: 'Extract text from any document or image instantly'
  },
  {
    icon: 'translate',
    title: 'Multi-Language',
    description: 'Support for multiple languages and scripts'
  },
  {
    icon: 'speed',
    title: 'Real-time',
    description: 'Process text in real-time with high accuracy'
  },
  {
    icon: 'save',
    title: 'Auto Save',
    description: 'Automatically save and organize scanned content'
  }
];

const instructions = [
  'Open the scanner using the button above',
  'Point your camera at any text',
  'Hold steady and tap to scan',
  'Review and save the extracted text'
];

const HomeScreen: React.FC = () => {
  const [showScanner, setShowScanner] = useState(false);

  if (showScanner) {
    return (
      <View style={styles.scannerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowScanner(false)}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <CameraScanner />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.mainContent}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setShowScanner(true)}
          >
            <MaterialIcons name="document-scanner" size={40} color="#fff" />
            <Text style={styles.scanButtonText}>Start Scanning</Text>
          </TouchableOpacity>

          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featureGrid}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureCard}>
                  <MaterialIcons name={feature.icon} size={32} color="#008080" />
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>About Aarambh</Text>
            <Text style={styles.infoText}>
              Aarambh is your comprehensive document management solution, designed to revolutionize
              how you handle information. This OCR module is part of a larger ecosystem that
              seamlessly integrates document processing into your workflow.
            </Text>
          </View>

          <View style={styles.instructionsCard}>
            <Text style={styles.sectionTitle}>Quick Guide</Text>
            {instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    backgroundColor: '#001F3F',
    padding: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#008080',
    marginTop: 8,
  },
  mainContent: {
    padding: 20,
  },
  scanButton: {
    backgroundColor: '#008080',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  featuresContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001F3F',
    marginBottom: 15,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    width: (width - 60) / 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001F3F',
    marginTop: 10,
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#001F3F',
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },
  instructionsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#008080',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  footerText: {
    fontSize: 14,
    color: '#001F3F',
    fontWeight: '500',
  },
  version: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen;
