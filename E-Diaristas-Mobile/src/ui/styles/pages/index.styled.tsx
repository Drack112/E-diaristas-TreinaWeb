import styled from '@emotion/native';
import { View, ImageBackground } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import Button from 'ui/components/inputs/Button/Button';
import { LinearGradient } from 'expo-linear-gradient';

export const MainContainer = styled(View)`
    flex: 1;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(10) + ' ' + theme.spacing()};
    z-index: 1;
`;

export const RegisterContainer = styled(View)`
    flex: 1.4;
    justify-content: space-between;
`;

export const RegisterButtonsContainer = styled(View)`
    height: 120px;
    justify-content: space-between;
`;

export const TitleStyled = styled(Title)`
    text-align: center;
    text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
    color: white;
`;

export const ParagraphStyled = styled(Paragraph)`
    color: white;
    text-align: center;
    width: 300px;
    margin: ${({ theme }) => theme.spacing(2) + ' auto'};
`;

export const LoginContainer = styled(View)`
    flex: 1;
    justify-content: flex-end;
`;

export const RoundedButtonStyled = styled(Button)`
    border-radius: 50px;
`;

export const RoundedButtonLogin = styled(RoundedButtonStyled)`
    background-color: white;
`;

export const GradientBackground = styled(LinearGradient)`
    flex: 1;
    opacity: 0.9;
`;

export const BackgroundStyled = styled(ImageBackground)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
