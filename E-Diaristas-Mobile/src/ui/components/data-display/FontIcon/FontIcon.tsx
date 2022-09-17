import React from 'react';
import { useFonts } from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import iconSelection from '@assets/fonts/tw-icons/selection.json';
import { useTheme } from '@emotion/react';

const Icon = createIconSetFromIcoMoon(iconSelection, 'TWF', 'twf.ttf');

export interface FontIconProps {
    icon: TwIcon;
    size?: number;
    color?: string;
}

const FontIcon: React.FC<FontIconProps> = ({ icon, size, color }) => {
    const { colors } = useTheme(),
        [fontsLoaded] = useFonts({
            TWF: require('@assets/fonts/tw-icons/fonts/twf.ttf'),
        });

    if (!fontsLoaded) {
        return null;
    }

    return <Icon name={icon} size={size || 16} color={color || colors.text} />;
};

export default FontIcon;
