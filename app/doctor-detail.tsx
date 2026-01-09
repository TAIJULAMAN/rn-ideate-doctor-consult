import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doctors } from '../data/doctors';

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
                            <View style={styles.calendarSection}>
                                <View style={styles.calendarHeader}>
                                    <TouchableOpacity>
                                        <Ionicons name="chevron-back" size={24} color="#2D3748" />
                                    </TouchableOpacity>
                                    <Text style={styles.calendarMonth}>November 2020</Text>
                                    <TouchableOpacity>
                                        <Ionicons name="chevron-forward" size={24} color="#2D3748" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.weekDaysContainer}>
                                    {weekDays.map((day, index) => (
                                        <Text
                                            key={index}
                                            style={[
                                                styles.weekDay,
                                                index === 6 && styles.weekDaySaturday,
                                            ]}
                                        >
                                            {day}
                                        </Text>
                                    ))}
                                </View>

                                <View style={styles.datesContainer}>
                                    {dates.map((date, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.dateButton,
                                                selectedDate === date.day && styles.dateButtonSelected,
                                            ]}
                                            onPress={() => setSelectedDate(date.day)}
                                        >
                                            <Text
                                                style={[
                                                    styles.dateText,
                                                    selectedDate === date.day && styles.dateTextSelected,
                                                ]}
                                            >
                                                {date.day}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.timeSlotsContainer}>
                                {timeSlots.map((time, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.timeSlot,
                                            selectedTime === time && styles.timeSlotSelected,
                                        ]}
                                        onPress={() => setSelectedTime(time)}
                                    >
                                        <Text
                                            style={[
                                                styles.timeSlotText,
                                                selectedTime === time && styles.timeSlotTextSelected,
                                            ]}
                                        >
                                            {time}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={styles.bookButton}
                                onPress={() => router.push(`/book-appointment?id=${doctor.id}`)}
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
                                onPress={() => alert('Instant service feature coming soon!')}
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
    calendarSection: {
        marginBottom: 24,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    calendarMonth: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
    },
    weekDaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    weekDay: {
        fontSize: 13,
        color: '#2D3748',
        fontWeight: '500',
        width: 40,
        textAlign: 'center',
    },
    weekDaySaturday: {
        color: '#FF8C42',
    },
    datesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dateButton: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
    },
    dateButtonSelected: {
        backgroundColor: '#FF8C42',
    },
    dateText: {
        fontSize: 14,
        color: '#718096',
        fontWeight: '500',
    },
    dateTextSelected: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    timeSlotsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        gap: 8,
    },
    timeSlot: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#F7FAFC',
        alignItems: 'center',
    },
    timeSlotSelected: {
        backgroundColor: '#FF8C42',
    },
    timeSlotText: {
        fontSize: 14,
        color: '#2D3748',
        fontWeight: '600',
    },
    timeSlotTextSelected: {
        color: '#FFFFFF',
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
