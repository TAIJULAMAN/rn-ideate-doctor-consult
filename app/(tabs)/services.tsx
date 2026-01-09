import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Services() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Services</Text>
                <Text style={styles.subtitle}>Browse our medical services</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Services Screen</Text>
                    <Text style={styles.placeholderSubtext}>Coming Soon</Text>
                </View>
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
        backgroundColor: '#FFFFFF',
        padding: 24,
        paddingTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#718096',
    },
    content: {
        padding: 24,
    },
    placeholder: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    placeholderText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 4,
    },
    placeholderSubtext: {
        fontSize: 14,
        color: '#718096',
    },
});
