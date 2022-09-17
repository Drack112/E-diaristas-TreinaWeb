import React from 'react';
import { DiariaProvider } from 'data/contexts/DiariasContext';
import MinhasDiarias from '@partials/diarias/_minhas-diarias';

const Diarias = () => {
    return (
        <DiariaProvider>
            <MinhasDiarias />
        </DiariaProvider>
    );
};

export default Diarias;
