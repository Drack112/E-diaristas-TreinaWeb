import React from 'react';
import { Text, View, Linking } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import TextInput from '../../TextInput/TextInput';
import { useTheme } from '@emotion/react';

export const LoginForm: React.FC = () => {
    const {
            control,
            formState: { errors },
        } = useFormContext(),
        { colors } = useTheme();

    return (
        <View>
            <Controller
                name={'login.email'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        keyboardType="email-address"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'E-mail'}
                        error={errors?.login?.email !== undefined}
                        helperText={errors?.login?.email?.message}
                    />
                )}
            />

            <Controller
                name={'login.password'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        secureTextEntry
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Senha'}
                        error={errors?.login?.password !== undefined}
                        helperText={errors?.login?.password?.message}
                    />
                )}
            />

            <Text
                onPress={() =>
                    Linking.openURL(
                        process.env['NEXT_PUBLIC_PASSWORD_RECOVERY'] as string
                    )
                }
                style={{
                    textAlign: 'right',
                    textDecorationLine: 'underline',
                    color: colors.textSecondary,
                }}
            >
                Esqueci minha senha
            </Text>
        </View>
    );
};
