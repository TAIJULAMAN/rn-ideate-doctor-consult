import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doctors } from '../../../data/doctors';

export default function DoctorDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const doctor = doctors.find(d => d.id === id);

    const [showFullAbout, setShowFullAbout] = useState(false);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'booking' | 'instant'>('booking');

    if (!doctor) {
        return (
            <View style={styles.container}>
                <Text>Doctor not found</Text>
            </View>
        );
    }

    const aboutText = doctor.about;
    const displayedAbout = showFullAbout ? aboutText : aboutText.substring(0, 200) + '...';

    // Calendar data for November 2020
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = [
        { day: 25, month: 'Nov' },
        { day: 26, month: 'Nov' },
        { day: 27, month: 'Nov' },
        { day: 28, month: 'Nov' },
        { day: 29, month: 'Nov' },
        { day: 30, month: 'Nov' },
        { day: 31, month: 'Nov' },
    ];

    const timeSlots = ['11.00', '12.00', '01.00', '02.00'];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerSection}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#2D3748" />
                    </TouchableOpacity>

                    <View style={styles.doctorHeader}>
                        <Image source={doctor.image} style={styles.doctorAvatar} />
                        <View style={styles.doctorHeaderInfo}>
                            <Text style={styles.doctorName}>{doctor.name}</Text>
                            <Text style={styles.doctorSpecialty}>
                                {doctor.specialty} &
                            </Text>
                            <Text style={styles.doctorSpecialty}>{doctor.specialties[1] || 'Psychiatry'}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.contentSection}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.aboutText}>
                        {displayedAbout}
                        {!showFullAbout && (
                            <Text style={styles.seeMoreLink} onPress={() => setShowFullAbout(true)}>
                                {' '}See More
                            </Text>
                        )}
                    </Text>

                    <Text style={styles.sectionTitle}>Specialties</Text>
                    <View style={styles.specialtiesContainer}>
                        {doctor.specialties.map((specialty, index) => (
                            <View key={index} style={styles.specialtyChip}>
                                <Text style={styles.specialtyText}>{specialty}</Text>
                            </View>
                        ))}
                    </View>

                    {doctor.hasInstantService && (
                        <View style={styles.viewModeToggle}>
                            <TouchableOpacity
                                style={[styles.toggleButton, viewMode === 'booking' && styles.toggleButtonActive]}
                                onPress={() => setViewMode('booking')}
                            >
                                <Text style={[styles.toggleText, viewMode === 'booking' && styles.toggleTextActive]}>
                                    Book Appointment
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.toggleButton, viewMode === 'instant' && styles.toggleButtonActive]}
                                onPress={() => setViewMode('instant')}
                            >
                                <Text style={[styles.toggleText, viewMode === 'instant' && styles.toggleTextActive]}>
                                    Instant Service
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {viewMode === 'booking' ? (
                        <>
                            <View style={styles.statsSection}>
                                <View style={styles.statCard}>
                                    <Ionicons name="people" size={28} color="#FF8C42" />
                                    <Text style={styles.statNumber}>{doctor.reviewsCount}+</Text>
                                    <Text style={styles.statLabel}>Patients</Text>
                                </View>
                                <View style={styles.statCard}>
                                    <Ionicons name="star" size={28} color="#FF8C42" />
                                    <Text style={styles.statNumber}>{doctor.rating}</Text>
                                    <Text style={styles.statLabel}>Rating</Text>
                                </View>
                                <View style={styles.statCard}>
                                    <Ionicons name="briefcase" size={28} color="#FF8C42" />
                                    <Text style={styles.statNumber}>{doctor.yearsExperience}</Text>
                                    <Text style={styles.statLabel}>Years Exp.</Text>
                                </View>
                            </View>

                            <View style={styles.reviewsSection}>
                                <Text style={styles.reviewsTitle}>Patient Reviews</Text>
                                <View style={styles.reviewsSummary}>
                                    <View style={styles.ratingRow}>
                                        <View style={styles.starsRow}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Ionicons
                                                    key={star}
                                                    name={star <= Math.floor(doctor.rating) ? 'star' : 'star-outline'}
                                                    size={20}
                                                    color="#FF8C42"
                                                />
                                            ))}
                                        </View>
                                        <Text style={styles.ratingText}>{doctor.rating} out of 5</Text>
                                    </View>
                                    <Text style={styles.reviewsCount}>{doctor.reviewsCount} verified reviews</Text>
                                </View>
                            </View>

                            <View style={styles.consultationInfo}>
                                <View style={styles.infoRow}>
                                    <Ionicons name="cash-outline" size={20} color="#718096" />
                                    <Text style={styles.infoLabel}>Consultation Fee</Text>
                                    <Text style={styles.infoValue}>${doctor.serviceCharge}/hour</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Ionicons name="time-outline" size={20} color="#718096" />
                                    <Text style={styles.infoLabel}>Available Hours</Text>
                                    <Text style={styles.infoValue}>9 AM - 8 PM</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Ionicons name="videocam-outline" size={20} color="#718096" />
                                    <Text style={styles.infoLabel}>Consultation Type</Text>
                                    <Text style={styles.infoValue}>Video/Voice/Chat</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.bookButton}
                                onPress={() => router.push(`/components/booking/book-appointment?id=${doctor.id}` as any)}
                            >
                                <Text style={styles.bookButtonText}>Book Appointment</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.instantServiceSection}>
                                <Text style={styles.instantServiceTitle}>
                                    You will get instant service{'\n'}from {doctor.name}
                                </Text>
                                <Text style={styles.serviceCharge}>
                                    Service charge: ${doctor.serviceCharge}.00/hours
                                </Text>
                                <Text style={styles.serviceDescription}>
                                    Service: you will get instant consultation{'\n'}through chat/voice/video call
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.bookButton}
                                onPress={() => router.push(`/components/booking/book-appointment?id=${doctor.id}` as any)}
                            >
                                <Text style={styles.bookButtonText}>Get Instant Service</Text>
                            </TouchableOpacity>
                        </>
                    )}
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
    headerSection: {
        backgroundColor: '#F7FAFC',
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },
    backButton: {
        marginBottom: 20,
        padding: 4,
    },
    doctorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    doctorAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
    },
    doctorHeaderInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 4,
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#718096',
        lineHeight: 20,
    },
    contentSection: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 100,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 12,
        marginTop: 8,
    },
    aboutText: {
        fontSize: 14,
        color: '#718096',
        lineHeight: 22,
        marginBottom: 20,
    },
    seeMoreLink: {
        color: '#FF8C42',
        fontWeight: '500',
    },
    specialtiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
        gap: 8,
    },
    specialtyChip: {
        backgroundColor: '#F7FAFC',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    specialtyText: {
        fontSize: 13,
        color: '#2D3748',
    },
    viewModeToggle: {
        flexDirection: 'row',
        backgroundColor: '#F7FAFC',
        borderRadius: 8,
        padding: 4,
        marginBottom: 24,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
    },
    toggleButtonActive: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    toggleText: {
        fontSize: 14,
        color: '#718096',
        fontWeight: '500',
    },
    toggleTextActive: {
        color: '#2D3748',
        fontWeight: '600',
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3748',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#718096',
        textAlign: 'center',
    },
    reviewsSection: {
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    reviewsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 12,
    },
    reviewsSummary: {
        gap: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    starsRow: {
        flexDirection: 'row',
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
    },
    reviewsCount: {
        fontSize: 13,
        color: '#718096',
    },
    consultationInfo: {
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    infoLabel: {
        flex: 1,
        fontSize: 14,
        color: '#718096',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
    },
    instantServiceSection: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    instantServiceTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2D3748',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 28,
    },
    serviceCharge: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 16,
    },
    serviceDescription: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 22,
    },
    bookButton: {
        backgroundColor: '#FF8C42',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    bookButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});


