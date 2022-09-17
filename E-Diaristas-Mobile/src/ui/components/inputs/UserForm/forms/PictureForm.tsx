import React from 'react';
import { View } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import FileField from '../../FileField/FileField';

export const PictureForm: React.FC = () => {
    const { control } = useFormContext();
    return (
        <View>
            <Controller
                name={'usuario.foto_documento'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <FileField onChange={(file) => field.onChange(file)} />
                )}
            />
        </View>
    );
};
