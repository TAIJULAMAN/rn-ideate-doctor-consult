import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Notification {
    id: string;
    type: 'appointment' | 'message' | 'reminder' | 'promotion' | 'system';
    title: string;
    message: string;
    time: string;
    read: boolean;
    avatar?: any;
}

export default function Notifications() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'appointment',
            title: 'Appointment Confirmed',
            message: 'Your appointment with Dr Rebbeka has been confirmed for tomorrow at 10:00 AM',
            time: '2 hours ago',
            read: false,
            avatar: require('../../../assets/girls/g1.png'),
        },
        {
            id: '2',
            type: 'message',
            title: 'New Message',
            message: 'Dr Sarah sent you a message regarding your recent consultation',
            time: '5 hours ago',
            read: false,
            avatar: require('../../../assets/girls/g2.png'),
        },
        {
            id: '3',
            type: 'reminder',
            title: 'Appointment Reminder',
            message: 'Don\'t forget your appointment with Dr Emily tomorrow at 2:00 PM',
            time: '1 day ago',
            read: true,
            avatar: require('../../../assets/girls/g1.png'),
        },
        {
            id: '4',
            type: 'promotion',
            title: 'Special Offer',
            message: 'Get 20% off on your next consultation. Valid until end of month!',
            time: '2 days ago',
            read: true,
        },
        {
            id: '5',
            type: 'system',
            title: 'Profile Updated',
            message: 'Your profile information has been successfully updated',
            time: '3 days ago',
            read: true,
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'appointment':
                return { name: 'calendar', color: '#4299E1' };
            case 'message':
                return { name: 'chatbubble', color: '#48BB78' };
            case 'reminder':
                return { name: 'time', color: '#FF8C42' };
            case 'promotion':
                return { name: 'gift', color: '#9F7AEA' };
            case 'system':
                return { name: 'information-circle', color: '#718096' };
            default:
                return { name: 'notifications', color: '#718096' };
        }
    };

    const handleMarkAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const handleDelete = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                {unreadCount > 0 && (
                    <TouchableOpacity onPress={handleMarkAllAsRead}>
                        <Text style={styles.markAllText}>Mark all read</Text>
                    </TouchableOpacity>
                )}
                {unreadCount === 0 && <View style={styles.placeholder} />}
            </View>

            {unreadCount > 0 && (
                <View style={styles.unreadBanner}>
                    <Ionicons name="notifications" size={20} color="#FF8C42" />
                    <Text style={styles.unreadText}>
                        You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                    </Text>
                </View>
            )}

            <ScrollView showsVerticalScrollIndicator={false}>
                {notifications.length === 0 ? (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconContainer}>
                            <Ionicons name="notifications-outline" size={64} color="#E2E8F0" />
                        </View>
                        <Text style={styles.emptyTitle}>No Notifications</Text>
                        <Text style={styles.emptyText}>
                            You're all caught up! Check back later for updates
                        </Text>
                    </View>
                ) : (
                    <View style={styles.notificationsList}>
                        {notifications.map((notification) => {
                            const icon = getNotificationIcon(notification.type);
                            return (
                                <TouchableOpacity
                                    key={notification.id}
                                    style={[
                                        styles.notificationCard,
                                        !notification.read && styles.notificationCardUnread
                                    ]}
                                    onPress={() => handleMarkAsRead(notification.id)}
                                >
                                    <View style={styles.notificationLeft}>
                                        {notification.avatar ? (
                                            <Image source={notification.avatar} style={styles.avatar} />
                                        ) : (
                                            <View style={[styles.iconContainer, { backgroundColor: `${icon.color}15` }]}>
                                                <Ionicons name={icon.name as any} size={24} color={icon.color} />
                                            </View>
                                        )}
                                    </View>

                                    <View style={styles.notificationContent}>
                                        <View style={styles.notificationHeader}>
                                            <Text style={styles.notificationTitle}>{notification.title}</Text>
                                            {!notification.read && <View style={styles.unreadDot} />}
                                        </View>
                                        <Text style={styles.notificationMessage} numberOfLines={2}>
                                            {notification.message}
                                        </Text>
                                        <Text style={styles.notificationTime}>{notification.time}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDelete(notification.id)}
                                    >
                                        <Ionicons name="close-circle" size={20} color="#CBD5E0" />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
    },
    markAllText: {
        fontSize: 14,
        color: '#FF8C42',
        fontWeight: '500',
    },
    placeholder: {
        width: 80,
    },
    unreadBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5F0',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#FFE8D9',
    },
    unreadText: {
        fontSize: 14,
        color: '#C05621',
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 80,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F7FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 22,
    },
    notificationsList: {
        padding: 20,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    notificationCardUnread: {
        backgroundColor: '#FFF5F0',
        borderColor: '#FFE8D9',
    },
    notificationLeft: {
        marginRight: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 8,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2D3748',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF8C42',
    },
    notificationMessage: {
        fontSize: 14,
        color: '#718096',
        lineHeight: 20,
        marginBottom: 8,
    },
    notificationTime: {
        fontSize: 12,
        color: '#A0AEC0',
    },
    deleteButton: {
        padding: 4,
    },
    bottomSpacer: {
        height: 40,
    },
});


