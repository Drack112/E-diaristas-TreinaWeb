import React from 'react';
import { ServicoInterface } from 'data/@types/ServicoInterface';
import { Controller, useFormContext } from 'react-hook-form';
import { Text, View } from 'react-native';
import {
    AddressForm,
    FormFieldsetTitle,
} from 'ui/components/inputs/UserForm/UserForm';
import ToggleButtonGroup from 'ui/components/inputs/ToggleButtonGroup/ToggleButtonGroup';
import ItemCounter from 'ui/components/inputs/ItemCounter/ItemCounter';
import TextInputMask from 'ui/components/inputs/TextInputMask/TextInputMask';
import TextInput from 'ui/components/inputs/TextInput/TextInput';
import { useTheme } from '@emotion/react';
import Button from 'ui/components/inputs/Button/Button';

interface DetalhesServicoProps {
    servicos?: ServicoInterface[];
    comodos?: number;
    podemosAtender?: boolean;
    onSubmit: () => {};
}

export const houseParts = [
    {
        singular: 'Cozinha',
        plural: 'Cozinhas',
        name: 'quantidade_cozinhas',
    },
    { singular: 'Sala', plural: 'Salas', name: 'quantidade_salas' },
    {
        singular: 'Banheiro',
        plural: 'Banheiros',
        name: 'quantidade_banheiros',
    },
    { singular: 'Quarto', plural: 'Quartos', name: 'quantidade_quartos' },
    {
        singular: 'Quintal',
        plural: 'Quintais',
        name: 'quantidade_quintais',
    },
    { singular: 'Outros', plural: 'Outros', name: 'quantidade_outros' },
];

const DetalhesServico: React.FC<DetalhesServicoProps> = ({
    servicos = [],
    comodos = 0,
    podemosAtender,
    onSubmit,
}) => {
    const {
            control,
            formState: { errors },
        } = useFormContext(),
        { colors } = useTheme();

    return (
        <View>
            <FormFieldsetTitle style={{ marginTop: 0 }}>
                Qual tipo de limpeza você precisa?
            </FormFieldsetTitle>

            <Controller
                name={'faxina.servico'}
                defaultValue={servicos[0].id}
                control={control}
                render={({ field }) => (
                    <ToggleButtonGroup
                        value={field.value}
                        onChange={(value) =>
                            field.onChange(value || servicos[0].id)
                        }
                        items={[...servicos].map((item) => ({
                            label: item.nome,
                            icon: item.icone.replace('twf-', '') as TwIcon,
                            value: item.id,
                        }))}
                    />
                )}
            />

            <FormFieldsetTitle>Qual o tamanho da sua casa?</FormFieldsetTitle>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {houseParts.map((item) => (
                    <Controller
                        key={item.name}
                        name={'faxina.' + item.name}
                        defaultValue={0}
                        control={control}
                        render={({ field }) => (
                            <ItemCounter
                                label={item.singular}
                                plural={item.plural}
                                counter={field.value}
                                onInc={() => field.onChange(field.value + 1)}
                                onDec={() =>
                                    field.onChange(Math.max(0, field.value - 1))
                                }
                            />
                        )}
                    />
                ))}
            </View>

            <FormFieldsetTitle>
                Qual a data você gostaria de receber o(a) diarista?
            </FormFieldsetTitle>
            <Controller
                name={'faxina.data_atendimento'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInputMask
                        keyboardType={'number-pad'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        mask={'99/99/9999'}
                        label={'Data'}
                        error={errors?.faxina?.data_atendimento !== undefined}
                        helperText={errors?.faxina?.data_atendimento?.message}
                    />
                )}
            />
            <Controller
                name={'faxina.hora_inicio'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInputMask
                        keyboardType={'number-pad'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        mask={'99:99'}
                        label={'Hora Início'}
                        error={errors?.faxina?.hora_inicio !== undefined}
                        helperText={errors?.faxina?.hora_inicio?.message}
                    />
                )}
            />
            <Controller
                name={'faxina.hora_termino'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInputMask
                        editable={false}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        mask={'99:99'}
                        label={'Hora Término (campo automático)'}
                        error={errors?.faxina?.hora_termino !== undefined}
                        helperText={errors?.faxina?.hora_termino?.message}
                    />
                )}
            />

            <FormFieldsetTitle>Observações</FormFieldsetTitle>
            <Controller
                name={'faxina.observacoes'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Quer acrescentar algum detalhe?'}
                        multiline
                    />
                )}
            />

            <FormFieldsetTitle>
                Qual endereço onde será realizada a limpeza?
            </FormFieldsetTitle>
            <AddressForm />

            {!podemosAtender && (
                <Text style={{ color: colors.error, marginBottom: 16 }}>
                    Infelizmente ainda não atendemos na sua região
                </Text>
            )}

            <Button
                color={colors.accent}
                mode={'contained'}
                disabled={comodos === 0 || !podemosAtender}
                onPress={onSubmit}
            >
                Ir para identificação
            </Button>
        </View>
    );
};

export default DetalhesServico;
