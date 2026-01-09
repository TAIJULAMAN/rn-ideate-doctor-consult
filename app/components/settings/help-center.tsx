import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HelpCenter() {
    const router = useRouter();

    const faqs = [
        {
            question: "How do I book an appointment?",
            answer: "You can book an appointment by selecting a doctor from the 'Services' tab or 'Home' screen and clicking on 'Book Appointment'."
        },
        {
            question: "Can I cancel my appointment?",
            answer: "Yes, you can cancel your appointment from the 'Appointments' tab up to 24 hours before the scheduled time."
        },
        {
            question: "How do I pay for consultations?",
            answer: "We accept various payment methods including credit cards, debit cards, and digital wallets."
        },
        {
            question: "Is my medical data safe?",
            answer: "Yes, we use end-to-end encryption to ensure your medical records and personal information are secure."
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help Center</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                <View style={styles.faqContainer}>
                    {faqs.map((faq, index) => (
                        <View key={index} style={styles.faqItem}>
                            <Text style={styles.question}>{faq.question}</Text>
                            <Text style={styles.answer}>{faq.answer}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Contact Us</Text>
                <View style={styles.contactContainer}>
                    <TouchableOpacity style={styles.contactItem}>
                        <View style={styles.contactIcon}>
                            <Ionicons name="mail-outline" size={24} color="#FF8C42" />
                        </View>
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactLabel}>Email Us</Text>
                            <Text style={styles.contactValue}>support@doctorconsult.com</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactItem}>
                        <View style={styles.contactIcon}>
                            <Ionicons name="call-outline" size={24} color="#FF8C42" />
                        </View>
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactLabel}>Call Us</Text>
                            <Text style={styles.contactValue}>+1 (555) 123-4567</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 16,
        marginTop: 8,
    },
    faqContainer: {
        gap: 16,
        marginBottom: 32,
    },
    faqItem: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    question: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 8,
    },
    answer: {
        fontSize: 14,
        color: '#718096',
        lineHeight: 20,
    },
    contactContainer: {
        gap: 16,
        marginBottom: 40,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        gap: 16,
    },
    contactIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF5F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactInfo: {
        flex: 1,
    },
    contactLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 2,
    },
    contactValue: {
        fontSize: 14,
        color: '#718096',
    },
});
