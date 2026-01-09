import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doctors } from '../../../data/doctors';

export default function Checkout() {
    const router = useRouter();
    const { doctorId, date, time, duration, amount } = useLocalSearchParams();
    const doctor = doctors.find(d => d.id === doctorId);

    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [notes, setNotes] = useState('');

    if (!doctor) {
        return (
            <View style={styles.container}>
                <Text>Doctor not found</Text>
            </View>
        );
    }

    const handleProceedToPayment = () => {
        if (!patientName || !patientEmail || !patientPhone) {
            alert('Please fill in all required fields');
            return;
        }
        router.push({
            pathname: '/payment',
            params: {
                doctorId: doctor.id,
                date,
                time,
                duration,
                amount,
                patientName,
                patientEmail,
                patientPhone,
                notes
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Appointment Details</Text>
                    <View style={styles.appointmentCard}>
                        <Image source={doctor.image} style={styles.doctorAvatar} />
                        <View style={styles.appointmentInfo}>
                            <Text style={styles.doctorName}>{doctor.name}</Text>
                            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                            <View style={styles.detailRow}>
                                <Ionicons name="calendar-outline" size={16} color="#718096" />
                                <Text style={styles.detailText}>{date}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Ionicons name="time-outline" size={16} color="#718096" />
                                <Text style={styles.detailText}>{time} ({duration} {duration === '1' ? 'hour' : 'hours'})</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Patient Information</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Full Name *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full name"
                            placeholderTextColor="#A0AEC0"
                            value={patientName}
                            onChangeText={setPatientName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email Address *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#A0AEC0"
                            value={patientEmail}
                            onChangeText={setPatientEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Phone Number *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your phone number"
                            placeholderTextColor="#A0AEC0"
                            value={patientPhone}
                            onChangeText={setPatientPhone}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Additional Notes (Optional)</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Any specific concerns or symptoms..."
                            placeholderTextColor="#A0AEC0"
                            value={notes}
                            onChangeText={setNotes}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Consultation Fee</Text>
                        <Text style={styles.summaryValue}>${doctor.serviceCharge}/hour</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Duration</Text>
                        <Text style={styles.summaryValue}>{duration} {duration === '1' ? 'hour' : 'hours'}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Service Fee</Text>
                        <Text style={styles.summaryValue}>$5.00</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>${parseInt(amount as string) + 5}.00</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.proceedButton, (!patientName || !patientEmail || !patientPhone) && styles.disabledButton]}
                    onPress={handleProceedToPayment}
                    disabled={!patientName || !patientEmail || !patientPhone}
                >
                    <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
                </TouchableOpacity>

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
    section: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 16,
    },
    appointmentCard: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    doctorAvatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
    },
    appointmentInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 4,
    },
    doctorSpecialty: {
        fontSize: 13,
        color: '#718096',
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 6,
    },
    detailText: {
        fontSize: 13,
        color: '#718096',
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2D3748',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F7FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        color: '#2D3748',
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    summaryLabel: {
        fontSize: 14,
        color: '#718096',
    },
    summaryValue: {
        fontSize: 14,
        color: '#2D3748',
        fontWeight: '500',
    },
    totalRow: {
        borderBottomWidth: 0,
        paddingTop: 16,
        marginTop: 8,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF8C42',
    },
    proceedButton: {
        backgroundColor: '#FF8C42',
        marginHorizontal: 20,
        marginTop: 12,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#CBD5E0',
    },
    proceedButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    bottomSpacer: {
        height: 40,
    },
});


