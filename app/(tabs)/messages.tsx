import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { messages } from '../../data/messages';

export default function Messages() {
    const router = useRouter();

    const activeDoctors = messages.filter(m => m.isOnline);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Messages</Text>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={24} color="#2D3748" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Active Doctors */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.activeDoctorsContainer}
                    contentContainerStyle={styles.activeDoctorsContent}
                >
                    {activeDoctors.map((doctor) => (
                        <TouchableOpacity key={doctor.id} style={styles.activeDoctor}>
                            <View style={styles.activeDoctorImageContainer}>
                                <Image source={doctor.doctorImage} style={styles.activeDoctorImage} />
                                <View style={styles.onlineIndicator} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* All Messages Title */}
                <Text style={styles.sectionTitle}>All Messages</Text>

                {/* Messages List */}
                {messages.map((message) => (
                    <TouchableOpacity
                        key={message.id}
                        style={styles.messageItem}
                        onPress={() => router.push(`/chat-detail?id=${message.id}`)}
                    >
                        <View style={styles.messageAvatarContainer}>
                            <Image source={message.doctorImage} style={styles.messageAvatar} />
                            {message.isOnline && <View style={styles.messageOnlineIndicator} />}
                        </View>
                        <View style={styles.messageContent}>
                            <Text style={styles.doctorName}>{message.doctorName}</Text>
                            <Text style={styles.lastMessage} numberOfLines={1}>
                                {message.lastMessage}
                            </Text>
                        </View>
                        <View style={styles.messageRight}>
                            <Text style={styles.timestamp}>{message.timestamp}</Text>
                            {message.unread && <View style={styles.unreadDot} />}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    searchButton: {
        padding: 4,
    },
    scrollView: {
        flex: 1,
    },
    activeDoctorsContainer: {
        marginTop: 8,
    },
    activeDoctorsContent: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 16,
    },
    activeDoctor: {
        alignItems: 'center',
    },
    activeDoctorImageContainer: {
        position: 'relative',
    },
    activeDoctorImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4A90E2',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2D3748',
        paddingHorizontal: 20,
        marginTop: 16,
        marginBottom: 12,
    },
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 12,
    },
    messageAvatarContainer: {
        position: 'relative',
    },
    messageAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    messageOnlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4A90E2',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    messageContent: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 4,
    },
    lastMessage: {
        fontSize: 14,
        color: '#718096',
    },
    messageRight: {
        alignItems: 'flex-end',
        gap: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#A0AEC0',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4A90E2',
    },
});
