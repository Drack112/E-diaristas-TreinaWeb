import React, { useContext } from 'react';
import { View } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { UserContext } from 'data/contexts/UserContext';
import TextInput from '../../TextInput/TextInput';
import TextInputMask from '../../TextInputMask/TextInputMask';
import { TextFormatService } from 'data/services/TextFormatService';

export interface UserDataFormProps {
    cadastro?: boolean;
}

export const UserDataForm: React.FC<UserDataFormProps> = ({
    cadastro = false,
}) => {
    const {
            formState: { errors },
            control,
        } = useFormContext(),
        { user } = useContext(UserContext).userState;

    return (
        <View>
            <Controller
                name={'usuario.nome_completo'}
                defaultValue={user.nome_completo}
                control={control}
                render={({ field }) => (
                    <TextInput
                        label={'Nome completo'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors?.usuario?.nome_completo !== undefined}
                        helperText={errors?.usuario?.nome_completo?.message}
                    />
                )}
            />
            <Controller
                name={'usuario.nascimento'}
                defaultValue={TextFormatService.reverseDate(
                    user.nascimento as string
                )}
                control={control}
                render={({ field }) => (
                    <TextInputMask
                        label={'Data de nascimento'}
                        mask={'99/99/9999'}
                        keyboardType={'number-pad'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors?.usuario?.nascimento !== undefined}
                        helperText={errors?.usuario?.nascimento?.message}
                    />
                )}
            />
            <Controller
                name={'usuario.cpf'}
                defaultValue={user.cpf}
                control={control}
                render={({ field }) => (
                    <TextInputMask
                        label={'CPF'}
                        mask={'999.999.999-99'}
                        keyboardType={'number-pad'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors?.usuario?.cpf !== undefined}
                        helperText={errors?.usuario?.cpf?.message}
                        disabled={!cadastro}
                    />
                )}
            />
            <Controller
                name={'usuario.telefone'}
                defaultValue={user.telefone}
                control={control}
                render={({ field }) => (
                    <TextInputMask
                        label={'Telefone'}
                        mask={'(99) 99999-9999'}
                        keyboardType={'number-pad'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors?.usuario?.telefone !== undefined}
                        helperText={errors?.usuario?.telefone?.message}
                    />
                )}
            />
        </View>
    );
};
