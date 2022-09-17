import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { useTheme } from '@emotion/react';
import Button from 'ui/components/inputs/Button/Button';
import {
    FormFieldsetTitle,
    NewContactForm,
    PictureForm,
    UserDataForm,
} from 'ui/components/inputs/UserForm/UserForm';

interface CadastroClienteProps {
    onBack: () => void;
    onSubmit: () => void;
}

const CadastroCliente: React.FC<CadastroClienteProps> = ({
    onBack,
    onSubmit,
}) => {
    const { colors } = useTheme();

    return (
        <View>
            <FormFieldsetTitle style={{ marginTop: 0 }}>
                Dados pessoais
            </FormFieldsetTitle>
            <UserDataForm cadastro={true} />

            <FormFieldsetTitle>
                Hora da self! Envie uma self segurando o documento
            </FormFieldsetTitle>
            <Paragraph
                style={{
                    marginTop: -16,
                    marginBottom: 16,
                    textAlign: 'center',
                }}
            >
                Para sua segurança, todos os profissionais e clientes precisam
                enviar. Essa foto não será vista por ninguém
            </Paragraph>
            <PictureForm />

            <FormFieldsetTitle>Dados de acesso</FormFieldsetTitle>
            <NewContactForm />

            <View>
                <Button
                    color={colors.accent}
                    mode={'contained'}
                    onPress={onSubmit}
                    fullWidth
                    style={{ marginTop: 32, marginBottom: 24 }}
                >
                    Ir para pagamento
                </Button>
                <Button
                    color={colors.primary}
                    mode={'outlined'}
                    onPress={onBack}
                    fullWidth
                >
                    Voltar
                </Button>
            </View>
        </View>
    );
};

export default CadastroCliente;
