import React from 'react';
import { View } from 'react-native';
import { TextInputStyled, HelperTextStyled } from './TextInput.style';



export type TextInputProps = Omit<
    React.ComponentProps<typeof TextInputStyled>,
    'autoComplete'
> & {
    helperText?: string;
    autoComplete?: string;
};

const TextInput: React.FC<TextInputProps> = ({ helperText, autoComplete = '', ...props }) => {
    return (
        <View>
            <TextInputStyled autoComplete={autoComplete} {...props} />
            {/* @ts-ignore */}
            {helperText ? (<HelperTextStyled type="error">{helperText}</HelperTextStyled>) : null}
        </View>
    );
};

const TextInputRef = React.forwardRef((props: TextInputProps, ref: any) => (
    <View ref={ref} >
        <TextInput {...props} />
    </View>
))

export default TextInputRef;