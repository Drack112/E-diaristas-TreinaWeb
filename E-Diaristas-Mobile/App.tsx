import 'data/services/RNEnv';
import 'data/services/RNPolyfills';
import React from 'react';
import Router from 'ui/router/Router';
import ThemeProvider from 'ui/themes/ThemeProvider';
import { MainProvider } from 'data/contexts/MainContext';

export default function App() {
    return (
        <MainProvider>
            <ThemeProvider>
                <Router />
            </ThemeProvider>
        </MainProvider>
    );
}
