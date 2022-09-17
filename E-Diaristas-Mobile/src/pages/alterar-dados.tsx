import { useTheme } from '@emotion/react';
import { FormContainer } from '@partials/encontrar-diarista/_verificar-profissionais.styled';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { UserContext } from 'data/contexts/UserContext';
import useAlterarDados from 'data/hooks/pages/useAlterarDados.page';
import { LoginService } from 'data/services/LoginService';
import React, { useContext } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Button from 'ui/components/inputs/Button/Button';
import FileField from 'ui/components/inputs/FileField/FileField';
import {
    AddressForm,
    CitiesForm,
    ContactForm,
    FinancialForm,
    FormFieldsetTitle,
    UserDataForm,
    UserFormContainer,
} from 'ui/components/inputs/UserForm/UserForm';

const AlterarDados = () => {
    const { colors } = useTheme(),
        { userDispatch } = useContext(UserContext),
        {
            formMethods,
            onSubmit,
            picture,
            setPictureFile,
            user,
            userAddress,
            snackMessage,
            setSnackMessage,
        } = useAlterarDados();

    function logout() {
        LoginService.logout();
        userDispatch({
            type: 'SET_USER',
            payload: {
                nome_completo: '',
                nascimento: '',
                cpf: '',
                email: '',
                foto_usuario: '',
                telefone: '',
                tipo_usuario: UserType.Cliente,
                reputacao: 0,
                chave_pix: '',
            } as UserInterface,
        });
    }

    if (!user.nome_completo) {
        return (
            <View style={{ marginTop: 40 }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <>
            <ScrollView>
                <PageTitle title="Alterar dados cadastrais" />
                <UserFormContainer>
                    <FormProvider {...formMethods}>
                        <View style={{ marginBottom: 40 }}>
                            <Controller
                                name={'usuario.foto_usuario'}
                                defaultValue={picture}
                                control={formMethods.control}
                                render={({ field }) => (
                                    <FileField
                                        defaultValue={picture}
                                        onChange={(file) => {
                                            field.onChange([file]);
                                            setPictureFile(file);
                                        }}
                                    />
                                )}
                            />
                            <FormFieldsetTitle style={{ marginTop: 40 }}>
                                Dados pessoais
                            </FormFieldsetTitle>
                            <FormContainer>
                                <UserDataForm />
                            </FormContainer>
                        </View>

                        {user.tipo_usuario === UserType.Diarista && (
                            <View style={{ marginBottom: 40 }}>
                                <FormFieldsetTitle>
                                    Financeiro
                                </FormFieldsetTitle>
                                <FormContainer>
                                    <FinancialForm />
                                </FormContainer>
                            </View>
                        )}

                        <View style={{ marginBottom: 40 }}>
                            <FormFieldsetTitle>
                                Dados de acesso
                            </FormFieldsetTitle>
                            <FormContainer>
                                <ContactForm />
                            </FormContainer>
                        </View>

                        {user.tipo_usuario === UserType.Diarista && (
                            <>
                                <View style={{ marginBottom: 40 }}>
                                    <FormFieldsetTitle>
                                        Endereço
                                    </FormFieldsetTitle>
                                    <FormContainer>
                                        <AddressForm />
                                    </FormContainer>
                                </View>

                                <View style={{ marginBottom: 40 }}>
                                    <FormFieldsetTitle>
                                        Cidades
                                    </FormFieldsetTitle>
                                    <FormContainer>
                                        <CitiesForm
                                            estado={userAddress.estado}
                                        />
                                    </FormContainer>
                                </View>
                            </>
                        )}

                        <Button
                            mode={'contained'}
                            color={colors.accent}
                            fullWidth
                            style={{ marginBottom: 16 }}
                            onPress={formMethods.handleSubmit(onSubmit)}
                        >
                            Salvar
                        </Button>

                        <Button onPress={logout} fullWidth>
                            Logout
                        </Button>
                    </FormProvider>
                </UserFormContainer>
            </ScrollView>
            <Snackbar
                visible={snackMessage.length > 0}
                duration={4000}
                onDismiss={() => setSnackMessage('')}
            >
                {snackMessage}
            </Snackbar>
        </>
    );
};

export default AlterarDados;
