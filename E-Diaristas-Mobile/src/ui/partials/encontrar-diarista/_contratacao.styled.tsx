import styled from '@emotion/native';
import { Title, Paragraph } from 'react-native-paper';

export const ConfirmationContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.primary};
`;
export const ConfirmationTitle = styled(Title)`
    color: ${({ theme }) => theme.colors.accent};
    text-align: center;
    max-width: 300px;
    font-size: 30px;
`;
export const ConfirmationParagraph = styled(Paragraph)`
    color: white;
    text-align: center;
    max-width: 300px;
    font-size: 18px;
    margin: ${({ theme }) => theme.spacing(2) + ' 0 ' + theme.spacing(8)};
`;
