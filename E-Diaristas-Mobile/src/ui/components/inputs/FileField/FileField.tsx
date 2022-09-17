import { useTheme } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { Avatar } from 'react-native-paper';
import Button from '../Button/Button';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { FileFieldFile } from 'data/@types/FileInterface';

export interface FileFieldProps {
    defaultValue?: string;
    onChange: (file: FileFieldFile) => void;
}

const FileField: React.FC<FileFieldProps> = ({ defaultValue, onChange }) => {
    const [filePath, setFilePath] = useState(''),
        { colors } = useTheme();

    useEffect(() => {
        requestPermission();
    }, []);

    useEffect(() => {
        if (defaultValue && !filePath) {
            setFilePath(defaultValue);
        }
    }, [defaultValue]);

    async function requestPermission(): Promise<boolean> {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        return status === 'granted';
    }

    function handleFileChange(image: ImageInfo) {
        setFilePath(image.uri);
        const file = {
            type: 'image/png',
            uri: Platform.OS === 'android' ? image.uri : 'file://' + image.uri,
            name: 'picture.png',
        };
        onChange(file);
    }

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.cancelled) {
            handleFileChange(result);
        }
    }

    return (
        <View style={{ alignItems: 'center' }}>
            {filePath ? (
                <Avatar.Image size={120} source={{ uri: filePath }} />
            ) : (
                <Avatar.Text size={120} label={'?'} />
            )}
            <Button
                onPress={pickImage}
                mode={'contained'}
                color={colors.accent}
                style={{ marginTop: 16 }}
            >
                Escolher arquivo
            </Button>
        </View>
    );
};

export default FileField;
