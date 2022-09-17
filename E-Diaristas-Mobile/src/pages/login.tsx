import { useTheme } from '@emotion/react';
import useLogin from 'data/hooks/pages/useLogin.page';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Paragraph } from 'react-native-paper';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Button from 'ui/components/inputs/Button/Button';
import {
    LoginForm,
    UserFormContainer,
} from 'ui/components/inputs/UserForm/UserForm';

const Login = () => {
    const { colors } = useTheme(),
        { formMethods, externalServicesState, errorMessage, onSubmit } =
            useLogin();

    return (
        <UserFormContainer>
            <FormProvider {...formMethods}>
                <PageTitle title={'Informe seus dados de e-mail e senha'} />

                <LoginForm />

                <Paragraph
                    style={{
                        color: colors.error,
                        textAlign: 'center',
                        marginTop: 40,
                    }}
                >
                    {errorMessage}
                </Paragraph>

                <Button
                    color={colors.accent}
                    mode={'contained'}
                    fullWidth
                    onPress={formMethods.handleSubmit(onSubmit)}
                    style={{
                        marginTop: 32,
                        marginBottom: 24,
                    }}
                    disabled={
                        externalServicesState?.externalServices?.length === 0
                    }
                >
                    Entrar
                </Button>
            </FormProvider>
        </UserFormContainer>
    );
};

export default Login;
