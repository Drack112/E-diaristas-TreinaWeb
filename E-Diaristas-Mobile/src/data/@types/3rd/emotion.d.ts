import { DefaultTheme as PaperTheme } from 'react-native-paper';
import AppTheme from 'ui/themes/app-theme';

type PaperThemeType = typeof AppTheme;

declare module '@emotion/react' {
    export interface Theme extends PaperThemeType {}
}
