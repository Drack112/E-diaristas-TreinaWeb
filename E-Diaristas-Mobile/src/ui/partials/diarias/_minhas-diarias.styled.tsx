import styled from '@emotion/native';

export const ButtonsContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin: ${({ theme }) => theme.spacing(2) + ' ' + theme.spacing()};
`;
