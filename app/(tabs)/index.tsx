import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doctors } from '../../data/doctors';
import { serviceCategories } from '../../data/services';
import { articles } from '../../data/articles';

export default function Home() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const topDoctors = doctors.slice(0, 3);
    const featuredServices = serviceCategories.slice(0, 8);
    const recentArticles = articles.slice(0, 3);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.greeting}>Welcome Back! 👋</Text>
                        <Text style={styles.subtitle}>Find your doctor and get consultation</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={24} color="#2D3748" />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={() => router.push('/search-articles')}
                >
                    <Ionicons name="search" size={20} color="#718096" />
                    <Text style={styles.searchPlaceholder}>Search doctors, services...</Text>
                </TouchableOpacity>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <View style={styles.statIconContainer}>
                        <Ionicons name="people" size={24} color="#FF8C42" />
                    </View>
                    <Text style={styles.statNumber}>50+</Text>
                    <Text style={styles.statLabel}>Doctors</Text>
                </View>
                <View style={styles.statCard}>
                    <View style={styles.statIconContainer}>
                        <Ionicons name="medical" size={24} color="#4299E1" />
                    </View>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Services</Text>
                </View>
                <View style={styles.statCard}>
                    <View style={styles.statIconContainer}>
                        <Ionicons name="star" size={24} color="#48BB78" />
                    </View>
                    <Text style={styles.statNumber}>4.8</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                </View>
            </View>

            {/* Services Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Medical Services</Text>
                    <TouchableOpacity onPress={() => router.push('/services')}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.servicesScroll}
                >
                    {featuredServices.map((service) => (
                        <TouchableOpacity
                            key={service.id}
                            style={styles.serviceCard}
                            onPress={() => router.push(`/category-doctors?id=${service.id}&name=${service.name}`)}
                        >
                            <View style={styles.serviceIconContainer}>
                                <Image source={service.icon} style={styles.serviceIcon} resizeMode="contain" />
                            </View>
                            <Text style={styles.serviceName}>{service.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Top Doctors Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Doctors</Text>
                    <TouchableOpacity onPress={() => router.push('/services')}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                {topDoctors.map((doctor) => (
                    <TouchableOpacity
                        key={doctor.id}
                        style={styles.doctorCard}
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
                        </View>
                        <TouchableOpacity style={styles.bookmarkButton}>
                            <Ionicons name="bookmark-outline" size={20} color="#718096" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Recent Articles Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Health Articles</Text>
                    <TouchableOpacity onPress={() => router.push('/articles')}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.articlesScroll}
                >
                    {recentArticles.map((article) => (
                        <TouchableOpacity
                            key={article.id}
                            style={styles.articleCard}
                            onPress={() => router.push(`/article-detail?id=${article.id}`)}
                        >
                            <Image source={article.image} style={styles.articleImage} />
                            <View style={styles.articleContent}>
                                <View style={styles.articleCategory}>
                                    <Text style={styles.articleCategoryText}>{article.category}</Text>
                                </View>
                                <Text style={styles.articleTitle} numberOfLines={2}>
                                    {article.title}
                                </Text>
                                <View style={styles.articleFooter}>
                                    <View style={styles.articleAuthor}>
                                        <Ionicons name="person-circle-outline" size={16} color="#718096" />
                                        <Text style={styles.articleAuthorText}>{article.author}</Text>
                                    </View>
                                    <Text style={styles.articleDate}>{article.readTime}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Emergency Contact Banner */}
            <View style={styles.emergencyBanner}>
                <View style={styles.emergencyIconContainer}>
                    <Ionicons name="call" size={28} color="#FFFFFF" />
                </View>
                <View style={styles.emergencyContent}>
                    <Text style={styles.emergencyTitle}>Need Emergency Help?</Text>
                    <Text style={styles.emergencySubtitle}>Call us 24/7 at 911</Text>
                </View>
                <TouchableOpacity style={styles.emergencyButton}>
                    <Text style={styles.emergencyButtonText}>Call Now</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomSpacer} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#718096',
    },
    notificationButton: {
        padding: 8,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF8C42',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    searchPlaceholder: {
        fontSize: 14,
        color: '#A0AEC0',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF5F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#718096',
    },
    section: {
        paddingTop: 24,
        paddingBottom: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
    },
    seeAllText: {
        fontSize: 14,
        color: '#FF8C42',
        fontWeight: '500',
    },
    servicesScroll: {
        paddingHorizontal: 20,
        gap: 12,
    },
    serviceCard: {
        width: 100,
        alignItems: 'center',
    },
    serviceIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    serviceIcon: {
        width: 48,
        height: 48,
    },
    serviceName: {
        fontSize: 12,
        color: '#2D3748',
        textAlign: 'center',
        fontWeight: '500',
    },
    doctorCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
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
    bookmarkButton: {
        padding: 8,
    },
    articlesScroll: {
        paddingHorizontal: 20,
        gap: 16,
    },
    articleCard: {
        width: 280,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    articleImage: {
        width: '100%',
        height: 160,
    },
    articleContent: {
        padding: 16,
    },
    articleCategory: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFF5F0',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    articleCategoryText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#FF8C42',
    },
    articleTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 12,
        lineHeight: 22,
    },
    articleFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    articleAuthor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    articleAuthorText: {
        fontSize: 12,
        color: '#718096',
    },
    articleDate: {
        fontSize: 12,
        color: '#718096',
    },
    emergencyBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF8C42',
        marginHorizontal: 20,
        marginTop: 16,
        padding: 20,
        borderRadius: 16,
        gap: 16,
    },
    emergencyIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emergencyContent: {
        flex: 1,
    },
    emergencyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    emergencySubtitle: {
        fontSize: 13,
        color: '#FFFFFF',
        opacity: 0.9,
    },
    emergencyButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    emergencyButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF8C42',
    },
    bottomSpacer: {
        height: 40,
    },
});
