import React, { useContext, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@emotion/react';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import { TextFormatService } from 'data/services/TextFormatService';
import { DateService } from 'data/services/DateService';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import { Caption, Subheading, Title } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import TextInput from 'ui/components/inputs/TextInput/TextInput';
import { UserContext } from 'data/contexts/UserContext';
import { UserType } from 'data/@types/UserInterface';

interface DialogProps {
    diaria: DiariaInterface;
    onConfirm: (diaria: DiariaInterface) => void;
    onCancel: () => void;
}

export const JobBox: React.FC<{ diaria: DiariaInterface }> = ({ diaria }) => {
    const { colors } = useTheme();
    return (
        <View>
            <Text style={{ color: colors.textSecondary }}>
                Data:{' '}
                <Text style={{ fontWeight: 'bold' }}>
                    {TextFormatService.reverseDate(
                        diaria.data_atendimento as string
                    )}{' '}
                    às{' '}
                    {DateService.getTimeFromDate(
                        diaria.data_atendimento as string
                    )}
                </Text>
            </Text>
            <Text style={{ color: colors.textSecondary }}>
                Endereço: {TextFormatService.getAddress(diaria)}
            </Text>
            <Text style={{ fontWeight: 'bold', color: colors.textSecondary }}>
                Valor: {TextFormatService.currency(diaria.preco)}
            </Text>
        </View>
    );
};

export const ConfirmDialog: React.FC<DialogProps> = (props) => {
    const diarista = props.diaria.diarista;
    return (
        <Dialog
            isOpen={true}
            onClose={props.onCancel}
            onConfirm={() => props.onConfirm(props.diaria)}
            subtitle={
                'Você confirma a presença do(a) diarista na diária abaixo?'
            }
        >
            <ScrollView>
                <JobBox diaria={props.diaria} />

                <UserInformation
                    name={diarista?.nome_completo || ''}
                    rating={diarista?.reputacao || 1}
                    description={
                        'Telefone: ' +
                        TextFormatService.formatPhoneNumber(
                            diarista?.telefone || ''
                        )
                    }
                    picture={diarista?.foto_usuario || ''}
                />

                <Caption style={{ paddingTop: 16, paddingBottom: 16 }}>
                    Ao confirmar a presença do(a) diarista, você está definindo
                    que o serviço foi realizado em sua residência e autoriza a
                    plataforma a fazer o repasse do valor para o profissional.
                    Caso você tenha algum problema, pode entrar em contato com a
                    nossa equipe pelo e-mail sac@e-diaristas.com.br
                </Caption>
            </ScrollView>
        </Dialog>
    );
};

export const SelectionDialog: React.FC<DialogProps> = (props) => {
    const diarista = props.diaria.diarista;
    return (
        <Dialog
            isOpen={true}
            onClose={props.onCancel}
            onConfirm={() => props.onConfirm(props.diaria)}
            subtitle={
                diarista
                    ? 'Selecionamos o(a) seguinte profissional para a sua diária'
                    : 'Detalhes da diária'
            }
            noConfirm
        >
            <ScrollView>
                <JobBox diaria={props.diaria} />

                {diarista ? (
                    <UserInformation
                        name={diarista?.nome_completo || ''}
                        rating={diarista?.reputacao || 1}
                        description={
                            'Telefone: ' +
                            TextFormatService.formatPhoneNumber(
                                diarista?.telefone || ''
                            )
                        }
                        picture={diarista?.foto_usuario || ''}
                    />
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 32 }}>
                        Diarista ainda não selecionado(a)
                    </Text>
                )}
            </ScrollView>
        </Dialog>
    );
};

interface RatingDialogProps extends Omit<DialogProps, 'onConfirm'> {
    onConfirm: (
        diaria: DiariaInterface,
        avaliacao: { descricao: string; nota: number }
    ) => void;
}

export const RatingDialog: React.FC<RatingDialogProps> = (props) => {
    const { user } = useContext(UserContext).userState,
        usuarioAvaliado =
            user.tipo_usuario === UserType.Cliente
                ? props.diaria.diarista
                : props.diaria.cliente,
        [descricao, setDescricao] = useState(''),
        [nota, setNota] = useState(3),
        [erro, setErro] = useState(''),
        { colors } = useTheme();

    function tentarAvaliar() {
        if (descricao.length > 3) {
            props.onConfirm(props.diaria, { descricao, nota });
        } else {
            setErro('Escreva um depoimento');
        }
    }

    return (
        <Dialog
            isOpen={true}
            onClose={props.onCancel}
            onConfirm={tentarAvaliar}
            subtitle={'Avalie a diária abaixo'}
        >
            <ScrollView>
                <JobBox diaria={props.diaria} />

                <UserInformation
                    name={usuarioAvaliado?.nome_completo || ''}
                    rating={usuarioAvaliado?.reputacao || 1}
                    description={
                        'Telefone: ' +
                        TextFormatService.formatPhoneNumber(
                            usuarioAvaliado?.telefone || ''
                        )
                    }
                    picture={usuarioAvaliado?.foto_usuario || ''}
                />

                <Title>Deixe a sua avaliação</Title>

                <Subheading>Nota:</Subheading>
                <Rating
                    startingValue={nota}
                    onFinishRating={setNota}
                    minValue={1}
                    imageSize={30}
                />

                <Subheading style={{ marginTop: 32 }}>Depoimento:</Subheading>
                <TextInput
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Digite aqui seu depoimento"
                    multiline
                    numberOfLines={5}
                />
                <Text style={{ color: colors.error }}>{erro}</Text>
            </ScrollView>
        </Dialog>
    );
};

interface CancelDialogProps extends Omit<DialogProps, 'onConfirm'> {
    onConfirm: (diaria: DiariaInterface, motivo: string) => void;
}

export const CancelDialog: React.FC<CancelDialogProps> = (props) => {
    const { user } = useContext(UserContext).userState,
        [motivo, setMotivo] = useState(''),
        [erro, setErro] = useState('');

    function tentarCancelar() {
        if (motivo.length > 3) {
            props.onConfirm(props.diaria, motivo);
        } else {
            setErro('Digite o motivo do cancelamento');
        }
    }

    function getAviso(): string {
        if (user.id) {
            if (user.tipo_usuario === UserType.Diarista) {
                return 'Ao cancelar uma diária, você pode ser penalizado(a) com a diminuição da sua reputação. Quanto menor a sua reputação, menos chance de ser selecionada para as próximas oportunidades. O cancelamento de diárias deve ser feito somente em situações de exceção.';
            } else {
                const dataAtendimento = new Date(props.diaria.data_atendimento);
                if (DateService.getDifferenceHours(dataAtendimento) < 24) {
                    return 'Ao cancelar a diária, devido a proximidade com horário de agendamento do serviço, o sistema cobrará uma multa de 50% sobre o valor da diária. O cancelamento de diárias deve ser feito somente em situações de exceção.';
                }
                return 'Ao cancelar uma diária, o(a) profissional que já havia agendado um dia na agenda acaba sendo prejudicado(a). O cancelamento de diárias deve ser feito somente em situações de exceção.';
            }
        }
        return '';
    }

    return (
        <Dialog
            isOpen={true}
            onClose={props.onCancel}
            onConfirm={tentarCancelar}
            subtitle={'Tem certeza que deseja cancelar a diária abaixo?'}
        >
            <ScrollView>
                <JobBox diaria={props.diaria} />

                <TextInput
                    value={motivo}
                    onChangeText={setMotivo}
                    placeholder="Digite o motivo do cancelamento"
                    multiline
                    numberOfLines={5}
                    style={{ marginTop: 32 }}
                    error={erro !== ''}
                    helperText={erro}
                />

                <Caption>{getAviso()}</Caption>
            </ScrollView>
        </Dialog>
    );
};
