import { Text } from 'react-native';
import styled from '@emotion/native';

export const StatusStyled = styled(Text, {
    shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>`
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    padding: ${({ theme }) => theme.spacing(0.5) + ' ' + theme.spacing(1.5)};
    font-size: 14px;
    color: white;
    background-color: ${({ bgColor }) => bgColor};
`;
