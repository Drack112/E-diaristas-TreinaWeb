import React from 'react';
import { ChipsContainer, ChipStyled } from './ChipField.style';
import { Paragraph } from 'react-native-paper';

export interface ChipFieldProps {
    itemsList: string[];
    emptyMessage?: string;
    onDelete?: (item: string) => void;
}

const ChipField: React.FC<ChipFieldProps> = ({
    itemsList,
    emptyMessage = 'Nada selecionada ainda',
    ...props
}) => {
    function onDelete(item: string) {
        if (props.onDelete) {
            props.onDelete(item);
        }
    }

    return (
        <ChipsContainer>
            {itemsList.length ? (
                itemsList.map((item, index) => (
                    <ChipStyled key={index} onClose={() => onDelete(item)}>
                        {item}
                    </ChipStyled>
                ))
            ) : (
                <Paragraph>{emptyMessage}</Paragraph>
            )}
        </ChipsContainer>
    );
};

export default ChipField;
