import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Onboarding1() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/onboarding2');
    };

    const handleSkip = () => {
        router.push('/home');
    };

    return (
        <LinearGradient
            colors={['#FAFAFA', '#F5F5F5']}
            style={styles.container}
        >
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Find Trustworthy Health Information</Text>
                <Text style={styles.description}>
                    You will get the most accurate information about any diseases from top-class doctors
                </Text>

                {/* Doctor Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/girls/g1.png')}
                        style={styles.doctorImage}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },
    skipButton: {
        alignSelf: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    skipText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4A90E2',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2D3748',
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 20,
        lineHeight: 40,
    },
    description: {
        fontSize: 16,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 16,
        marginBottom: 40,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    doctorImage: {
        width: width * 0.75,
        height: height * 0.5,
        maxWidth: 400,
        maxHeight: 500,
    },
    button: {
        backgroundColor: '#FF8C42',
        borderRadius: 12,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
