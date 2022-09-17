import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import useContratacao from 'data/hooks/pages/useContratacao.page';
import Breadcrumb from 'ui/components/navigation/Breadcrumb/Breadcrumb';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import { UserFormContainer } from 'ui/components/inputs/UserForm/UserForm';
import { FormProvider } from 'react-hook-form';
import DetalhesServico from './_detalhes-servico';
import { ActivityIndicator, Portal } from 'react-native-paper';
import CadastroCliente from './_cadastro-cliente';
import InformacoesPagamento from './_informacoes-pagamento';
import {
    ConfirmationContainer,
    ConfirmationParagraph,
    ConfirmationTitle,
} from './_contratacao.styled';
import FontIcon from 'ui/components/data-display/FontIcon/FontIcon';
import { useTheme } from '@emotion/react';
import Button from 'ui/components/inputs/Button/Button';
import { MobileViewService } from 'data/services/MobileViewService';
import DataList from 'ui/components/data-display/DataList/DataList';
import { TextFormatService } from 'data/services/TextFormatService';
import { UserContext } from 'data/contexts/UserContext';
import { ForceUserState } from 'data/@types/UserInterface';

interface ContratacaoProps {
    onDone: () => void;
}

const Contratacao: React.FC<ContratacaoProps> = ({ onDone }) => {
    const { colors } = useTheme(),
        scrollViewRef = useRef<ScrollView>(null),
        {
            step,
            setStep,
            breadcrumbItems,
            tipoLimpeza,
            tamanhoCasa,
            totalPrice,
            servicos,
            serviceForm,
            clientForm,
            paymentForm,
            onServiceFormSubmit,
            onClientFormSubmit,
            onPaymentFormSubmit,
            podemosAtender,
        } = useContratacao(),
        dataAtendimento = serviceForm.watch('faxina.data_atendimento', ''),
        { userState, userDispatch } = useContext(UserContext);

    useEffect(() => {
        setTimeout(() => {
            MobileViewService.scrollToTop(scrollViewRef.current);
        }, 100);
    }, [step]);

    useEffect(() => {
        if (!userState.user.nome_completo) {
            userDispatch({
                type: 'SET_FORCE_USER_STATE',
                payload: ForceUserState.unauthenticated,
            });
        }
    }, []);

    function handleOnDone() {
        userDispatch({
            type: 'SET_FORCE_USER_STATE',
            payload: ForceUserState.none,
        });
        onDone();
    }

    if (!servicos || servicos.length < 1) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <ScrollView ref={scrollViewRef}>
            {step < 4 && (
                <Breadcrumb
                    selected={breadcrumbItems[step - 1]}
                    items={breadcrumbItems}
                />
            )}

            {[2, 3].includes(step) && (
                <DataList
                    header={
                        <Text>
                            O valor total do serviço é:{' '}
                            {TextFormatService.currency(totalPrice)}
                        </Text>
                    }
                    body={
                        <>
                            <Text style={{ color: 'white' }}>
                                {tipoLimpeza?.nome}
                            </Text>
                            <Text style={{ color: 'white' }}>
                                Tamanho: {tamanhoCasa.join(', ')}
                            </Text>
                            <Text style={{ color: 'white' }}>
                                Data: {dataAtendimento}
                            </Text>
                        </>
                    }
                />
            )}

            {step === 1 && (
                <PageTitle title={'Nos conte um pouco sobre o serviço!'} />
            )}

            {step === 2 && (
                <PageTitle title={'Precisamos conhecer um pouco sobre você!'} />
            )}

            {step === 3 && (
                <PageTitle
                    title={'Informe os dados do cartão para pagamento'}
                    subtitle={
                        'Será feita uma reserva, mas o valor só será descontado quando você confirmar a presença do(a) diarista'
                    }
                />
            )}

            <UserFormContainer>
                <View style={{ display: step !== 1 ? 'none' : 'flex' }}>
                    <FormProvider {...serviceForm}>
                        <DetalhesServico
                            servicos={servicos}
                            comodos={tamanhoCasa.length}
                            podemosAtender={podemosAtender}
                            onSubmit={serviceForm.handleSubmit(
                                onServiceFormSubmit
                            )}
                        />
                    </FormProvider>
                </View>

                <View style={{ display: step !== 2 ? 'none' : 'flex' }}>
                    <FormProvider {...clientForm}>
                        <CadastroCliente
                            onBack={() => setStep(1)}
                            onSubmit={clientForm.handleSubmit(
                                onClientFormSubmit
                            )}
                        />
                    </FormProvider>
                </View>

                {step === 3 && (
                    <FormProvider {...paymentForm}>
                        <InformacoesPagamento
                            onSubmit={paymentForm.handleSubmit(
                                onPaymentFormSubmit
                            )}
                        />
                    </FormProvider>
                )}

                {step === 4 && (
                    <Portal>
                        <ConfirmationContainer>
                            <ConfirmationTitle>
                                Pagamento realizado com sucesso!
                            </ConfirmationTitle>
                            <ConfirmationParagraph>
                                Vamos escolher o/a melhor diarista para te
                                atender. Aguarde nossa confirmação!
                            </ConfirmationParagraph>
                            <FontIcon
                                icon={'check-circle'}
                                color={colors.accent}
                                size={145}
                            />
                            <Button
                                mode={'contained'}
                                color={colors.accent}
                                style={{ marginTop: 40 }}
                                fullWidth
                                onPress={handleOnDone}
                            >
                                Ir para minhas diárias
                            </Button>
                        </ConfirmationContainer>
                    </Portal>
                )}
            </UserFormContainer>
        </ScrollView>
    );
};

export default Contratacao;
