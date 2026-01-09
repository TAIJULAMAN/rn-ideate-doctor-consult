import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { articles } from '../../data/articles';

export default function Articles() {
    const router = useRouter();

    const handleArticlePress = (articleId: string) => {
        router.push(`/article-detail?id=${articleId}`);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Articles</Text>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => router.push('/search-articles')}
                >
                    <Ionicons name="search" size={24} color="#2D3748" />
                </TouchableOpacity>
            </View>

            {/* Articles List */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {articles.map((article) => (
                    <TouchableOpacity
                        key={article.id}
                        style={styles.articleCard}
                        onPress={() => handleArticlePress(article.id)}
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
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    searchButton: {
        padding: 4,
    },
    scrollView: {
        flex: 1,
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
