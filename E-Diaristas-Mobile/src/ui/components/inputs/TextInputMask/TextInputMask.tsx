import React from 'react';
import { TextInputMask as InputMask } from 'react-native-masked-text';
import TextInput, { TextInputProps } from '../TextInput/TextInput';

export type TextInputMaskProps = TextInputProps & {
    mask: string;
};

const TextInputMask: React.FC<TextInputMaskProps> = ({
    mask,
    value,
    onChangeText,
    ...props
}) => {
    return (
        <InputMask
            type={'custom'}
            value={value}
            onChangeText={onChangeText}
            options={{ mask }}
            customTextInput={TextInput}
            customTextInputProps={{
                ...props,
            }}
        />
    );
};

export default TextInputMask;
