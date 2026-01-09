import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { serviceCategories } from '../../data/services';
import { doctors } from '../../data/doctors';

export default function Services() {
    const router = useRouter();
    const [showAllCategories, setShowAllCategories] = useState(false);

    const displayedCategories = showAllCategories ? serviceCategories : serviceCategories.slice(0, 12);
    const topDoctors = doctors.slice(0, 5);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>All Categories</Text>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={24} color="#2D3748" />
                </TouchableOpacity>
            </View>

            <View style={styles.categoriesSection}>
                <View style={styles.categoriesGrid}>
                    {displayedCategories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryCard}
                            onPress={() => router.push(`/components/services/category-doctors?id=${category.id}&name=${category.name}` as any)}
                        >
                            <View style={styles.categoryIconContainer}>
                                <Image source={category.icon} style={styles.categoryIcon} resizeMode="contain" />
                            </View>
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {!showAllCategories && serviceCategories.length > 12 && (
                    <TouchableOpacity
                        style={styles.seeMoreButton}
                        onPress={() => setShowAllCategories(true)}
                    >
                        <Text style={styles.seeMoreText}>See More</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.topDoctorsSection}>
                <Text style={styles.sectionTitle}>Top Doctors</Text>

                {topDoctors.map((doctor) => (
                    <TouchableOpacity
                        key={doctor.id}
                        style={styles.doctorCard}
                        onPress={() => router.push(`/components/services/doctor-detail?id=${doctor.id}` as any)}
                    >
                        <Image source={doctor.image} style={styles.doctorAvatar} />
                        <View style={styles.doctorInfo}>
                            <Text style={styles.doctorName}>{doctor.name}</Text>
                            <Text style={styles.doctorSpecialty}>
                                {doctor.specialty} • {doctor.specialties[1] || 'Psychiatry'}
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
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2D3748',
    },
    searchButton: {
        padding: 4,
    },
    categoriesSection: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '23%',
        alignItems: 'center',
        marginBottom: 20,
    },
    categoryIconContainer: {
        width: 70,
        height: 70,
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryIcon: {
        width: 40,
        height: 40,
    },
    categoryName: {
        fontSize: 11,
        color: '#2D3748',
        textAlign: 'center',
        lineHeight: 14,
    },
    seeMoreButton: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    seeMoreText: {
        fontSize: 14,
        color: '#718096',
        fontWeight: '500',
    },
    topDoctorsSection: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 100,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 16,
    },
    doctorCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
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
});
