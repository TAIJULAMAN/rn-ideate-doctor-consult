import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ChangePassword() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }
        // Change password logic
        alert('Password changed successfully!');
        router.back();
    };

    const passwordRequirements = [
        { id: 1, text: 'At least 8 characters', met: newPassword.length >= 8 },
        { id: 2, text: 'Contains uppercase letter', met: /[A-Z]/.test(newPassword) },
        { id: 3, text: 'Contains lowercase letter', met: /[a-z]/.test(newPassword) },
        { id: 4, text: 'Contains number', met: /[0-9]/.test(newPassword) },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Change Password</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.infoCard}>
                        <Ionicons name="shield-checkmark" size={24} color="#48BB78" />
                        <Text style={styles.infoText}>
                            Choose a strong password to keep your account secure
                        </Text>
                    </View>

                    {/* Current Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Current Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#718096" />
                            <TextInput
                                style={styles.input}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder="Enter current password"
                                placeholderTextColor="#A0AEC0"
                                secureTextEntry={!showCurrent}
                            />
                            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
                                <Ionicons
                                    name={showCurrent ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color="#718096"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* New Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>New Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#718096" />
                            <TextInput
                                style={styles.input}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="Enter new password"
                                placeholderTextColor="#A0AEC0"
                                secureTextEntry={!showNew}
                            />
                            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                                <Ionicons
                                    name={showNew ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color="#718096"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirm Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirm New Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#718096" />
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirm new password"
                                placeholderTextColor="#A0AEC0"
                                secureTextEntry={!showConfirm}
                            />
                            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                                <Ionicons
                                    name={showConfirm ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color="#718096"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Password Requirements */}
                    {newPassword.length > 0 && (
                        <View style={styles.requirementsCard}>
                            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
                            {passwordRequirements.map((req) => (
                                <View key={req.id} style={styles.requirementRow}>
                                    <Ionicons
                                        name={req.met ? 'checkmark-circle' : 'ellipse-outline'}
                                        size={18}
                                        color={req.met ? '#48BB78' : '#CBD5E0'}
                                    />
                                    <Text style={[
                                        styles.requirementText,
                                        req.met && styles.requirementTextMet
                                    ]}>
                                        {req.text}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Change Password Button */}
                    <TouchableOpacity
                        style={styles.changeButton}
                        onPress={handleChangePassword}
                    >
                        <Text style={styles.changeButtonText}>Change Password</Text>
                    </TouchableOpacity>

                    {/* Forgot Password Link */}
                    <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.forgotText}>Forgot your current password?</Text>
                    </TouchableOpacity>
                </View>

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
    placeholder: {
        width: 32,
    },
    content: {
        padding: 20,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0FFF4',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        gap: 12,
        borderWidth: 1,
        borderColor: '#C6F6D5',
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#2F855A',
        lineHeight: 20,
    },
    inputGroup: {
        marginBottom: 20,
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
    requirementsCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    requirementsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 12,
    },
    requirementRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    requirementText: {
        fontSize: 14,
        color: '#718096',
    },
    requirementTextMet: {
        color: '#48BB78',
    },
    changeButton: {
        backgroundColor: '#FF8C42',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    changeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    forgotButton: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    forgotText: {
        fontSize: 14,
        color: '#4299E1',
        fontWeight: '500',
    },
    bottomSpacer: {
        height: 40,
    },
});


