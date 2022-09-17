import styled from '@emotion/native';
import { Chip } from 'react-native-paper';

export const ChipsContainer = styled.View`
    padding: ${({ theme }) => theme.spacing()};
    margin: ${({ theme }) => theme.spacing(2) + ' 0'};
    background-color: ${({ theme }) => theme.colors.grey[50]};
    border: 1px solid ${({ theme }) => theme.colors.grey[100]};
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    min-height: 68px;
`;

export const ChipStyled = styled(Chip)`
    min-height: 32px;
    margin: ${({ theme }) => theme.spacing()};
`;
