import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const DECKS_STORAGE_KEY = 'MobileFlashcards:Decks';
const DECKS_NOTIFICATION_KEY = 'MobileFlashcards:Notification';

export const getDecks = () => AsyncStorage.getItem(DECKS_STORAGE_KEY).then(JSON.parse);

export const saveDeckTitle = title => AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
        title: title,
        questions: []
    }
}))
    .then(() => ({
        [title]: {
            title: title,
            questions: []
        }
    }));

export const addCardToDeck = (title, question, answer) => getDecks()
    .then(decks => {
        decks[title].questions.push({ question, answer });
        return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    })
    .then(() => ({ title, question, answer }));


    export const clearLocalNotification = () => AsyncStorage.removeItem(DECKS_NOTIFICATION_KEY)
    .then((Notifications.cancelAllScheduledNotificationsAsync));


export const createNotification = () => ({
    title: 'Time to study!',
    body: 'No pain! No gain!',
    ios: {
        sound: true
    },
    android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
    }
})

export const setLocalNotification = () => {
    AsyncStorage.getItem(DECKS_NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1 );
                            tomorrow.setHours(15);
                            tomorrow.setMinutes(30); // 3:30pm

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                });

                            AsyncStorage.setItem(DECKS_NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    });
            }
        });
}