import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalStorage = {
    async get<T>(key: string, defaultValue: T): Promise<T | string> {
        const value = await AsyncStorage.getItem(key);
        if (value === null) {
            return defaultValue;
        }
        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    },
    async set<T>(key: string, value: T) {
        if (typeof value !== 'string') {
            AsyncStorage.setItem(key, JSON.stringify(value));
        } else {
            AsyncStorage.setItem(key, value);
        }
    },
    clear(key: string) {
        AsyncStorage.removeItem(key);
    },
    clearAll() {
        AsyncStorage.clear();
    },
};
