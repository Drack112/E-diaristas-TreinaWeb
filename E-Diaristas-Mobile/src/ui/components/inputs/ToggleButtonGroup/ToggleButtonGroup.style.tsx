import styled from '@emotion/native';
import { TouchableRipple } from 'react-native-paper';

export const ToggleButtonGroupStyled = styled.View`
    flex-flow: row;
    flex-wrap: wrap;
    width: 100%;
`;

export const ToggleButtonStyled = styled(TouchableRipple, {
    shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>`
    flex: 1;
    min-width: 100px;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(2)};
    margin: ${({ theme }) => theme.spacing(0.5)};
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    background-color: ${({ status, theme }) =>
        theme.colors[status === 'checked' ? 'accent' : 'background']};
    ${({ status, theme }) => {
        if (status === 'unchecked') {
            return `border: 1px solid ${theme.colors.grey[200]};`;
        }
    }}
`;

export const ToggleButtonText = styled.Text`
    text-align: center;
    margin-top: ${({ theme }) => theme.spacing()};
`;
