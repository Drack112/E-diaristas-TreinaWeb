import React, { useState, useMemo } from 'react';
import { View, VirtualizedList } from 'react-native';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';

export interface AutocompleteProps {
    label: string;
    value: string;
    options: string[];
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    noOptionsText?: string;
    onChange: (value: string) => void;
    onSelect?: (value: string) => void;
    clearOnSelect?: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
    disabled = false,
    options = [],
    ...props
}) => {
    const [isOpen, setOpen] = useState(false),
        filteredOptions = useMemo(() => {
            return options.filter((item) =>
                item.toLowerCase().includes(props.value.toLowerCase() || '')
            );
        }, [options, props.value]);

    function selectItem(item: string) {
        props.onChange(props.clearOnSelect ? '' : item);
        props.onSelect && props.onSelect(item);
        setOpen(false);
    }

    return (
        <View>
            <TextInput
                label={props.label}
                value={props.value}
                onFocus={() => setOpen(true)}
                disabled={disabled}
            />

            <Dialog
                isOpen={isOpen}
                onClose={() => setOpen(false)}
                noConfirm
                noCancel
            >
                <TextInput
                    label={props.label}
                    value={props.value}
                    onChangeText={props.onChange}
                    autoFocus
                />

                <VirtualizedList
                    style={{ flex: 1 }}
                    data={filteredOptions}
                    initialNumToRender={10}
                    keyExtractor={(item) => item as string}
                    renderItem={({ item }) => (
                        <Button
                            onPress={() => selectItem(item as string)}
                            fullWidth
                        >
                            {item as string}
                        </Button>
                    )}
                    getItemCount={(data) => data.length}
                    getItem={(data, index) => data[index]}
                />
            </Dialog>
        </View>
    );
};

export default Autocomplete;
