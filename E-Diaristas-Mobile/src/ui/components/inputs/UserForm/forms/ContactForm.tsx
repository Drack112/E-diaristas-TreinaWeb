import React, { useContext } from 'react';
import { View } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import TextInput from '../../TextInput/TextInput';
import { UserContext } from 'data/contexts/UserContext';

export const ContactForm: React.FC = () => {
    const {
            formState: { errors },
            control,
        } = useFormContext(),
        { user } = useContext(UserContext).userState;

    return (
        <View>
            <Controller
                name={'usuario.email'}
                defaultValue={user.email}
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
                        label={'Senha antiga'}
                        error={errors?.usuario?.password !== undefined}
                        helperText={errors?.usuario?.password?.message}
                    />
                )}
            />
            <Controller
                name={'usuario.new_password'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        secureTextEntry
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Nova senha'}
                        error={errors?.usuario?.new_password !== undefined}
                        helperText={errors?.usuario?.new_password?.message}
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
                        label={'Nova senha confirmação'}
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
