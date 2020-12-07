import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default class Splash extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.replace("Chat")
        }, 100)
    }

    render() {
        return (
            <View style={styles.splashContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
})