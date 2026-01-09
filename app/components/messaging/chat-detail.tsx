import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { chatMessages } from '../../../data/messages';

export default function ChatDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Dr Rafsan jani</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => router.push('/components/messaging/audio-call' as any)}
                    >
                        <Ionicons name="call" size={22} color="#4A90E2" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => router.push('/components/messaging/video-call' as any)}
                    >
                        <Ionicons name="videocam" size={22} color="#4A90E2" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Chat Messages */}
            <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
                {chatMessages.map((msg) => (
                    <View key={msg.id}>
                        {/* Timestamp */}
                        <Text style={styles.timestamp}>{msg.timestamp}</Text>

                        {/* Message */}
                        <View
                            style={[
                                styles.messageRow,
                                msg.senderId === 'user' ? styles.messageRowUser : styles.messageRowDoctor,
                            ]}
                        >
                            {msg.senderId === 'doctor' && (
                                <Image source={msg.senderImage} style={styles.messageAvatar} />
                            )}

                            <View
                                style={[
                                    styles.messageBubble,
                                    msg.senderId === 'user' ? styles.messageBubbleUser : styles.messageBubbleDoctor,
                                ]}
                            >
                                {msg.type === 'video-call' ? (
                                    <View>
                                        <Text style={styles.messageText}>{msg.message}</Text>
                                        <Text style={styles.callDuration}>{msg.duration}</Text>
                                    </View>
                                ) : msg.type === 'image' ? (
                                    <View>
                                        <Text style={styles.messageText}>{msg.message}</Text>
                                        <View style={styles.prescriptionPlaceholder}>
                                            <Ionicons name="document-text" size={40} color="#718096" />
                                            <Text style={styles.prescriptionText}>Prescription</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <Text style={styles.messageText}>{msg.message}</Text>
                                )}
                            </View>

                            {msg.senderId === 'user' && (
                                <Image source={require('../../../assets/message/m1.png')} style={styles.messageAvatar} />
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Input Bar */}
            <View style={styles.inputBar}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputPlaceholder}>Type Your problems</Text>
                </View>
                <TouchableOpacity style={styles.sendButton}>
                    <Ionicons name="send" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
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
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginLeft: 12,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 16,
    },
    headerButton: {
        padding: 4,
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    timestamp: {
        textAlign: 'center',
        fontSize: 12,
        color: '#A0AEC0',
        marginVertical: 16,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },
    messageRowDoctor: {
        justifyContent: 'flex-start',
    },
    messageRowUser: {
        justifyContent: 'flex-end',
    },
    messageAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    messageBubble: {
        maxWidth: '70%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
    },
    messageBubbleDoctor: {
        backgroundColor: '#F7FAFC',
        borderTopLeftRadius: 4,
    },
    messageBubbleUser: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderTopRightRadius: 4,
    },
    messageText: {
        fontSize: 14,
        color: '#2D3748',
        lineHeight: 20,
    },
    callDuration: {
        fontSize: 12,
        color: '#718096',
        marginTop: 4,
    },
    prescriptionPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginTop: 8,
        backgroundColor: '#F7FAFC',
        borderRadius: 8,
    },
    prescriptionText: {
        fontSize: 12,
        color: '#718096',
        marginTop: 4,
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        gap: 12,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#F7FAFC',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    inputPlaceholder: {
        fontSize: 14,
        color: '#A0AEC0',
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FF8C42',
        alignItems: 'center',
        justifyContent: 'center',
    },
});



