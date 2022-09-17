import React from 'react';
import { Avatar } from 'react-native-paper';
import {
    UserInformationContainer,
    InformationContainer,
    UserName,
    UserDescription,
    RatingStyled,
} from './UserInformation.style';

export interface UserInformationProps {
    picture: string;
    name: string;
    rating: number;
    description?: string;
    darker?: boolean;
}

const UserInformation: React.FC<UserInformationProps> = ({
    picture,
    name,
    rating,
    description,
    darker,
}) => {
    return (
        <UserInformationContainer darker={Boolean(darker)}>
            {picture ? (
                <Avatar.Image size={50} source={{ uri: picture }} />
            ) : (
                <Avatar.Text size={50} label={name[0]} />
            )}
            <InformationContainer>
                <UserName>{name}</UserName>
                <RatingStyled defaultRating={rating} />
                <UserDescription>{description}</UserDescription>
            </InformationContainer>
        </UserInformationContainer>
    );
};

export default UserInformation;
