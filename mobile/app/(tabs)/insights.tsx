import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const InsightsScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Analytics & Insights</Text>
                <Text style={styles.headerSubtitle}>Track your document processing metrics</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.metricsContainer}>
                    <View style={styles.metricCard}>
                        <MaterialIcons name="trending-up" size={24} color="#008080" />
                        <Text style={styles.metricValue}>98.5%</Text>
                        <Text style={styles.metricLabel}>Accuracy Rate</Text>
                    </View>
                    <View style={styles.metricCard}>
                        <MaterialIcons name="speed" size={24} color="#008080" />
                        <Text style={styles.metricValue}>1.2s</Text>
                        <Text style={styles.metricLabel}>Avg. Processing Time</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Weekly Activity</Text>
                    <View style={styles.activityChart}>
                        {[65, 40, 85, 50, 75, 90, 60].map((height, index) => (
                            <View key={index} style={styles.chartColumn}>
                                <View style={[styles.chartBar, { height: height * 1.5 }]} />
                                <Text style={styles.chartLabel}>
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Document Types</Text>
                    <View style={styles.documentTypes}>
                        {[
                            { type: 'Text Documents', count: 45, icon: 'description' },
                            { type: 'Images', count: 32, icon: 'image' },
                            { type: 'Handwritten', count: 28, icon: 'edit' },
                            { type: 'Business Cards', count: 15, icon: 'contact-page' },
                        ].map((item, index) => (
                            <View key={index} style={styles.docTypeCard}>
                                <MaterialIcons name={item.icon as any} size={24} color="#008080" />
                                <Text style={styles.docTypeCount}>{item.count}</Text>
                                <Text style={styles.docTypeLabel}>{item.type}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Performance</Text>
                    <View style={styles.performanceCard}>
                        <View style={styles.performanceItem}>
                            <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                            <Text style={styles.performanceLabel}>Success Rate</Text>
                            <Text style={styles.performanceValue}>96%</Text>
                        </View>
                        <View style={styles.performanceItem}>
                            <MaterialIcons name="error" size={20} color="#FFA000" />
                            <Text style={styles.performanceLabel}>Error Rate</Text>
                            <Text style={styles.performanceValue}>4%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#001F3F',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#008080',
    },
    content: {
        padding: 20,
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    metricCard: {
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
    metricValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#001F3F',
        marginVertical: 8,
    },
    metricLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#001F3F',
        marginBottom: 15,
    },
    activityChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 200,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 15,
    },
    chartColumn: {
        alignItems: 'center',
        width: 30,
    },
    chartBar: {
        width: 8,
        backgroundColor: '#008080',
        borderRadius: 4,
        marginBottom: 8,
    },
    chartLabel: {
        fontSize: 12,
        color: '#666',
    },
    documentTypes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
    },
    docTypeCard: {
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
    docTypeCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#001F3F',
        marginVertical: 8,
    },
    docTypeLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    performanceCard: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    performanceItem: {
        alignItems: 'center',
    },
    performanceLabel: {
        fontSize: 14,
        color: '#666',
        marginVertical: 8,
    },
    performanceValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#001F3F',
    },
});

export default InsightsScreen; 