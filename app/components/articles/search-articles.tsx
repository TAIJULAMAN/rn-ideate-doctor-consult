import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { articles } from '../data/articles';

export default function SearchArticles() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#718096" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search articles..."
                        placeholderTextColor="#A0AEC0"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#718096" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {searchQuery.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Image source={require('../assets/search/s1.png')} style={styles.emptyImage} resizeMode="contain" />
                        <Text style={styles.emptyTitle}>Search Articles</Text>
                        <Text style={styles.emptyText}>
                            Find articles by title, author, or keywords
                        </Text>
                    </View>
                ) : filteredArticles.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={64} color="#E2E8F0" />
                        <Text style={styles.emptyTitle}>No Results Found</Text>
                        <Text style={styles.emptyText}>
                            Try searching with different keywords
                        </Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.resultsCount}>
                            {filteredArticles.length} {filteredArticles.length === 1 ? 'result' : 'results'} found
                        </Text>
                        {filteredArticles.map((article) => (
                            <TouchableOpacity
                                key={article.id}
                                style={styles.articleCard}
                                onPress={() => router.push(`/article-detail?id=${article.id}`)}
                            >
                                <View style={styles.cardContent}>
                                    <View style={styles.textContent}>
                                        <View style={styles.metaRow}>
                                            <Text style={styles.author}>{article.author}</Text>
                                            <Text style={styles.metaText}> · {article.readTime} · {article.date}</Text>
                                        </View>
                                        <Text style={styles.title} numberOfLines={2}>
                                            {article.title}
                                        </Text>
                                        <Text style={styles.description} numberOfLines={2}>
                                            {article.description}
                                        </Text>
                                    </View>
                                    <Image source={article.image} style={styles.articleImage} resizeMode="contain" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </>
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
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        gap: 12,
    },
    backButton: {
        padding: 4,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
    },
    searchIcon: {
        marginRight: 4,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#2D3748',
    },
    scrollView: {
        flex: 1,
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
    emptyImage: {
        width: 120,
        height: 120,
    },
    resultsCount: {
        fontSize: 14,
        color: '#718096',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    articleCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardContent: {
        flexDirection: 'row',
        gap: 12,
    },
    textContent: {
        flex: 1,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    author: {
        fontSize: 13,
        fontWeight: '500',
        color: '#FF8C42',
    },
    metaText: {
        fontSize: 13,
        color: '#718096',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 6,
        lineHeight: 24,
    },
    description: {
        fontSize: 14,
        color: '#718096',
        lineHeight: 20,
    },
    articleImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
});
