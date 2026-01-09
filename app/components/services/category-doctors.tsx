import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doctors } from '../../../data/doctors';
import { serviceCategories } from '../../../data/services';

export default function CategoryDoctors() {
    const router = useRouter();
    const { id, name } = useLocalSearchParams();

    const category = serviceCategories.find(c => c.id === id);
    const categoryDoctors = category
        ? doctors.filter(doctor => category.doctorIds.includes(doctor.id))
        : [];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{name}</Text>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={24} color="#2D3748" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Top {name}</Text>

                {categoryDoctors.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="medical-outline" size={64} color="#E2E8F0" />
                        <Text style={styles.emptyTitle}>No Doctors Available</Text>
                        <Text style={styles.emptyText}>
                            We don't have any {name} doctors at the moment.
                        </Text>
                    </View>
                ) : (
                    categoryDoctors.map((doctor) => (
                        <TouchableOpacity
                            key={doctor.id}
                            style={styles.doctorCard}
                            onPress={() => router.push(`/components/services/doctor-detail?id=${doctor.id}` as any)}
                        >
                            <Image source={doctor.image} style={styles.doctorAvatar} />
                            <View style={styles.doctorInfo}>
                                <Text style={styles.doctorName}>{doctor.name}</Text>
                                <Text style={styles.doctorSpecialty}>
                                    {doctor.specialty} • {doctor.specialties[1] || 'TeleMedicine'}
                                </Text>
                                <View style={styles.doctorMeta}>
                                    <View style={styles.ratingContainer}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Ionicons
                                                key={star}
                                                name={star <= Math.floor(doctor.rating) ? 'star' : 'star-outline'}
                                                size={14}
                                                color="#FF8C42"
                                            />
                                        ))}
                                    </View>
                                    <Text style={styles.reviewsText}>{doctor.reviewsCount} Reviews</Text>
                                    <Text style={styles.experienceText}>• {doctor.yearsExperience} Years Experience</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
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
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 16,
    },
    searchButton: {
        padding: 4,
    },
    scrollView: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 16,
    },
    doctorCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    doctorAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    doctorInfo: {
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
        marginBottom: 6,
    },
    doctorMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginRight: 6,
    },
    reviewsText: {
        fontSize: 12,
        color: '#FF8C42',
        fontWeight: '500',
    },
    experienceText: {
        fontSize: 12,
        color: '#718096',
        marginLeft: 4,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2D3748',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 20,
    },
});


