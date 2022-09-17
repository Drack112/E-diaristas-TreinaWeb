import styled from '@emotion/native';
import { TextInput, HelperText } from 'react-native-paper';

export const TextInputStyled = styled(TextInput)`
    margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`;

TextInputStyled.defaultProps = {
    mode: 'outlined',
};

export const HelperTextStyled = styled(HelperText)`
    margin-top: ${({ theme }) => theme.spacing(-1.5)};
    margin-bottom: ${({ theme }) => theme.spacing(2.5)};
`;
