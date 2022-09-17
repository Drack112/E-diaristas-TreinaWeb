import useCitiesForm from 'data/hooks/components/inputs/UserForm/forms/useCitiesForm';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import ChipField from 'ui/components/data-display/ChipField/ChipField';
import Autocomplete from '../../Autocomplete/Autocomplete';

interface CitiesFormProps {
    estado: string;
}

export const CitiesForm: React.FC<CitiesFormProps> = ({ estado }) => {
    const [city, setCity] = useState(''),
        { options, handleNewCity, citiesList, citiesName, handleDelete } =
            useCitiesForm(estado);

    return (
        <View>
            <Autocomplete
                value={city}
                onChange={setCity}
                clearOnSelect
                onSelect={handleNewCity}
                options={options.map((item) => item.cidade)}
                label={'Busque pelo nome da cidade'}
                loading={citiesList.length === 0}
                loadingText={'Carregando cidades...'}
                noOptionsText={'Nenhuma cidade com esse nome'}
            />

            <Text style={{ marginTop: 0, marginBottom: -8 }}>
                Cidades selecionadas
            </Text>

            <ChipField
                itemsList={citiesName}
                onDelete={handleDelete}
                emptyMessage={'Nenhuma cidade selecionada ainda'}
            />
        </View>
    );
};
