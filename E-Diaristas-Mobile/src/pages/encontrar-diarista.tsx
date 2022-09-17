import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import VerificarProfissionais from '@partials/encontrar-diarista/_verificar-profissionais';
import { RootStackParamList } from 'ui/router/Router';
import Contratacao from '@partials/encontrar-diarista/_contratacao';
import useEncontrarDiarista from 'data/hooks/pages/useEncontrarDiarista.page';

type NavigationProp = StackNavigationProp<
    RootStackParamList,
    'EncontrarDiarista'
>;

const EncontrarDiaristas: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { podeContratar, setPodeContratar } = useEncontrarDiarista();

    function onDone() {
        // navigation.navigate('')
    }

    return (
        <>
            {!podeContratar ? (
                <VerificarProfissionais
                    onContratarProfissional={() => setPodeContratar(true)}
                />
            ) : (
                <Contratacao onDone={onDone} />
            )}
        </>
    );
};

export default EncontrarDiaristas;
