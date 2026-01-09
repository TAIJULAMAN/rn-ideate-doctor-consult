import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyPolicy() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.lastUpdated}>Last updated: January 9, 2026</Text>

                <Text style={styles.paragraph}>
                    Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website and mobile application.
                </Text>

                <Text style={styles.heading}>1. Information We Collect</Text>
                <Text style={styles.paragraph}>
                    We collect information you provide directly to us, such as when you create an account, update your profile, book an appointment, or communicate with us. This may include your name, email address, phone number, and medical history.
                </Text>

                <Text style={styles.heading}>2. How We Use Your Information</Text>
                <Text style={styles.paragraph}>
                    We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you related information, and respond to your comments and questions.
                </Text>

                <Text style={styles.heading}>3. Information Sharing</Text>
                <Text style={styles.paragraph}>
                    We do not share your personal information with third parties except as described in this privacy policy, such as with doctors you consult with or as required by law.
                </Text>

                <Text style={styles.heading}>4. Security</Text>
                <Text style={styles.paragraph}>
                    We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                </Text>

                <Text style={styles.heading}>5. Contact Us</Text>
                <Text style={styles.paragraph}>
                    If you have any questions about this Privacy Policy, please contact us at privacy@doctorconsult.com.
                </Text>

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
        flex: 1,
        padding: 20,
    },
    lastUpdated: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 24,
        fontStyle: 'italic',
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginTop: 16,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 15,
        color: '#4A5568',
        lineHeight: 24,
        marginBottom: 16,
        textAlign: 'justify',
    },
    bottomSpacer: {
        height: 40,
    },
});
