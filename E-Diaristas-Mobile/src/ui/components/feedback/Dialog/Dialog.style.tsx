import styled from '@emotion/native';
import { Dialog, Subheading } from 'react-native-paper';

export const DialogStyled = styled(Dialog)`
    flex: 1;
`;

export const DialogTitle = styled(Dialog.Title)``;

export const DialogSubtitle = styled(Subheading)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 14px;
    font-weight: bold;
    margin: ${({ theme }) => 0 + ' ' + 0 + ' ' + theme.spacing(3)};
`;

export const DialogContent = styled(Dialog.Content)`
    flex: 1;
    padding-top: ${({ theme }) => theme.spacing(2)};
`;

export const DialogActions = styled(Dialog.Actions)`
    height: 50px;
`;
