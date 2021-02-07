import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default function ({ children }: any) {
    return (
        <View style={styles.container}>
            <ActivityIndicator />
            {children || null}
        </View>
    );
}
