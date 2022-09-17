import React, { useContext } from 'react';
import { View } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { UserContext } from 'data/contexts/UserContext';
import TextInput from '../../TextInput/TextInput';

export const FinancialForm: React.FC = () => {
    const { control } = useFormContext(),
        { user } = useContext(UserContext).userState;

    return (
        <View>
            <Controller
                name={'usuario.chave_pix'}
                defaultValue={user.chave_pix}
                control={control}
                render={({ field }) => (
                    <TextInput
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        label={'Chave Pix'}
                    />
                )}
            />
        </View>
    );
};
