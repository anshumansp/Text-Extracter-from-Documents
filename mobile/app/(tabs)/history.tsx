import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const mockHistory = [
    {
        id: 1,
        type: 'Text Document',
        date: '2024-01-23 14:30',
        content: 'Invoice #2024-001',
        accuracy: 98,
        icon: 'description',
    },
    {
        id: 2,
        type: 'Business Card',
        date: '2024-01-23 11:15',
        content: 'John Doe - CEO',
        accuracy: 95,
        icon: 'contact-page',
    },
    {
        id: 3,
        type: 'Handwritten',
        date: '2024-01-22 16:45',
        content: 'Meeting Notes',
        accuracy: 92,
        icon: 'edit',
    },
    {
        id: 4,
        type: 'Image',
        date: '2024-01-22 09:20',
        content: 'Product Label',
        accuracy: 96,
        icon: 'image',
    },
    // Add more mock data as needed
];

const HistoryScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Scan History</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialIcons name="filter-list" size={24} color="#008080" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>124</Text>
                        <Text style={styles.statLabel}>Total Scans</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>95.8%</Text>
                        <Text style={styles.statLabel}>Avg. Accuracy</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>15</Text>
                        <Text style={styles.statLabel}>This Week</Text>
                    </View>
                </View>

                <View style={styles.historyList}>
                    {mockHistory.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.historyItem}>
                            <View style={styles.itemLeft}>
                                <View style={styles.iconContainer}>
                                    <MaterialIcons name={item.icon as any} size={24} color="#008080" />
                                </View>
                                <View style={styles.itemContent}>
                                    <Text style={styles.itemTitle}>{item.content}</Text>
                                    <Text style={styles.itemType}>{item.type}</Text>
                                    <Text style={styles.itemDate}>{item.date}</Text>
                                </View>
                            </View>
                            <View style={styles.itemRight}>
                                <View style={styles.accuracyBadge}>
                                    <Text style={styles.accuracyText}>{item.accuracy}%</Text>
                                </View>
                                <MaterialIcons name="chevron-right" size={24} color="#666" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.exportButton}>
                <MaterialIcons name="file-download" size={20} color="#fff" />
                <Text style={styles.exportButtonText}>Export History</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#001F3F',
    },
    filterButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F0F0F0',
    },
    content: {
        flex: 1,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    statCard: {
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        width: '30%',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#001F3F',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    historyList: {
        padding: 20,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#001F3F',
    },
    itemType: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    itemDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    accuracyBadge: {
        backgroundColor: '#E1F5F3',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    accuracyText: {
        fontSize: 12,
        color: '#008080',
        fontWeight: 'bold',
    },
    exportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#008080',
        padding: 16,
        margin: 20,
        borderRadius: 12,
        gap: 8,
    },
    exportButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HistoryScreen; 