import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Image, Platform } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import CameraScanner from '../../components/CameraScanner';

const { width } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : 0;

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
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image
            source={require('../../assets/images/logo-transparent.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons name="notifications-none" size={28} color="#001F3F" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContent}>
        <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome, Anshuman</Text> 
          </View>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setShowScanner(true)}
          >
            <MaterialIcons name="document-scanner" size={40} color="#fff" />
            <Text style={styles.scanButtonText}>Start Scanning</Text>
          </TouchableOpacity>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Scans Today</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>142</Text>
              <Text style={styles.statLabel}>Total Scans</Text>
            </View>
          </View>

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

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>About Aarambh OCR</Text>
            <Text style={styles.infoText}>
              Aarambh OCR is your comprehensive document management solution, designed to revolutionize
              how you handle information. This OCR module is part of a larger ecosystem that
              seamlessly integrates document processing into your workflow.
            </Text>
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
    paddingTop: STATUSBAR_HEIGHT,
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 210,
    height: 60,
  },
  welcomeContainer: {
    flex: 1,
    marginLeft: 5,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001F3F',
  },
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  headerBottom: {
    marginTop: 5,
  },
  tagline: {
    fontSize: 14,
    color: '#008080',
    fontWeight: '500',
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
    top: 40 + STATUSBAR_HEIGHT,
    left: 20,
    zIndex: 1,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainContent: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    width: (width - 60) / 3,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#008080',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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
});

export default HomeScreen;
