import React from 'react';
import { View } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import TextInput from '../../TextInput/TextInput';

export const NewContactForm: React.FC = () => {
    const {
        formState: { errors },
        control,
    } = useFormContext();

    return (
        <View>
            <Controller
                name={'usuario.email'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        keyboardType={'email-address'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'E-mail'}
                        error={errors?.usuario?.email !== undefined}
                        helperText={errors?.usuario?.email?.message}
                    />
                )}
            />
            <Controller
                name={'usuario.password'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        secureTextEntry
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Senha'}
                        error={errors?.usuario?.password !== undefined}
                        helperText={errors?.usuario?.password?.message}
                    />
                )}
            />
            <Controller
                name={'usuario.password_confirmation'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        secureTextEntry
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Confirmação da senha'}
                        error={
                            errors?.usuario?.password_confirmation !== undefined
                        }
                        helperText={
                            errors?.usuario?.password_confirmation?.message
                        }
                    />
                )}
            />
        </View>
    );
};
