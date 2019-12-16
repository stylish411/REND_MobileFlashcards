import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { weldonBlue, paynesGrey, lightSteelBlue, yellow, white } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

const restart = (title, navigation) =>
    navigation.reset(
        [
            NavigationActions.navigate({ routeName: 'Home', params: { title } }),
            NavigationActions.navigate({ routeName: 'DeckView', params: { title } }),
            NavigationActions.navigate({ routeName: 'Quiz', params: { title } })
        ],
        2);

export default ({ navigation }) => {
    const { title, score } = navigation.state.params;

    clearLocalNotification()
        .then(setLocalNotification);

    return (
        <View style={styles.container}>
            <Text style={styles.scoreText}>Your Score</Text>
            <Text style={styles.scoreValue}>{`${score}%`}</Text>
            <TouchableOpacity style={[styles.button1]} onPress={() => restart(title, navigation)}>
                <Text style={styles.button1text}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('DeckView', { title })}>
                <Text style={styles.button2text}>Back to Deck</Text>
            </TouchableOpacity>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: weldonBlue
    },
    scoreText: {fontSize: 40, marginTop: 10, color: white},

    scoreValue: {
        fontSize: 50,
        color: yellow,
        flex: 1,
        marginTop: 20,
    },
    button1: {
        marginBottom: 10,
        width: 160,
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: lightSteelBlue,
        borderWidth: 1,
        borderColor: paynesGrey
    },
    button2: {
        marginBottom: 10,
        width: 160,
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: paynesGrey,
        borderWidth: 1,
        borderColor: lightSteelBlue
    },

    button1text: {color: paynesGrey, fontSize: 15, textAlign: 'center'},

    button2text: {color: lightSteelBlue, fontSize: 15, textAlign: 'center'},
});
