import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { handleAddCard } from '../actions/decks';
import { black, white, lightSteelBlue, weldonBlue } from '../utils/colors';

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'New Question'
    })

    setQuestion = text => this.setState(prevState => ({
        question: text,
        answer: prevState.answer
    }));

    setAnswer = text => this.setState(prevState => ({
        question: prevState.question,
        answer: text
    }));

    submit = () => {
        const { question, answer } = this.state;
        const { dispatch, navigation } = this.props;

        this.setState({
            question: '',
            answer: ''
        });

        dispatch(handleAddCard(navigation.state.params.title, question, answer));

        navigation.goBack();
    }

    render() {
        const { question, answer } = this.state;
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <TextInput style={styles.text} placeholder="Insert question" value={question} onChangeText={this.setQuestion} />
                </View>
                <View style={styles.textContainer}>
                    <TextInput style={styles.text} placeholder="Insert answer" value={answer} onChangeText={this.setAnswer} />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={{ color: white, fontSize: 20 }}>Add Card</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: weldonBlue
    },
    textContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: white,
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20
    },
    
    text: {flex: 1, fontSize: 25, color: white},
    
    button: {padding: 15, backgroundColor: black, borderRadius: 5, backgroundColor: lightSteelBlue,}
});

export default connect((state, { navigation }) => ({ navigation }))(AddCard);