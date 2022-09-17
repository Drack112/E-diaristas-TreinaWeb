import React from 'react';
import { List } from 'react-native-paper';

import {
    AccordionStyled,
    AccordionDetails,
    AccordionActions,
} from './DataList.style';

export interface DataListProps {
    header?: React.ReactNode;
    body?: React.ReactNode;
    actions?: React.ReactNode;
}

const DataList: React.FC<DataListProps> = ({ header, body, actions }) => {
    return (
        <List.Section>
            <AccordionStyled title={header}>
                <AccordionDetails>
                    {body}
                    {actions && <AccordionActions>{actions}</AccordionActions>}
                </AccordionDetails>
            </AccordionStyled>
        </List.Section>
    );
};

export default DataList;
