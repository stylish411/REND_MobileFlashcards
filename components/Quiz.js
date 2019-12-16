import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white, lightPink, lightGreen, weldonBlue } from '../utils/colors';



class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz'
    });

    state = {
        index: 0,
        flip: false,
        correctAnswers: 0
    }

    toggle = () => {
        const { flip } = this.state;

        this.setState({
            flip: !flip
        });
    }

    submitAnswer = (correct = false) => {
        let { index, correctAnswers } = this.state;
        const { questions, navigation } = this.props;

        correct && ++correctAnswers;

        if (index === questions.length - 1) {
            const { title } = navigation.state.params;
            navigation.navigate('Score', { title, score: Math.round(correctAnswers / questions.length * 100) });
        }

        else {
            this.toggle(); //To filp the card back to Question
            this.setState({
                index: ++index,
                correctAnswers
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { questions } = nextProps;
        const { index } = nextState;

        return index < questions.length;
    }

    render() {
        const { questions } = this.props;
        const { index, flip } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.progress}>{`${index + 1} / ${questions.length}`}</Text>
                <View style={styles.container}>
                    <Text style={[styles.questionAnswerText]}>{flip ? questions[index].answer : questions[index].question}</Text>
                    <TouchableOpacity onPress={this.toggle}>
                        <Text style={styles.textButton}>{flip ? 'Show Question' : 'Show Answer'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.correct} onPress={() => this.submitAnswer(true)}>
                    <Text style={{ fontSize: 20, color: lightGreen, textAlign: 'center' }}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.incorrect} onPress={() => this.submitAnswer()}>
                    <Text style={{ fontSize: 20, color: lightPink, textAlign: 'center' }}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: weldonBlue
    },
    progress: {
        alignSelf: 'flex-start',
        fontSize: 15,
        margin: 5,
        textAlign: 'center',
        color: white
    },
    
    questionAnswerText: {fontSize: 30, textAlign: 'center', color: white},

    textButton: {color: lightGreen, marginTop: 15, fontSize: 16, textAlign: 'center'},

    correct: {
        padding: 15,
        borderWidth: 1,
        borderColor: lightGreen,
        borderRadius: 6,
        margin: 10,
        width: 160,

    },
    incorrect: {
        padding: 15,
        borderWidth: 1,
        borderColor: lightPink,
        borderRadius: 6,
        margin: 10,
        width: 160
    }
});

export default connect(({ decks }, { navigation }) => {
    const { title } = navigation.state.params;
    const { questions } = decks[title];

    return {
        questions: questions.sort(() => Math.random() - 0.5),
        navigation
    }
})(Quiz);