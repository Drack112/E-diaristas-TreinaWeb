import React from "react"
import { SafeEnviromentContainer } from "./SafeEnviroment.style"
import { Container } from "@mui/material"

const SafeEnviroment = () => {
	return (
		// i --> icone
		<>
			<SafeEnviromentContainer>
				<Container>
					Ambien te Seguro <i className={"twf-lock"} />
				</Container>
			</SafeEnviromentContainer>
		</>
	)
}

export default SafeEnviroment
