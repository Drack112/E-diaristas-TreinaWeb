import { useTheme } from '@emotion/react';
import React from 'react';
import FontIcon from 'ui/components/data-display/FontIcon/FontIcon';
import {
    ToggleButtonGroupStyled,
    ToggleButtonStyled,
    ToggleButtonText,
} from './ToggleButtonGroup.style';

export interface ToggleButtonGroupProps {
    value: any;
    onChange: (value: any) => void;
    items: { label: string; icon: TwIcon; value: any }[];
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
    value,
    onChange,
    items = [],
}) => {
    const { colors } = useTheme();
    return (
        <ToggleButtonGroupStyled>
            {items.map((item) => (
                <ToggleButtonStyled
                    key={item.value}
                    status={item.value === value ? 'checked' : 'unchecked'}
                    onPress={() => onChange(item.value)}
                >
                    <>
                        <FontIcon
                            icon={item.icon}
                            color={
                                item.value === value
                                    ? 'white'
                                    : colors.textSecondary
                            }
                            size={25}
                        />
                        <ToggleButtonText
                            style={{
                                color:
                                    item.value === value
                                        ? 'white'
                                        : colors.textSecondary,
                            }}
                        >
                            {item.label}
                        </ToggleButtonText>
                    </>
                </ToggleButtonStyled>
            ))}
        </ToggleButtonGroupStyled>
    );
};

export default ToggleButtonGroup;
