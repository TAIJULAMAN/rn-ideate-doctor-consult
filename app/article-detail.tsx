import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { articles } from '../data/articles';

export default function ArticleDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const article = articles.find(a => a.id === id);

    if (!article) {
        return (
            <View style={styles.container}>
                <Text>Article not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2D3748" />
                </TouchableOpacity>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="share-social-outline" size={24} color="#2D3748" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="bookmark-outline" size={24} color="#2D3748" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Article Image */}
                <View style={styles.imageContainer}>
                    <Image source={article.image} style={styles.articleImage} resizeMode="contain" />
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Ionicons name="heart" size={20} color="#FF8C42" />
                        <Text style={styles.statText}>{article.likes}k</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statText}>{article.comments} comments</Text>
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>{article.title}</Text>

                {/* Author Info */}
                <View style={styles.authorContainer}>
                    <View style={styles.authorAvatar}>
                        <Ionicons name="person" size={20} color="#718096" />
                    </View>
                    <View style={styles.authorInfo}>
                        <Text style={styles.authorName}>{article.author}</Text>
                        <Text style={styles.authorMeta}>
                            {article.readTime} · {article.date}
                        </Text>
                    </View>
                </View>

                {/* Article Content */}
                <View style={styles.contentContainer}>
                    <Text style={styles.contentText}>{article.content}</Text>
                </View>

                {/* Comments Section */}
                <View style={styles.commentsSection}>
                    <Text style={styles.commentsTitle}>Comments ({article.comments})</Text>

                    {/* Comment 1 */}
                    <View style={styles.commentItem}>
                        <View style={styles.commentAvatar}>
                            <Ionicons name="person" size={18} color="#718096" />
                        </View>
                        <View style={styles.commentContent}>
                            <View style={styles.commentHeader}>
                                <Text style={styles.commentAuthor}>Sarah Johnson</Text>
                                <Text style={styles.commentTime}>2h ago</Text>
                            </View>
                            <Text style={styles.commentText}>
                                This is such an insightful article! I've been trying to improve my memory and these tips are really practical. Thank you for sharing! 🙏
                            </Text>
                            <View style={styles.commentActions}>
                                <TouchableOpacity style={styles.commentAction}>
                                    <Ionicons name="heart" size={16} color="#FF8C42" />
                                    <Text style={styles.commentActionText}>24</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.commentAction}>
                                    <Ionicons name="chatbubble-outline" size={16} color="#718096" />
                                    <Text style={styles.commentActionText}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Comment 2 */}
                    <View style={styles.commentItem}>
                        <View style={styles.commentAvatar}>
                            <Ionicons name="person" size={18} color="#718096" />
                        </View>
                        <View style={styles.commentContent}>
                            <View style={styles.commentHeader}>
                                <Text style={styles.commentAuthor}>Michael Chen</Text>
                                <Text style={styles.commentTime}>5h ago</Text>
                            </View>
                            <Text style={styles.commentText}>
                                Great read! I've started implementing these hobbies and already seeing improvements. 💪
                            </Text>
                            <View style={styles.commentActions}>
                                <TouchableOpacity style={styles.commentAction}>
                                    <Ionicons name="heart-outline" size={16} color="#718096" />
                                    <Text style={styles.commentActionText}>12</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.commentAction}>
                                    <Ionicons name="chatbubble-outline" size={16} color="#718096" />
                                    <Text style={styles.commentActionText}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Comment 3 */}
                    <View style={styles.commentItem}>
                        <View style={styles.commentAvatar}>
                            <Ionicons name="person" size={18} color="#718096" />
                        </View>
                        <View style={styles.commentContent}>
                            <View style={styles.commentHeader}>
                                <Text style={styles.commentAuthor}>Emily Rodriguez</Text>
                                <Text style={styles.commentTime}>1d ago</Text>
                            </View>
                            <Text style={styles.commentText}>
                                Would love to see more articles like this. Very informative and well-written! ✨
                            </Text>
                            <View style={styles.commentActions}>
                                <TouchableOpacity style={styles.commentAction}>
                                    <Ionicons name="heart" size={16} color="#FF8C42" />
                                    <Text style={styles.commentActionText}>18</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.commentAction}>
                                    <Ionicons name="chatbubble-outline" size={16} color="#718096" />
                                    <Text style={styles.commentActionText}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Bottom Spacing */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Comment Input */}
            <View style={styles.commentBar}>
                <TouchableOpacity style={styles.likeButton}>
                    <Ionicons name="heart-outline" size={24} color="#2D3748" />
                </TouchableOpacity>
                <View style={styles.commentInput}>
                    <Text style={styles.commentPlaceholder}>Write a comment</Text>
                </View>
                <TouchableOpacity style={styles.sendButton}>
                    <Ionicons name="send" size={24} color="#FF8C42" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    headerButton: {
        padding: 4,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 16,
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#F0FFF4',
    },
    articleImage: {
        width: '80%',
        height: 250,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 12,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 14,
        color: '#718096',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3748',
        paddingHorizontal: 20,
        marginBottom: 16,
        lineHeight: 36,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 12,
    },
    authorAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    authorInfo: {
        flex: 1,
    },
    authorName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF8C42',
        marginBottom: 2,
    },
    authorMeta: {
        fontSize: 13,
        color: '#718096',
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    contentText: {
        fontSize: 16,
        color: '#2D3748',
        lineHeight: 26,
    },
    commentsSection: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        marginTop: 24,
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 20,
    },
    commentItem: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 12,
    },
    commentAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    commentAuthor: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
    },
    commentTime: {
        fontSize: 12,
        color: '#A0AEC0',
    },
    commentText: {
        fontSize: 14,
        color: '#4A5568',
        lineHeight: 20,
        marginBottom: 8,
    },
    commentActions: {
        flexDirection: 'row',
        gap: 16,
    },
    commentAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    commentActionText: {
        fontSize: 13,
        color: '#718096',
    },
    commentBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        gap: 12,
    },
    likeButton: {
        padding: 4,
    },
    commentInput: {
        flex: 1,
        backgroundColor: '#F7FAFC',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    commentPlaceholder: {
        fontSize: 14,
        color: '#A0AEC0',
    },
    sendButton: {
        padding: 4,
    },
});
