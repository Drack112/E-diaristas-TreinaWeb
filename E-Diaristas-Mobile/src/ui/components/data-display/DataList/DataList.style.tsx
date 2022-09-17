import styled from '@emotion/native';
import { List } from 'react-native-paper';

export const AccordionStyled = styled(List.Accordion)`
    background-color: ${({ theme }) => theme.colors.grey[100]};
`;

export const AccordionDetails = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => theme.spacing(2)};
`;

export const AccordionActions = styled.View`
    margin-top: ${({ theme }) => theme.spacing(2)};
    flex-direction: row;
    flex-wrap: wrap;
`;
