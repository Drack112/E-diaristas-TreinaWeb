import styled from '@emotion/native';
import { Button } from 'react-native-paper';

export const ButtonStyled = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth?: boolean }>`
    ${(props) => {
        if (props.mode === 'outlined') {
            return `border: 2px solid ${
                props.color || props.theme.colors.primary
            };`;
        }
    }}
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing(0.5)};
    max-width: 300px;
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    ${({ fullWidth }) => (fullWidth ? 'width: 100%;' : '')}
`;

ButtonStyled.defaultProps = {
    dark: true,
    uppercase: false,
};
