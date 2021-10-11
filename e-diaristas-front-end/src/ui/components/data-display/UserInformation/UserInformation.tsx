import React from "react"
import {
	UserInformationContainer,
	AvatarStyled,
	RatingStyled,
	UserDescription,
	UserName,
} from "./UserInformation.style"

interface UserInformationProps {
	picture: string
	name: string
	rating: number
	description?: string
}

const UserInformation: React.FC<UserInformationProps> = ({
	name,
	picture,
	rating,
	description,
}) => {
	return (
		<UserInformationContainer>
			<AvatarStyled src={picture} />
			<UserName>{name}</UserName>
			<RatingStyled readOnly value={rating} />
			<UserDescription>{description}</UserDescription>
		</UserInformationContainer>
	)
}

export default UserInformation
