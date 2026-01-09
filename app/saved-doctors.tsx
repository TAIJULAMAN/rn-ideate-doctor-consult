import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doctors } from '../data/doctors';

export default function SavedDoctors() {
    const router = useRouter();
    const [savedDoctors, setSavedDoctors] = useState(doctors.slice(0, 5));

    const handleRemove = (doctorId: string) => {
        setSavedDoctors(savedDoctors.filter(d => d.id !== doctorId));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Saved Doctors</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {savedDoctors.length === 0 ? (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconContainer}>
                            <Ionicons name="bookmark-outline" size={64} color="#E2E8F0" />
                        </View>
                        <Text style={styles.emptyTitle}>No Saved Doctors</Text>
                        <Text style={styles.emptyText}>
                            You haven't saved any doctors yet. Tap the bookmark icon on doctor profiles to save them here.
                        </Text>
                        <TouchableOpacity
                            style={styles.browseButton}
                            onPress={() => router.push('/services')}
                        >
                            <Text style={styles.browseButtonText}>Browse Doctors</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.content}>
                        <Text style={styles.countText}>
                            {savedDoctors.length} {savedDoctors.length === 1 ? 'Doctor' : 'Doctors'} Saved
                        </Text>

                        {savedDoctors.map((doctor) => (
                            <View key={doctor.id} style={styles.doctorCard}>
                                <TouchableOpacity
                                    style={styles.doctorCardContent}
                                    onPress={() => router.push(`/doctor-detail?id=${doctor.id}`)}
                                >
                                    <Image source={doctor.image} style={styles.doctorAvatar} />
                                    <View style={styles.doctorInfo}>
                                        <Text style={styles.doctorName}>{doctor.name}</Text>
                                        <Text style={styles.doctorSpecialty} numberOfLines={1}>
                                            {doctor.specialty}
                                        </Text>
                                        <View style={styles.doctorMeta}>
                                            <View style={styles.ratingContainer}>
                                                <Ionicons name="star" size={14} color="#FF8C42" />
                                                <Text style={styles.ratingText}>{doctor.rating}</Text>
                                                <Text style={styles.reviewsText}>({doctor.reviewsCount})</Text>
                                            </View>
                                            <Text style={styles.experienceText}>
                                                {doctor.yearsExperience} years exp.
                                            </Text>
                                        </View>
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.priceLabel}>Consultation Fee:</Text>
                                            <Text style={styles.priceValue}>${doctor.serviceCharge}/hour</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.actionsContainer}>
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={() => handleRemove(doctor.id)}
                                    >
                                        <Ionicons name="bookmark" size={20} color="#FF8C42" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.bookButton}
                                        onPress={() => router.push(`/book-appointment?id=${doctor.id}`)}
                                    >
                                        <Text style={styles.bookButtonText}>Book Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

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
    emptyState: {
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 80,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F7FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    browseButton: {
        backgroundColor: '#FF8C42',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    browseButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    content: {
        padding: 20,
    },
    countText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#718096',
        marginBottom: 16,
    },
    doctorCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    doctorCardContent: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    doctorAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    doctorInfo: {
        flex: 1,
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
    doctorMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2D3748',
    },
    reviewsText: {
        fontSize: 12,
        color: '#718096',
    },
    experienceText: {
        fontSize: 12,
        color: '#718096',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    priceLabel: {
        fontSize: 12,
        color: '#718096',
    },
    priceValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF8C42',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    removeButton: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#FFF5F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFE8D9',
    },
    bookButton: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#FF8C42',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    bottomSpacer: {
        height: 40,
    },
});
