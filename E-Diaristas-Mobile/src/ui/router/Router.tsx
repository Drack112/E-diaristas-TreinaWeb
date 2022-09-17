import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import Logo from '@assets/img/logos/e-diaristas-logo.png';
import { NavigationTheme } from 'ui/themes/app-theme';
import FontIcon from 'ui/components/data-display/FontIcon/FontIcon';
import Index from 'pages';
import EncontrarDiarista from 'pages/encontrar-diarista';
import Diarista from 'pages/cadastro/diarista';
import AlterarDados from 'pages/alterar-dados';
import Diarias from 'pages/diarias';
import Login from 'pages/login';
import Oportunidades from 'pages/oportunidades';
import Pagamentos from 'pages/pagamentos';
import CadastroCliente from '@partials/encontrar-diarista/_cadastro-cliente';
import { UserContext } from 'data/contexts/UserContext';
import { ForceUserState, UserType } from 'data/@types/UserInterface';
import { useTheme } from '@emotion/react';
import { ActivityIndicator } from 'react-native-paper';

export type RootStackParamList = {
    Index: undefined;
    CadastroDiarista: undefined;
    Login: undefined;
    EncontrarDiarista: undefined;
};
export type RootTabParamList = {
    Diarias: undefined;
    AlterarDados: undefined;
    Oportunidades: undefined;
    Pagamentos: undefined;
    EncontrarDiarista: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const screenOptions = {
    headerTitleAlign: 'center',
    headerTitle: () => (
        <Image
            style={{
                width: 150,
                height: 50,
                resizeMode: 'contain',
            }}
            source={Logo}
        />
    ),
};

function getIcon(
    iconName: TwIcon
): (props: { color: string; size: number }) => JSX.Element {
    return ({ color, size }) => (
        <FontIcon icon={iconName} color={color} size={size} />
    );
}

const PrivateRoute = () => {
    const { user } = useContext(UserContext).userState,
        { colors } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={
                {
                    ...screenOptions,
                    tabBarInactiveTintColor: colors.grey['300'],
                    tabBarInactiveBackgroundColor: colors.primary,
                    tabBarActiveTintColor: colors.grey['50'],
                    tabBarActiveBackgroundColor: colors.primary,
                    tabBarItemStyle: {
                        paddingTop: 4,
                        paddingBottom: 4,
                    },
                    tabBarHideOnKeyboard: true,
                } as BottomTabNavigationOptions
            }
        >
            {user.tipo_usuario === UserType.Diarista && (
                <Tab.Screen
                    name="Oportunidades"
                    component={Oportunidades}
                    options={{
                        tabBarIcon: getIcon('search'),
                    }}
                />
            )}
            <Tab.Screen
                name="Diarias"
                component={Diarias}
                options={{
                    title: 'Diárias',
                    tabBarIcon: getIcon('check-circle'),
                }}
            />
            {user.tipo_usuario === UserType.Diarista ? (
                <Tab.Screen
                    name="Pagamentos"
                    component={Pagamentos}
                    options={{
                        tabBarIcon: getIcon('credit-card'),
                    }}
                />
            ) : (
                <Tab.Screen
                    name="EncontrarDiarista"
                    component={EncontrarDiarista}
                    options={{
                        title: 'Encontrar Diaristas',
                        tabBarIcon: getIcon('search'),
                    }}
                />
            )}
            <Tab.Screen
                name="AlterarDados"
                component={AlterarDados}
                options={{
                    title: 'Alterar Dados',
                    tabBarIcon: getIcon('woman'),
                }}
            />
        </Tab.Navigator>
    );
};

const PublicRoute = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptions as StackNavigationOptions}
        >
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen
                name="EncontrarDiarista"
                component={EncontrarDiarista}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CadastroDiarista" component={Diarista} />
        </Stack.Navigator>
    );
};

const Router: React.FC = () => {
    const { userState } = useContext(UserContext),
        { forceUserState } = userState,
        logado = userState.user.nome_completo.length > 0,
        logando = userState.isLogging;

    if (logando && forceUserState === ForceUserState.none) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <NavigationContainer theme={NavigationTheme}>
            {(!logado || forceUserState === ForceUserState.unauthenticated) && (
                <PublicRoute />
            )}

            {logado && forceUserState === ForceUserState.none && (
                <PrivateRoute />
            )}
        </NavigationContainer>
    );
};

export default Router;
