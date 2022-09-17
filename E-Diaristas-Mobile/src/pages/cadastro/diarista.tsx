import { useTheme } from '@emotion/react';
import { UserContext } from 'data/contexts/UserContext';
import useCadastroDiarista from 'data/hooks/pages/cadastro/useCadastroDiarista.page';
import { LoginService } from 'data/services/LoginService';
import { MobileViewService } from 'data/services/MobileViewService';
import React, { useContext, useEffect, useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import Button from 'ui/components/inputs/Button/Button';
import {
    AddressForm,
    CitiesForm,
    FinancialForm,
    FormFieldsetTitle,
    NewContactForm,
    PictureForm,
    UserDataForm,
    UserFormContainer,
} from 'ui/components/inputs/UserForm/UserForm';
import Breadcrumb from 'ui/components/navigation/Breadcrumb/Breadcrumb';

const Diarista = () => {
    const { colors } = useTheme(),
        scrollViewRef = useRef<ScrollView>(null),
        {
            step,
            isWaitingResponse,
            breadcrumbItems,
            userForm,
            onUserSubmit,
            addressListForm,
            onAddressSubmit,
            newAddress,
            sucessoCadastro,
            enderecosAtendidos,
        } = useCadastroDiarista(),
        { userDispatch } = useContext(UserContext);

    useEffect(() => {
        setTimeout(() => {
            MobileViewService.scrollToTop(scrollViewRef.current);
        }, 100);
    }, [step]);

    async function onDone() {
        const user = await LoginService.getUser();

        userDispatch({ type: 'SET_USER', payload: user });
    }

    return (
        <ScrollView ref={scrollViewRef}>
            <Breadcrumb
                selected={breadcrumbItems[step - 1]}
                items={breadcrumbItems}
            />

            {step === 1 && (
                <PageTitle title={'Precisamos conhecer um pouco sobre você!'} />
            )}

            {step === 2 && (
                <PageTitle
                    title={'Quais cidades você atenderá?'}
                    subtitle={
                        <Text>
                            Você pode escolher se aceita ou não um serviço.
                            Então, não se preocupe se mora em uma grande cidade
                        </Text>
                    }
                />
            )}

            <UserFormContainer>
                <View style={{ display: step !== 1 ? 'none' : 'flex' }}>
                    <FormProvider {...userForm}>
                        <FormFieldsetTitle style={{ marginTop: 0 }}>
                            Dados pessoais
                        </FormFieldsetTitle>
                        <UserDataForm cadastro={true} />

                        <FormFieldsetTitle>Financeiro</FormFieldsetTitle>
                        <FinancialForm />

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
                            Para sua segurança, todos os profissionais e
                            clientes precisam enviar. Essa foto não será vista
                            por ninguém
                        </Paragraph>
                        <PictureForm />

                        <FormFieldsetTitle>Endereço</FormFieldsetTitle>
                        <AddressForm />

                        <FormFieldsetTitle>Dados de acesso</FormFieldsetTitle>
                        <NewContactForm />

                        <View>
                            <Button
                                color={colors.accent}
                                mode={'contained'}
                                onPress={userForm.handleSubmit(onUserSubmit)}
                                fullWidth
                                style={{ marginTop: 32, marginBottom: 24 }}
                                disabled={isWaitingResponse}
                            >
                                Cadastrar e escolher cidades
                            </Button>
                        </View>
                    </FormProvider>
                </View>

                <View style={{ display: step !== 2 ? 'none' : 'flex' }}>
                    <FormProvider {...addressListForm}>
                        <FormFieldsetTitle>
                            Selecione a cidade
                        </FormFieldsetTitle>

                        {newAddress && (
                            <CitiesForm estado={newAddress.estado} />
                        )}

                        <Button
                            color={colors.accent}
                            mode={'contained'}
                            onPress={addressListForm.handleSubmit(
                                onAddressSubmit
                            )}
                            fullWidth
                            style={{ marginTop: 32, marginBottom: 24 }}
                            disabled={
                                isWaitingResponse ||
                                enderecosAtendidos === undefined ||
                                enderecosAtendidos?.length === 0
                            }
                        >
                            Finalizar o cadastro
                        </Button>
                    </FormProvider>
                </View>

                <Dialog
                    isOpen={sucessoCadastro}
                    title={'Cadastro realizado com sucesso!'}
                    confirmLabel="Ver oportunidades"
                    onConfirm={onDone}
                    noCancel
                    onClose={() => {}}
                >
                    <Text>
                        Agora você pode visualizar as oportunidades disponíveis
                        na sua região.
                    </Text>
                </Dialog>
            </UserFormContainer>
        </ScrollView>
    );
};

export default Diarista;
