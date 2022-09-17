import { useTheme } from '@emotion/react';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Portal } from 'react-native-paper';
import Button from 'ui/components/inputs/Button/Button';
import {
    DialogStyled,
    DialogActions,
    DialogTitle,
    DialogSubtitle,
    DialogContent,
} from './Dialog.style';

export interface DialogProps {
    title?: string;
    subtitle?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    noConfirm?: boolean;
    noCancel?: boolean;
    onClose: () => void;
    isOpen: boolean;
    fullHeight?: boolean;
}

const Dialog: React.FC<DialogProps> = (props) => {
    const { colors } = useTheme();
    return (
        <Portal>
            <DialogStyled
                dismissable={!props.noCancel}
                visible={props.isOpen}
                onDismiss={props.onCancel || (() => {})}
            >
                {/* @ts-ignore */}
                {props.title && <DialogTitle>{props.title}</DialogTitle>}

                <DialogContent>
                    {props.subtitle && (
                        <DialogSubtitle>{props.subtitle}</DialogSubtitle>
                    )}
                    {props.fullHeight ? (
                        <ScrollView>{props.children}</ScrollView>
                    ) : (
                        props.children
                    )}
                </DialogContent>

                {(!props.noCancel || !props.noConfirm) && (
                    <DialogActions
                        style={{ height: props.fullHeight ? 50 : 'auto' }}
                    >
                        <View style={{ flex: 1 }} />
                        {!props.noCancel && (
                            <Button
                                onPress={props.onCancel || props.onClose}
                                mode={'outlined'}
                                style={{ flex: 2 }}
                            >
                                {props.cancelLabel || 'Fechar'}
                            </Button>
                        )}
                        {!props.noConfirm && (
                            <Button
                                onPress={props.onConfirm || props.onClose}
                                mode={'contained'}
                                color={colors.accent}
                                style={{ flex: 2, marginLeft: 16 }}
                            >
                                {props.confirmLabel || 'Confirmar'}
                            </Button>
                        )}
                    </DialogActions>
                )}
            </DialogStyled>
        </Portal>
    );
};

export default Dialog;
