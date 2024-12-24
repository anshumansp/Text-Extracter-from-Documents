import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SettingsScreen: React.FC = () => {
    const [settings, setSettings] = useState({
        autoSave: true,
        darkMode: false,
        notifications: true,
        highAccuracy: true,
        cloudSync: true,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const settingSections = [
        {
            title: 'General',
            items: [
                {
                    icon: 'save',
                    label: 'Auto Save',
                    key: 'autoSave' as const,
                    type: 'toggle',
                },
                {
                    icon: 'dark-mode',
                    label: 'Dark Mode',
                    key: 'darkMode' as const,
                    type: 'toggle',
                },
                {
                    icon: 'notifications',
                    label: 'Notifications',
                    key: 'notifications' as const,
                    type: 'toggle',
                },
            ],
        },
        {
            title: 'Scanner Settings',
            items: [
                {
                    icon: 'high-quality',
                    label: 'High Accuracy Mode',
                    key: 'highAccuracy' as const,
                    type: 'toggle',
                },
                {
                    icon: 'cloud-sync',
                    label: 'Cloud Sync',
                    key: 'cloudSync' as const,
                    type: 'toggle',
                },
                {
                    icon: 'language',
                    label: 'Language Settings',
                    type: 'link',
                },
            ],
        },
        {
            title: 'Account',
            items: [
                {
                    icon: 'person',
                    label: 'Profile',
                    type: 'link',
                },
                {
                    icon: 'security',
                    label: 'Privacy & Security',
                    type: 'link',
                },
                {
                    icon: 'backup',
                    label: 'Backup & Restore',
                    type: 'link',
                },
            ],
        },
        {
            title: 'Support',
            items: [
                {
                    icon: 'help',
                    label: 'Help Center',
                    type: 'link',
                },
                {
                    icon: 'feedback',
                    label: 'Send Feedback',
                    type: 'link',
                },
                {
                    icon: 'info',
                    label: 'About Aarambh',
                    type: 'link',
                },
            ],
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView style={styles.content}>
                {settingSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.sectionContent}>
                            {section.items.map((item, itemIndex) => (
                                <TouchableOpacity
                                    key={itemIndex}
                                    style={styles.settingItem}
                                    onPress={() => {
                                        if ('key' in item) {
                                            toggleSetting(item.key);
                                        }
                                    }}
                                >
                                    <View style={styles.settingLeft}>
                                        <View style={styles.iconContainer}>
                                            <MaterialIcons name={item.icon as any} size={24} color="#008080" />
                                        </View>
                                        <Text style={styles.settingLabel}>{item.label}</Text>
                                    </View>
                                    {item.type === 'toggle' ? (
                                        <Switch
                                            value={settings[item.key]}
                                            onValueChange={() => toggleSetting(item.key)}
                                            trackColor={{ false: '#E5E5E5', true: '#008080' }}
                                            thumbColor="#fff"
                                        />
                                    ) : (
                                        <MaterialIcons name="chevron-right" size={24} color="#666" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.logoutButton}>
                    <MaterialIcons name="logout" size={20} color="#FF4444" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
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
    content: {
        flex: 1,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#008080',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    sectionContent: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingLabel: {
        fontSize: 16,
        color: '#001F3F',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        margin: 20,
        borderRadius: 12,
        backgroundColor: '#FFF0F0',
        gap: 8,
    },
    logoutText: {
        color: '#FF4444',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SettingsScreen; 