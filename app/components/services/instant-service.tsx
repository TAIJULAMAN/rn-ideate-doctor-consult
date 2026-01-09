import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doctors } from '../../../data/doctors';

export default function InstantService() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const doctor = doctors.find(d => d.id === id);
    const [selectedService, setSelectedService] = useState<'chat' | 'voice' | 'video'>('chat');

    if (!doctor) {
        return (
            <View style={styles.container}>
                <Text>Doctor not found</Text>
            </View>
        );
    }

    const serviceOptions = [
        {
            id: 'chat' as const,
            icon: 'chatbubble-outline',
            title: 'Chat Consultation',
            description: 'Text-based consultation',
            duration: '30 min',
        },
        {
            id: 'voice' as const,
            icon: 'call-outline',
            title: 'Voice Call',
            description: 'Audio consultation',
            duration: '30 min',
        },
        {
            id: 'video' as const,
            icon: 'videocam-outline',
            title: 'Video Call',
            description: 'Face-to-face consultation',
            duration: '30 min',
        },
    ];

    const handleStartService = () => {
        // Navigate to appropriate service
        if (selectedService === 'chat') {
            router.push(`/components/messaging/chat-detail?id=${doctor.id}` as any);
        } else if (selectedService === 'voice') {
            router.push(`/components/messaging/audio-call?id=${doctor.id}` as any);
        } else {
            router.push(`/components/messaging/video-call?id=${doctor.id}` as any);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Instant Service</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Doctor Info */}
                <View style={styles.doctorSection}>
                    <Image source={doctor.image} style={styles.doctorAvatar} />
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#FF8C42" />
                        <Text style={styles.ratingText}>{doctor.rating}</Text>
                        <Text style={styles.reviewsText}>({doctor.reviewsCount} reviews)</Text>
                    </View>
                </View>

                {/* Service Info */}
                <View style={styles.infoCard}>
                    <Ionicons name="flash" size={24} color="#FF8C42" />
                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Get Instant Help</Text>
                        <Text style={styles.infoText}>
                            Connect with {doctor.name} immediately for quick consultation
                        </Text>
                    </View>
                </View>

                {/* Service Type Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Choose Service Type</Text>
                    {serviceOptions.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.serviceOption,
                                selectedService === option.id && styles.serviceOptionSelected
                            ]}
                            onPress={() => setSelectedService(option.id)}
                        >
                            <View style={[
                                styles.serviceIconContainer,
                                selectedService === option.id && styles.serviceIconContainerSelected
                            ]}>
                                <Ionicons
                                    name={option.icon as any}
                                    size={28}
                                    color={selectedService === option.id ? '#FFFFFF' : '#FF8C42'}
                                />
                            </View>
                            <View style={styles.serviceInfo}>
                                <Text style={[
                                    styles.serviceTitle,
                                    selectedService === option.id && styles.serviceTitleSelected
                                ]}>
                                    {option.title}
                                </Text>
                                <Text style={styles.serviceDescription}>{option.description}</Text>
                            </View>
                            <View style={styles.serviceRight}>
                                <Text style={styles.serviceDuration}>{option.duration}</Text>
                                <View style={[
                                    styles.radioButton,
                                    selectedService === option.id && styles.radioButtonSelected
                                ]}>
                                    {selectedService === option.id && (
                                        <View style={styles.radioButtonInner} />
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Pricing */}
                <View style={styles.pricingCard}>
                    <View style={styles.pricingRow}>
                        <Text style={styles.pricingLabel}>Service Charge</Text>
                        <Text style={styles.pricingValue}>${doctor.serviceCharge}/hour</Text>
                    </View>
                    <View style={styles.pricingRow}>
                        <Text style={styles.pricingLabel}>Duration</Text>
                        <Text style={styles.pricingValue}>30 minutes</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.pricingRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>${(doctor.serviceCharge / 2).toFixed(2)}</Text>
                    </View>
                </View>

                {/* Features */}
                <View style={styles.featuresSection}>
                    <Text style={styles.sectionTitle}>What's Included</Text>
                    <View style={styles.featuresList}>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color="#48BB78" />
                            <Text style={styles.featureText}>Instant connection</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color="#48BB78" />
                            <Text style={styles.featureText}>Professional consultation</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color="#48BB78" />
                            <Text style={styles.featureText}>Prescription if needed</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color="#48BB78" />
                            <Text style={styles.featureText}>Follow-up support</Text>
                        </View>
                    </View>
                </View>

                {/* Start Button */}
                <TouchableOpacity style={styles.startButton} onPress={handleStartService}>
                    <Ionicons name="flash" size={20} color="#FFFFFF" />
                    <Text style={styles.startButtonText}>Start Instant Service</Text>
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
    doctorSection: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    doctorAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
        borderWidth: 3,
        borderColor: '#FF8C42',
    },
    doctorName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 4,
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
    },
    reviewsText: {
        fontSize: 13,
        color: '#718096',
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF5F0',
        marginHorizontal: 20,
        marginTop: 20,
        padding: 16,
        borderRadius: 12,
        gap: 12,
        borderWidth: 1,
        borderColor: '#FFE8D9',
    },
    infoContent: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#C05621',
        marginBottom: 4,
    },
    infoText: {
        fontSize: 13,
        color: '#9C4221',
        lineHeight: 18,
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 16,
    },
    serviceOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#E2E8F0',
    },
    serviceOptionSelected: {
        borderColor: '#FF8C42',
        backgroundColor: '#FFF5F0',
    },
    serviceIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FFF5F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    serviceIconContainerSelected: {
        backgroundColor: '#FF8C42',
    },
    serviceInfo: {
        flex: 1,
    },
    serviceTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 4,
    },
    serviceTitleSelected: {
        color: '#FF8C42',
    },
    serviceDescription: {
        fontSize: 13,
        color: '#718096',
    },
    serviceRight: {
        alignItems: 'flex-end',
        gap: 8,
    },
    serviceDuration: {
        fontSize: 12,
        color: '#718096',
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
    pricingCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 24,
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    pricingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    pricingLabel: {
        fontSize: 14,
        color: '#718096',
    },
    pricingValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2D3748',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 12,
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
    featuresSection: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    featuresList: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12,
    },
    featureText: {
        fontSize: 14,
        color: '#2D3748',
    },
    startButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF8C42',
        marginHorizontal: 20,
        marginTop: 24,
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
    },
    startButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    bottomSpacer: {
        height: 40,
    },
});


