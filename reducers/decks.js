import { DECKS_RECEIVED, ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions/decks';

export default (state = {}, action) => {
    switch (action.type) {
        case DECKS_RECEIVED:
            return {
                ...state,
                ...action.decks
            }

        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }

        case REMOVE_DECK:
            const {
                [action.deck]: omit,
                ...newState
            } = state;

            return newState;

        case ADD_CARD:
            const { title, question, answer } = action.deck;

            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: [
                        ...state[title].questions,
                        {
                            question,
                            answer
                        }
                    ]
                }
            }

        default:
            return {
                ...state
            }

    }
}