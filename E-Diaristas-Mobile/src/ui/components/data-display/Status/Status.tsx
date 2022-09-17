import { TextColor } from 'data/@types/DiariaInterface';
import React from 'react';
import { StatusStyled } from './Status.style';
import { useTheme } from '@emotion/react';

export interface StatusProps {
    color?: TextColor;
}

const Status: React.FC<StatusProps> = ({ children, color = 'success' }) => {
    const { colors } = useTheme();

    return <StatusStyled bgColor={colors[color]}>{children}</StatusStyled>;
};

export default Status;
