import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doctors } from '../data/doctors';

export default function Payment() {
    const router = useRouter();
    const { doctorId, date, time, duration, amount, patientName, patientEmail } = useLocalSearchParams();
    const doctor = doctors.find(d => d.id === doctorId);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    if (!doctor) {
        return (
            <View style={styles.container}>
                <Text>Doctor not found</Text>
            </View>
        );
    }

    const totalAmount = parseInt(amount as string) + 5;

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
        { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
        { id: 'apple', name: 'Apple Pay', icon: 'logo-apple' },
        { id: 'google', name: 'Google Pay', icon: 'logo-google' },
    ];

    const handlePayment = () => {
        if (selectedPaymentMethod === 'card') {
            if (!cardNumber || !cardName || !expiryDate || !cvv) {
                alert('Please fill in all card details');
                return;
            }
        }

        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setShowSuccessModal(true);
        }, 2000);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        router.push('/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.amountSection}>
                    <Text style={styles.amountLabel}>Total Amount</Text>
                    <Text style={styles.amountValue}>${totalAmount}.00</Text>
                    <Text style={styles.amountSubtext}>
                        Appointment with {doctor.name}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Payment Method</Text>
                    {paymentMethods.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={[
                                styles.paymentMethodCard,
                                selectedPaymentMethod === method.id && styles.selectedPaymentMethod
                            ]}
                            onPress={() => setSelectedPaymentMethod(method.id)}
                        >
                            <View style={styles.paymentMethodLeft}>
                                <View style={[
                                    styles.iconContainer,
                                    selectedPaymentMethod === method.id && styles.selectedIconContainer
                                ]}>
                                    <Ionicons
                                        name={method.icon as any}
                                        size={24}
                                        color={selectedPaymentMethod === method.id ? '#FF8C42' : '#718096'}
                                    />
                                </View>
                                <Text style={[
                                    styles.paymentMethodName,
                                    selectedPaymentMethod === method.id && styles.selectedPaymentMethodName
                                ]}>
                                    {method.name}
                                </Text>
                            </View>
                            <View style={[
                                styles.radioButton,
                                selectedPaymentMethod === method.id && styles.radioButtonSelected
                            ]}>
                                {selectedPaymentMethod === method.id && (
                                    <View style={styles.radioButtonInner} />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {selectedPaymentMethod === 'card' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Card Details</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Card Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="1234 5678 9012 3456"
                                placeholderTextColor="#A0AEC0"
                                value={cardNumber}
                                onChangeText={setCardNumber}
                                keyboardType="numeric"
                                maxLength={19}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Cardholder Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="John Doe"
                                placeholderTextColor="#A0AEC0"
                                value={cardName}
                                onChangeText={setCardName}
                            />
                        </View>
                        <View style={styles.rowInputs}>
                            <View style={[styles.inputContainer, styles.halfInput]}>
                                <Text style={styles.inputLabel}>Expiry Date</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="MM/YY"
                                    placeholderTextColor="#A0AEC0"
                                    value={expiryDate}
                                    onChangeText={setExpiryDate}
                                    maxLength={5}
                                />
                            </View>
                            <View style={[styles.inputContainer, styles.halfInput]}>
                                <Text style={styles.inputLabel}>CVV</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="123"
                                    placeholderTextColor="#A0AEC0"
                                    value={cvv}
                                    onChangeText={setCvv}
                                    keyboardType="numeric"
                                    maxLength={3}
                                    secureTextEntry
                                />
                            </View>
                        </View>
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Booking Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Patient Name</Text>
                        <Text style={styles.summaryValue}>{patientName}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Date & Time</Text>
                        <Text style={styles.summaryValue}>{date}, {time}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Duration</Text>
                        <Text style={styles.summaryValue}>{duration} {duration === '1' ? 'hour' : 'hours'}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Consultation Fee</Text>
                        <Text style={styles.summaryValue}>${amount}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Service Fee</Text>
                        <Text style={styles.summaryValue}>$5.00</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${totalAmount}.00</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.payButton, isProcessing && styles.disabledButton]}
                    onPress={handlePayment}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <Text style={styles.payButtonText}>Processing...</Text>
                    ) : (
                        <Text style={styles.payButtonText}>Pay ${totalAmount}.00</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.bottomSpacer} />
            </ScrollView>

            <Modal
                visible={showSuccessModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.successIconContainer}>
                            <View style={styles.successIconCircle}>
                                <Ionicons name="checkmark" size={48} color="#FFFFFF" />
                            </View>
                        </View>

                        <Text style={styles.successTitle}>Payment Successful!</Text>
                        <Text style={styles.successMessage}>
                            Your appointment has been confirmed
                        </Text>

                        <View style={styles.bookingDetailsCard}>
                            <View style={styles.bookingDetailRow}>
                                <Ionicons name="person-outline" size={20} color="#718096" />
                                <Text style={styles.bookingDetailLabel}>Doctor</Text>
                                <Text style={styles.bookingDetailValue}>{doctor?.name}</Text>
                            </View>
                            <View style={styles.bookingDetailRow}>
                                <Ionicons name="calendar-outline" size={20} color="#718096" />
                                <Text style={styles.bookingDetailLabel}>Date</Text>
                                <Text style={styles.bookingDetailValue}>{date}</Text>
                            </View>
                            <View style={styles.bookingDetailRow}>
                                <Ionicons name="time-outline" size={20} color="#718096" />
                                <Text style={styles.bookingDetailLabel}>Time</Text>
                                <Text style={styles.bookingDetailValue}>{time}</Text>
                            </View>
                            <View style={styles.bookingDetailRow}>
                                <Ionicons name="cash-outline" size={20} color="#718096" />
                                <Text style={styles.bookingDetailLabel}>Amount</Text>
                                <Text style={styles.bookingDetailValue}>${totalAmount}.00</Text>
                            </View>
                        </View>

                        <Text style={styles.confirmationNote}>
                            A confirmation email has been sent to {patientEmail}
                        </Text>

                        <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                            <Text style={styles.modalButtonText}>Done</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.viewAppointmentButton}
                            onPress={() => {
                                setShowSuccessModal(false);
                                router.push('/');
                            }}
                        >
                            <Text style={styles.viewAppointmentText}>View My Appointments</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    amountSection: {
        backgroundColor: '#FF8C42',
        padding: 32,
        alignItems: 'center',
        marginBottom: 8,
    },
    amountLabel: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
        marginBottom: 8,
    },
    amountValue: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    amountSubtext: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
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
    paymentMethodCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        marginBottom: 12,
    },
    selectedPaymentMethod: {
        borderColor: '#FF8C42',
        backgroundColor: '#FFF5F0',
    },
    paymentMethodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F7FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedIconContainer: {
        backgroundColor: '#FFE8D9',
    },
    paymentMethodName: {
        fontSize: 15,
        color: '#2D3748',
        fontWeight: '500',
    },
    selectedPaymentMethodName: {
        fontWeight: '600',
        color: '#FF8C42',
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#CBD5E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        borderColor: '#FF8C42',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FF8C42',
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
    rowInputs: {
        flexDirection: 'row',
        gap: 12,
    },
    halfInput: {
        flex: 1,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF8C42',
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    securityText: {
        fontSize: 13,
        color: '#48BB78',
        fontWeight: '500',
    },
    payButton: {
        backgroundColor: '#FF8C42',
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#CBD5E0',
    },
    payButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    bottomSpacer: {
        height: 40,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 32,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    successIconContainer: {
        marginBottom: 24,
    },
    successIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#48BB78',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#48BB78',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 8,
        textAlign: 'center',
    },
    successMessage: {
        fontSize: 15,
        color: '#718096',
        textAlign: 'center',
        marginBottom: 24,
    },
    bookingDetailsCard: {
        width: '100%',
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    bookingDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 12,
    },
    bookingDetailLabel: {
        fontSize: 14,
        color: '#718096',
        flex: 1,
    },
    bookingDetailValue: {
        fontSize: 14,
        color: '#2D3748',
        fontWeight: '600',
        flex: 2,
        textAlign: 'right',
    },
    confirmationNote: {
        fontSize: 13,
        color: '#718096',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 18,
    },
    modalButton: {
        backgroundColor: '#FF8C42',
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    viewAppointmentButton: {
        paddingVertical: 12,
    },
    viewAppointmentText: {
        fontSize: 15,
        color: '#FF8C42',
        fontWeight: '600',
    },
});
