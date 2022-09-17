import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Controller } from 'react-hook-form';
import useAddressForm from 'data/hooks/components/inputs/UserForm/forms/useAddressForm';
import { UserType } from 'data/@types/UserInterface';
import TextInputMask from '../../TextInputMask/TextInputMask';
import TextInput from '../../TextInput/TextInput';
import Autocomplete from '../../Autocomplete/Autocomplete';

export const AddressForm: React.FC = () => {
    const {
        user,
        userAddress,
        control,
        errors,
        estados,
        opcoesCidades,
        addressState,
    } = useAddressForm();

    if (
        user.nome_completo &&
        user.tipo_usuario === UserType.Diarista &&
        !userAddress.estado
    ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <View>
            <Controller
                name={'endereco.cep'}
                defaultValue={userAddress.cep}
                control={control}
                render={({ field }) => (
                    <TextInputMask
                        keyboardType={'number-pad'}
                        value={field.value}
                        mask={'99.999-999'}
                        onChangeText={(value) => field.onChange(value)}
                        label={'CEP'}
                        error={errors?.endereco?.cep !== undefined}
                        helperText={errors?.endereco?.cep?.message}
                    />
                )}
            />

            <Controller
                name={'endereco.estado'}
                defaultValue={userAddress.estado}
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        value={field.value}
                        options={estados.map((item) => item.sigla)}
                        onChange={field.onChange}
                        label={'Estado'}
                        loading={estados.length === 0}
                        loadingText={'Carregando estados...'}
                        noOptionsText={'Nenhum estado com esse nome'}
                    />
                )}
            />

            <Controller
                name={'endereco.cidade'}
                defaultValue={userAddress.cidade}
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        value={field.value}
                        options={opcoesCidades}
                        onChange={field.onChange}
                        label={'Cidade'}
                        disabled={
                            addressState === '' || opcoesCidades.length === 0
                        }
                        loading={opcoesCidades.length === 0}
                        loadingText={'Carregando cidades...'}
                        noOptionsText={'Nenhuma cidade com esse nome'}
                    />
                )}
            />

            <Controller
                name={'endereco.bairro'}
                defaultValue={userAddress.bairro}
                control={control}
                render={({ field }) => (
                    <TextInput
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Bairro'}
                        error={errors?.endereco?.bairro !== undefined}
                        helperText={errors?.endereco?.bairro?.message}
                    />
                )}
            />

            <Controller
                name={'endereco.logradouro'}
                defaultValue={userAddress.logradouro}
                control={control}
                render={({ field }) => (
                    <TextInput
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Logradouro'}
                        error={errors?.endereco?.logradouro !== undefined}
                        helperText={errors?.endereco?.logradouro?.message}
                    />
                )}
            />

            <Controller
                name={'endereco.numero'}
                defaultValue={userAddress.numero}
                control={control}
                render={({ field }) => (
                    <TextInput
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Número'}
                        error={errors?.endereco?.numero !== undefined}
                        helperText={errors?.endereco?.numero?.message}
                    />
                )}
            />

            <Controller
                name={'endereco.complemento'}
                defaultValue={userAddress.complemento}
                control={control}
                render={({ field }) => (
                    <TextInput
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Complemento'}
                        error={errors?.endereco?.complemento !== undefined}
                        helperText={errors?.endereco?.complemento?.message}
                    />
                )}
            />
        </View>
    );
};
