import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import TextInputMask from '../../TextInputMask/TextInputMask';
import TextInput from '../../TextInput/TextInput';
import { Paragraph } from 'react-native-paper';
import { useTheme } from '@emotion/react';

export const PaymentForm: React.FC = () => {
    const {
            register,
            formState: { errors },
            control,
        } = useFormContext(),
        { colors } = useTheme();

    useEffect(() => {
        register('pagamento_recusado');
    }, []);

    return (
        <View>
            <Controller
                name={'pagamento.numero_cartao'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInputMask
                        keyboardType={'number-pad'}
                        value={field.value}
                        mask={'9999 9999 9999 9999'}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Número do cartão'}
                        error={errors?.pagamento?.numero_cartao !== undefined}
                        helperText={errors?.pagamento?.numero_cartao?.message}
                    />
                )}
            />

            <Controller
                name={'pagamento.nome_cartao'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Nome impresso no cartão'}
                        error={errors?.pagamento?.nome_cartao !== undefined}
                        helperText={errors?.pagamento?.nome_cartao?.message}
                    />
                )}
            />

            <Controller
                name={'pagamento.validade'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInputMask
                        keyboardType={'number-pad'}
                        value={field.value}
                        mask={'99/99'}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Validade'}
                        error={errors?.pagamento?.validade !== undefined}
                        helperText={errors?.pagamento?.validade?.message}
                    />
                )}
            />

            <Controller
                name={'pagamento.codigo'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInputMask
                        keyboardType={'number-pad'}
                        value={field.value}
                        mask={'9999'}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Código validação'}
                        error={errors?.pagamento?.codigo !== undefined}
                        helperText={errors?.pagamento?.codigo?.message}
                    />
                )}
            />

            {errors?.pagamento_recusado !== undefined && (
                <Paragraph
                    style={{
                        textAlign: 'center',
                        color: colors.error,
                    }}
                >
                    {errors?.pagamento_recusado?.message}
                </Paragraph>
            )}
        </View>
    );
};
