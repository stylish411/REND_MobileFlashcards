import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { white, weldonBlue, lightSteelBlue } from '../utils/colors';
import { handleAddDeck } from '../actions/decks';

export class AddDeck extends Component {
    state = {
        title: ''
    }

    textChanged = title => this.setState({ title });

    submit = () => {
        const { title } = this.state;
        const { dispatch, navigation } = this.props;

        this.setState({ title: '' });

        dispatch(handleAddDeck(title));

        navigation.reset(
            [NavigationActions.navigate({ routeName: 'Home' })],
            0
        );
    }

    render() {
        const { title } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Name your deck</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.input} placeholder="Deck Name" value={title} onChangeText={this.textChanged} />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.submit} disabled={title.length === 0}>
                    <Text style={{ color: white, fontSize: 20 }}>Create Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 180,
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: weldonBlue
    },

    title: {fontSize: 40, textAlign: 'center', color: white},

    input: {
        flex: 1,
        fontSize: 25,
        color: white,
        padding: 15,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: white,
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    
    button: { backgroundColor: lightSteelBlue, borderRadius: 5, padding: 10, marginTop: 20}
});

export default connect(({ state }, { navigation }) => ({ navigation }))(AddDeck);