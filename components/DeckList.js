import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { white, lightSteelBlue, weldonBlue, auroumetalsaurus } from '../utils/colors';

class DeckList extends Component {
    renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckView', { title: item.title })}>
                <Text style={{color: white, fontSize: 35}}>{item.title}</Text>
                <Text style={styles.cardCount}>{`${item.questions.length} cards`}</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        const { decks } = this.props;
        const data = Object.keys(decks).map(k => decks[k]);

        if (data.length == 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.noDeck}>No decks.{"\n"} Click on NEW DECK tab to add one.</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.title}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    container: { flex: 1, alignContent: 'center', backgroundColor: weldonBlue},

    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginBottom: 5,
        backgroundColor: lightSteelBlue,
        padding: 15,
        borderRadius: 5,
    },
    
    cardCount: { fontSize: 20, color: auroumetalsaurus, textAlign: 'center'},

    noDeck: {
        flex: 1,
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
        color: white
    }
})

export default connect(({ decks }) => ({ decks }))(DeckList);