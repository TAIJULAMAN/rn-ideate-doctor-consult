import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AudioCall() {
    const router = useRouter();

    return (
        <LinearGradient colors={['#FFE5D3', '#FFD4B8', '#FFC299']} style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#2D3748" />
            </TouchableOpacity>

            {/* Doctor Info */}
            <View style={styles.content}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarRing}>
                        <Image
                            source={require('../assets/message/m2.png')}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    </View>
                </View>

                <Text style={styles.doctorName}>Dr. Ali Dale Morse</Text>
                <Text style={styles.callDuration}>14.34mins</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                    <View style={[styles.actionButtonCircle, styles.messageButton]}>
                        <Ionicons name="chatbubble" size={24} color="#4A90E2" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <View style={[styles.actionButtonCircle, styles.endCallButton]}>
                        <Ionicons name="call" size={28} color="#FFFFFF" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/video-call')}>
                    <View style={[styles.actionButtonCircle, styles.videoButton]}>
                        <Ionicons name="videocam" size={24} color="#4A90E2" />
                    </View>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        padding: 4,
        zIndex: 10,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer: {
        marginBottom: 32,
    },
    avatarRing: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 8,
        borderColor: '#FF8C42',
        padding: 8,
        backgroundColor: '#FFFFFF',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 92,
    },
    doctorName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 8,
    },
    callDuration: {
        fontSize: 16,
        color: '#718096',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
        gap: 32,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionButtonCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageButton: {
        backgroundColor: '#E3F2FD',
    },
    endCallButton: {
        backgroundColor: '#EF4444',
        width: 72,
        height: 72,
        borderRadius: 36,
    },
    videoButton: {
        backgroundColor: '#E3F2FD',
    },
});
