import React from 'react';
import { useTheme } from '@emotion/react';
import { View } from 'react-native';
import {
    FormFieldsetTitle,
    PaymentForm,
} from 'ui/components/inputs/UserForm/UserForm';
import Button from 'ui/components/inputs/Button/Button';

interface InformacoesPagamentoProps {
    onSubmit: () => void;
}

const InformacoesPagamento: React.FC<InformacoesPagamentoProps> = ({
    onSubmit,
}) => {
    const { colors } = useTheme();
    return (
        <View>
            <FormFieldsetTitle style={{ marginTop: 0 }}>
                Informações de pagamento
            </FormFieldsetTitle>
            <PaymentForm />

            <Button
                mode={'contained'}
                color={colors.accent}
                onPress={onSubmit}
                style={{ marginTop: 16 }}
            >
                Fazer pagamento
            </Button>
        </View>
    );
};

export default InformacoesPagamento;
