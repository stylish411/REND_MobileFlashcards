import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, auroumetalsaurus, lightSteelBlue, paynesGrey, weldonBlue } from '../utils/colors';

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title
    });

    addNewCard = () => {
        const { title, navigation } = this.props;
        navigation.navigate('AddCard', { title });
    }

    startQuiz = () => {
        const { title, navigation } = this.props;
        navigation.navigate('Quiz', { title });
    }

    render() {
        const { title, cards } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={[styles.titleText, { marginTop: 100 }]}>{title}</Text>
                    <Text style={styles.subText}>{`${cards} cards`}</Text>
                </View>
                <TouchableOpacity style={styles.button1} onPress={this.addNewCard}>
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
                {cards !== 0 &&
                    <TouchableOpacity style={[styles.button2]} onPress={this.startQuiz}>
                        <Text style={styles.buttonText}>Star a Quiz</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: weldonBlue
    },
    
    titleText: { fontSize: 40, textAlign: 'center', color: white},
    
    subText: { fontSize: 20, textAlign: 'center', color: auroumetalsaurus},
    
    button1: {
        borderRadius: 5,
        padding: 20,
        margin: 10,
        backgroundColor: lightSteelBlue,
        borderWidth: 1,
        borderColor: paynesGrey
    },
    button2: {
        borderRadius: 5,
        padding: 20,
        margin: 10,
        backgroundColor: paynesGrey,
        borderWidth: 1,
        borderColor: lightSteelBlue
    },
    
    buttonText: { fontSize: 20, textAlign: 'center', color: 'white'}
});

export default connect(({ decks }, { navigation }) => {
    const { title } = navigation.state.params;
    const deck = decks[title];

    return {
        title: deck.title,
        cards: deck.questions.length,
        navigation
    }
})(DeckView);