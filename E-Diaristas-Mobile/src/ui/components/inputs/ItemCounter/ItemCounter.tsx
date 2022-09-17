import { useTheme } from '@emotion/react';
import React from 'react';
import FontIcon from 'ui/components/data-display/FontIcon/FontIcon';

import {
    ItemCounterContainer,
    CircleButton,
    TextContainer,
} from './ItemCounter.style';

export interface ItemCounterProps {
    label: string;
    plural: string;
    counter: number;
    onInc: () => void;
    onDec: () => void;
}

const ItemCounter: React.FC<ItemCounterProps> = ({
    label,
    plural,
    counter,
    onInc,
    onDec,
}) => {
    const { colors } = useTheme();

    return (
        <ItemCounterContainer>
            <CircleButton
                icon={() => <FontIcon color={colors.accent} icon={'minus'} />}
                onPress={onDec}
            />
            <TextContainer>
                {counter} {counter > 1 ? plural : label}
            </TextContainer>
            <CircleButton
                icon={() => <FontIcon color={colors.accent} icon={'plus'} />}
                onPress={onInc}
            />
        </ItemCounterContainer>
    );
};

export default ItemCounter;
