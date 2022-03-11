import AppTheme from "ui/themes/app-theme";

// Pegar toda a tipagem
type PaperThemeType = typeof AppTheme;

declare module "@emotion/react" {
  export interface Theme extends PaperThemeType {}
}
