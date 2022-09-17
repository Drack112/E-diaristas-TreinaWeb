import React from 'react';
import { ThemeProvider as EmotionProvider } from '@emotion/react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppTheme from './app-theme';

const ThemeProvider: React.FC = ({ children }) => {
    return (
        <EmotionProvider theme={AppTheme}>
            <PaperProvider theme={AppTheme}>{children}</PaperProvider>
        </EmotionProvider>
    );
};

export default ThemeProvider;
