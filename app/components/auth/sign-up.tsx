import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignUp() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleSignUp = () => {
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (!agreeToTerms) {
            alert('Please agree to terms and conditions');
            return;
        }
        // Sign up logic
        router.push('/components/auth/otp-verification' as any);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#2D3748" />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleSection}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="medical" size={48} color="#FF8C42" />
                    </View>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Full Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={20} color="#718096" />
                            <TextInput
                                style={styles.input}
                                value={fullName}
                                onChangeText={setFullName}
                                placeholder="Enter your full name"
                                placeholderTextColor="#A0AEC0"
                            />
                        </View>
                    </View>

                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#718096" />
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email"
                                placeholderTextColor="#A0AEC0"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Phone */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="call-outline" size={20} color="#718096" />
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="Enter your phone number"
                                placeholderTextColor="#A0AEC0"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#718096" />
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Create a password"
                                placeholderTextColor="#A0AEC0"
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color="#718096"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirm Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#718096" />
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirm your password"
                                placeholderTextColor="#A0AEC0"
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons
                                    name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color="#718096"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Terms & Conditions */}
                    <TouchableOpacity
                        style={styles.termsContainer}
                        onPress={() => setAgreeToTerms(!agreeToTerms)}
                    >
                        <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                            {agreeToTerms && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                        </View>
                        <Text style={styles.termsText}>
                            I agree to the{' '}
                            <Text style={styles.termsLink} onPress={() => router.push('/components/settings/terms-and-conditions' as any)}>Terms & Conditions</Text>
                            {' '}and{' '}
                            <Text style={styles.termsLink} onPress={() => router.push('/components/settings/privacy-policy' as any)}>Privacy Policy</Text>
                        </Text>
                    </TouchableOpacity>

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>

                    {/* Sign In Link */}
                    <View style={styles.signInContainer}>
                        <Text style={styles.signInText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/components/auth/sign-in' as any)}>
                            <Text style={styles.signInLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        marginBottom: 20,
    },
    backButton: {
        padding: 4,
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFF5F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#718096',
    },
    form: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        gap: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#2D3748',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 8,
        marginBottom: 24,
        gap: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#CBD5E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    checkboxChecked: {
        backgroundColor: '#FF8C42',
        borderColor: '#FF8C42',
    },
    termsText: {
        flex: 1,
        fontSize: 14,
        color: '#718096',
        lineHeight: 20,
    },
    termsLink: {
        color: '#FF8C42',
        fontWeight: '500',
    },
    signUpButton: {
        backgroundColor: '#FF8C42',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
    },
    signUpButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInText: {
        fontSize: 14,
        color: '#718096',
    },
    signInLink: {
        fontSize: 14,
        color: '#FF8C42',
        fontWeight: '600',
    },
});



