import styled from '@emotion/native';
import { Text } from 'react-native';

export const BreadcrumbContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    padding: 0;
    margin-bottom: ${({ theme }) => theme.spacing(-1)};
`;

export const BreadcrumbItem = styled(Text, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>`
    flex: 1;
    text-align: center;
    padding: ${({ theme }) => theme.spacing()};
    color: ${({ theme }) => theme.colors.textSecondary};
    background-color: ${({ theme, isSelected }) =>
        theme.colors.grey[isSelected ? 200 : 100]};
`;
