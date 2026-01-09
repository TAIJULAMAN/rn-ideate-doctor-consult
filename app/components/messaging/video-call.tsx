import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VideoCall() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Main Video Feed */}
            <Image
                source={require('../../../assets/message/m2.png')}
                style={styles.mainVideo}
                resizeMode="cover"
            />

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Small Video Preview (User) */}
            <View style={styles.previewContainer}>
                <Image
                    source={require('../../../assets/message/m1.png')}
                    style={styles.previewVideo}
                    resizeMode="cover"
                />
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                    <View style={[styles.actionButtonCircle, styles.messageButton]}>
                        <Ionicons name="chatbubble" size={24} color="#4A90E2" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={() => router.back()}>
                    <View style={[styles.actionButtonCircle, styles.endCallButton]}>
                        <Ionicons name="call" size={28} color="#FFFFFF" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <View style={[styles.actionButtonCircle, styles.switchButton]}>
                        <Ionicons name="camera-reverse" size={24} color="#4A90E2" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    mainVideo: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        padding: 4,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 20,
    },
    previewContainer: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 120,
        height: 160,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    previewVideo: {
        width: '100%',
        height: '100%',
    },
    actionsContainer: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    switchButton: {
        backgroundColor: '#E3F2FD',
    },
});



