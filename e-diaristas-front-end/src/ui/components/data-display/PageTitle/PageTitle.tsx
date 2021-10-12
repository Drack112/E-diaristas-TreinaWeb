import React from "react"

import {
	PageSubTitleStyled,
	PageTitleContainer,
	PageTitleStyled,
} from "./PageTitle.style"

interface PageTitleProps {
	title: string
	// String ou elemento JSX
	subtitle?: string | JSX.Element
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
	return (
		<PageTitleContainer>
			<PageTitleStyled>{props.title}</PageTitleStyled>
			<PageSubTitleStyled>{props.subtitle}</PageSubTitleStyled>
		</PageTitleContainer>
	)
}

export default PageTitle
