import { useTheme } from '@emotion/react';
import { JobBox } from '@partials/diarias/_minhas-diarias-dialogs';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import useOportunidadesTrabalho from 'data/hooks/pages/useOportunidades.page';
import { TextFormatService } from 'data/services/TextFormatService';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Caption, Paragraph } from 'react-native-paper';
import DataList from 'ui/components/data-display/DataList/DataList';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import Button from 'ui/components/inputs/Button/Button';

const Oportunidades = () => {
    const { colors } = useTheme(),
        {
            oportunidadeSelecionada,
            setOportunidadeSelecionada,
            oportunidades,
            totalComodos,
            seCandidatar,
            podeCandidatar,
        } = useOportunidadesTrabalho();

    return (
        <ScrollView>
            <PageTitle title={'Oportunidades de trabalho'} />

            {oportunidades.length > 0 ? (
                <>
                    {oportunidades.map((item) => (
                        <DataList
                            key={item.id}
                            header={
                                <View>
                                    <Text>
                                        Data:{' '}
                                        {TextFormatService.reverseDate(
                                            item.data_atendimento as string
                                        )}
                                    </Text>
                                    <Text>{item.nome_servico}</Text>
                                    <Text>
                                        {TextFormatService.currency(item.preco)}
                                    </Text>
                                </View>
                            }
                            body={
                                <>
                                    <Text style={{ color: 'white' }}>
                                        Cidade: {item.cidade}
                                    </Text>
                                    <Text style={{ color: 'white' }}>
                                        Número de cômodos: {totalComodos(item)}
                                    </Text>
                                </>
                            }
                            actions={
                                <>
                                    {podeCandidatar(item) && (
                                        <Button
                                            mode={'contained'}
                                            color={colors.secondary}
                                            onPress={() =>
                                                setOportunidadeSelecionada(item)
                                            }
                                        >
                                            Se candidatar
                                        </Button>
                                    )}
                                </>
                            }
                        />
                    ))}
                </>
            ) : (
                <Paragraph style={{ paddingTop: 80, textAlign: 'center' }}>
                    Nenhuma oportunidade ainda
                </Paragraph>
            )}

            {oportunidadeSelecionada !== undefined && (
                <Dialog
                    isOpen={true}
                    onClose={() => setOportunidadeSelecionada(undefined)}
                    subtitle="Tem certeza que deseja se candidatar à diária abaixo?"
                    onConfirm={() =>
                        oportunidadeSelecionada &&
                        seCandidatar(oportunidadeSelecionada)
                    }
                >
                    <ScrollView>
                        <JobBox
                            diaria={oportunidadeSelecionada as DiariaInterface}
                        />

                        <UserInformation
                            name={
                                oportunidadeSelecionada?.cliente
                                    .nome_completo || ''
                            }
                            rating={
                                oportunidadeSelecionada?.cliente.reputacao || 0
                            }
                            picture={
                                oportunidadeSelecionada?.cliente.foto_usuario ||
                                ''
                            }
                        />

                        {oportunidadeSelecionada !== undefined &&
                            oportunidadeSelecionada?.avaliacoes_cliente.length >
                                0 && (
                                <DataList
                                    header={
                                        <Text>
                                            Últimas avaliações do cliente:
                                        </Text>
                                    }
                                    body={
                                        <>
                                            {oportunidadeSelecionada?.avaliacoes_cliente.map(
                                                (item, index) => (
                                                    <UserInformation
                                                        key={index}
                                                        name={
                                                            item.nome_avaliador
                                                        }
                                                        picture={
                                                            item.foto_avaliador
                                                        }
                                                        rating={item.nota}
                                                        description={
                                                            item.descricao
                                                        }
                                                    />
                                                )
                                            )}
                                        </>
                                    }
                                />
                            )}
                        <Caption style={{ paddingTop: 16, paddingBottom: 16 }}>
                            Ao se candidatar você ainda não é o(a) diarista
                            escolhido(a) para realizar o trabalho. Vamos
                            analisar suas qualificações e a distância para o
                            local da diária. Caso você seja a pessoa
                            selecionada, receberá um email avisando. Atente-se à
                            sua caixa de entrada!
                        </Caption>
                    </ScrollView>
                </Dialog>
            )}
        </ScrollView>
    );
};

export default Oportunidades;
