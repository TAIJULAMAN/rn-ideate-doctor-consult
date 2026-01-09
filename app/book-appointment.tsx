import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doctors } from '../data/doctors';

export default function BookAppointment() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const doctor = doctors.find(d => d.id === id);

    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState(10); // November (0-indexed)
    const [selectedYear, setSelectedYear] = useState(2020);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<number>(1); // hours

    if (!doctor) {
        return (
            <View style={styles.container}>
                <Text>Doctor not found</Text>
            </View>
        );
    }

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00', '20:00'
    ];

    const durations = [1, 2, 3, 4];

    const totalAmount = doctor.serviceCharge * selectedDuration;

    const handlePreviousMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const handleProceedToCheckout = () => {
        if (!selectedDate || !selectedTime) {
            alert('Please select a date and time');
            return;
        }
        router.push({
            pathname: '/checkout',
            params: {
                doctorId: doctor.id,
                date: `${selectedDate} ${monthNames[selectedMonth]} ${selectedYear}`,
                time: selectedTime,
                duration: selectedDuration.toString(),
                amount: totalAmount.toString()
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Book Appointment</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.doctorSection}>
                    <Image source={doctor.image} style={styles.doctorAvatar} />
                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{doctor.name}</Text>
                        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                        <Text style={styles.serviceCharge}>${doctor.serviceCharge}/hour</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Date</Text>
                    <View style={styles.calendarContainer}>
                        <View style={styles.calendarHeader}>
                            <TouchableOpacity onPress={handlePreviousMonth} style={styles.monthButton}>
                                <Ionicons name="chevron-back" size={24} color="#2D3748" />
                            </TouchableOpacity>
                            <Text style={styles.monthYear}>
                                {monthNames[selectedMonth]} {selectedYear}
                            </Text>
                            <TouchableOpacity onPress={handleNextMonth} style={styles.monthButton}>
                                <Ionicons name="chevron-forward" size={24} color="#2D3748" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.weekDaysRow}>
                            {weekDays.map((day, index) => (
                                <Text key={index} style={styles.weekDay}>{day}</Text>
                            ))}
                        </View>

                        <View style={styles.daysGrid}>
                            {calendarDays.map((day, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dayCell,
                                        day === null && styles.emptyDay,
                                        day === selectedDate && styles.selectedDay
                                    ]}
                                    onPress={() => day && setSelectedDate(day)}
                                    disabled={day === null}
                                >
                                    {day && (
                                        <Text style={[
                                            styles.dayText,
                                            day === selectedDate && styles.selectedDayText
                                        ]}>
                                            {day}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Time</Text>
                    <View style={styles.timeSlotsGrid}>
                        {timeSlots.map((time) => (
                            <TouchableOpacity
                                key={time}
                                style={[
                                    styles.timeSlot,
                                    selectedTime === time && styles.selectedTimeSlot
                                ]}
                                onPress={() => setSelectedTime(time)}
                            >
                                <Text style={[
                                    styles.timeSlotText,
                                    selectedTime === time && styles.selectedTimeSlotText
                                ]}>
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Duration (Hours)</Text>
                    <View style={styles.durationContainer}>
                        {durations.map((duration) => (
                            <TouchableOpacity
                                key={duration}
                                style={[
                                    styles.durationButton,
                                    selectedDuration === duration && styles.selectedDuration
                                ]}
                                onPress={() => setSelectedDuration(duration)}
                            >
                                <Text style={[
                                    styles.durationText,
                                    selectedDuration === duration && styles.selectedDurationText
                                ]}>
                                    {duration} {duration === 1 ? 'hour' : 'hours'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.summarySection}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Service Charge</Text>
                        <Text style={styles.summaryValue}>${doctor.serviceCharge}/hour</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Duration</Text>
                        <Text style={styles.summaryValue}>{selectedDuration} {selectedDuration === 1 ? 'hour' : 'hours'}</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>${totalAmount}.00</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.proceedButton, (!selectedDate || !selectedTime) && styles.disabledButton]}
                    onPress={handleProceedToCheckout}
                    disabled={!selectedDate || !selectedTime}
                >
                    <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
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
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginBottom: 8,
    },
    doctorAvatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
    },
    doctorInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    doctorName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 4,
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 4,
    },
    serviceCharge: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF8C42',
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
    calendarContainer: {
        marginBottom: 8,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    monthButton: {
        padding: 8,
    },
    monthYear: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
    },
    weekDaysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12,
    },
    weekDay: {
        width: 40,
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '500',
        color: '#718096',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    emptyDay: {
        backgroundColor: 'transparent',
    },
    selectedDay: {
        backgroundColor: '#FF8C42',
        borderRadius: 8,
    },
    dayText: {
        fontSize: 14,
        color: '#2D3748',
        fontWeight: '500',
    },
    selectedDayText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    timeSlotsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    timeSlot: {
        width: '22%',
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#F7FAFC',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    selectedTimeSlot: {
        backgroundColor: '#FF8C42',
        borderColor: '#FF8C42',
    },
    timeSlotText: {
        fontSize: 14,
        color: '#2D3748',
        fontWeight: '500',
    },
    selectedTimeSlotText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    durationContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    durationButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#F7FAFC',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    selectedDuration: {
        backgroundColor: '#FF8C42',
        borderColor: '#FF8C42',
    },
    durationText: {
        fontSize: 14,
        color: '#2D3748',
        fontWeight: '500',
    },
    selectedDurationText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    summarySection: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginBottom: 20,
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
