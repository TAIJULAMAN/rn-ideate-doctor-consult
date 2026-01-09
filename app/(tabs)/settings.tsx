import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
    const router = useRouter();
    const [user] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        avatar: require('../../assets/girls/g1.png'),
    });

    const menuSections = [
        {
            title: 'Account',
            items: [
                {
                    id: 'profile',
                    icon: 'person-outline',
                    label: 'Edit Profile',
                    route: '/edit-profile',
                    color: '#4299E1',
                },
                {
                    id: 'password',
                    icon: 'lock-closed-outline',
                    label: 'Change Password',
                    route: '/change-password',
                    color: '#48BB78',
                },
                {
                    id: 'saved',
                    icon: 'bookmark-outline',
                    label: 'Saved Doctors',
                    route: '/saved-doctors',
                    color: '#FF8C42',
                },
            ],
        },
        {
            title: 'Preferences',
            items: [
                {
                    id: 'notifications',
                    icon: 'notifications-outline',
                    label: 'Notifications',
                    route: '/notifications-settings',
                    color: '#9F7AEA',
                },
                {
                    id: 'language',
                    icon: 'language-outline',
                    label: 'Language',
                    subtitle: 'English',
                    color: '#ED8936',
                },
                {
                    id: 'theme',
                    icon: 'moon-outline',
                    label: 'Dark Mode',
                    toggle: true,
                    color: '#4A5568',
                },
            ],
        },
        {
            title: 'Support',
            items: [
                {
                    id: 'help',
                    icon: 'help-circle-outline',
                    label: 'Help Center',
                    route: '/help',
                    color: '#38B2AC',
                },
                {
                    id: 'privacy',
                    icon: 'shield-checkmark-outline',
                    label: 'Privacy Policy',
                    route: '/privacy',
                    color: '#667EEA',
                },
                {
                    id: 'terms',
                    icon: 'document-text-outline',
                    label: 'Terms of Service',
                    route: '/terms',
                    color: '#F56565',
                },
            ],
        },
    ];

    const handleLogout = () => {
        // Show confirmation dialog
        if (confirm('Are you sure you want to logout?')) {
            // Navigate to sign-in
            router.push('/components/auth/sign-in' as any);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>

                {/* Profile Card */}
                <TouchableOpacity
                    style={styles.profileCard}
                    onPress={() => router.push('/components/settings/edit-profile' as any)}
                >
                    <Image source={user.avatar} style={styles.avatar} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{user.name}</Text>
                        <Text style={styles.profileEmail}>{user.email}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#718096" />
                </TouchableOpacity>

                {/* Menu Sections */}
                {menuSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.menuContainer}>
                            {section.items.map((item, itemIndex) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.menuItem,
                                        itemIndex === section.items.length - 1 && styles.menuItemLast,
                                    ]}
                                    onPress={() => item.route && router.push(item.route as any)}
                                >
                                    <View style={styles.menuItemLeft}>
                                        <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}15` }]}>
                                            <Ionicons name={item.icon as any} size={22} color={item.color} />
                                        </View>
                                        <View style={styles.menuTextContainer}>
                                            <Text style={styles.menuLabel}>{item.label}</Text>
                                            {item.subtitle && (
                                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                                            )}
                                        </View>
                                    </View>
                                    {item.toggle ? (
                                        <View style={styles.toggle}>
                                            <View style={styles.toggleTrack} />
                                        </View>
                                    ) : (
                                        <Ionicons name="chevron-forward" size={20} color="#CBD5E0" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={22} color="#F56565" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                {/* App Version */}
                <Text style={styles.versionText}>Version 1.0.0</Text>

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 20,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: '#718096',
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#718096',
        marginBottom: 12,
        paddingHorizontal: 20,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    menuContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F7FAFC',
    },
    menuItemLast: {
        borderBottomWidth: 0,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#2D3748',
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#718096',
        marginTop: 2,
    },
    toggle: {
        width: 48,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    toggleTrack: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 32,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FED7D7',
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#F56565',
    },
    versionText: {
        fontSize: 13,
        color: '#A0AEC0',
        textAlign: 'center',
        marginTop: 24,
    },
    bottomSpacer: {
        height: 40,
    },
});
