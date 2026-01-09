import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, NativeSyntheticEvent, TextInputKeyPressEventData, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OTPVerification() {
    const router = useRouter();
    const { email, type } = useLocalSearchParams();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleOtpChange = (value: string, index: number) => {
        if (value.length > 1) {
            value = value[value.length - 1];
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            alert('Please enter complete OTP');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (type === 'reset') {
                router.push('/components/auth/reset-password' as any);
            } else {
                router.replace('/(tabs)');
            }
        }, 1500);
    };

    const handleResend = () => {
        if (timer === 0) {
            setTimer(60);
            setOtp(['', '', '', '', '', '']);
            // Resend OTP logic would go here
            alert('OTP sent successfully!');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                        accessibilityLabel="Go back"
                        accessibilityRole="button"
                    >
                        <Ionicons name="arrow-back" size={24} color="#2D3748" />
                    </TouchableOpacity>
                </View>

                {/* Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="mail" size={48} color="#FF8C42" />
                    </View>
                </View>

                {/* Title */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>OTP Verification</Text>
                    <Text style={styles.subtitle}>
                        We've sent a 6-digit code to{'\n'}
                        <Text style={styles.email}>{email || 'your email'}</Text>
                    </Text>
                </View>

                {/* OTP Input */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => { inputRefs.current[index] = ref; }}
                            style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                            accessibilityLabel={`Digit ${index + 1}`}
                            accessibilityRole="keyboardkey"
                        />
                    ))}
                </View>

                {/* Timer */}
                <View style={styles.timerContainer}>
                    {timer > 0 ? (
                        <Text style={styles.timerText}>
                            Resend code in{' '}
                            <Text style={styles.timerValue}>
                                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                            </Text>
                        </Text>
                    ) : (
                        <TouchableOpacity onPress={handleResend} accessibilityRole="button" accessibilityLabel="Resend OTP">
                            <Text style={styles.resendText}>Didn't receive code? Resend</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                    style={[styles.verifyButton, isLoading && styles.verifyButtonDisabled]}
                    onPress={handleVerify}
                    disabled={isLoading}
                    accessibilityRole="button"
                    accessibilityLabel="Verify OTP"
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.verifyButtonText}>Verify & Continue</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 40,
    },
    backButton: {
        padding: 4,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFF5F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 22,
    },
    email: {
        color: '#FF8C42',
        fontWeight: '600',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        gap: 8,
    },
    otpInput: {
        width: 45,
        height: 56,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#E2E8F0',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: '#2D3748',
    },
    otpInputFilled: {
        borderColor: '#FF8C42',
        backgroundColor: '#FFF5F0',
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    timerText: {
        fontSize: 14,
        color: '#718096',
    },
    timerValue: {
        color: '#FF8C42',
        fontWeight: '600',
    },
    resendText: {
        fontSize: 14,
        color: '#FF8C42',
        fontWeight: '600',
    },
    verifyButton: {
        backgroundColor: '#FF8C42',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 56,
    },
    verifyButtonDisabled: {
        opacity: 0.7,
    },
    verifyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});



