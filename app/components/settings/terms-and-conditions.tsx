import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TermsAndConditions() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms & Conditions</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.lastUpdated}>Last updated: January 9, 2026</Text>

                <Text style={styles.paragraph}>
                    Please read these terms and conditions carefully before using our mobile application.
                </Text>

                <Text style={styles.heading}>1. Acceptance of Terms</Text>
                <Text style={styles.paragraph}>
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </Text>

                <Text style={styles.heading}>2. Use of Service</Text>
                <Text style={styles.paragraph}>
                    Our service allows you to book appointments, consult with doctors, and manage specific health-related information. You agree to use the service only for lawful purposes.
                </Text>

                <Text style={styles.heading}>3. User Accounts</Text>
                <Text style={styles.paragraph}>
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.
                </Text>

                <Text style={styles.heading}>4. Medical Advice Disclaimer</Text>
                <Text style={styles.paragraph}>
                    The content provided in this app is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </Text>

                <Text style={styles.heading}>5. Changes to Terms</Text>
                <Text style={styles.paragraph}>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
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
