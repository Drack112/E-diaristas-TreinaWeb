import { styled } from "@mui/material/styles"

export const PageTitleContainer = styled("div")`
	margin: ${({ theme }) => theme.spacing(5) + " 0"};
	text-align: center;
`

export const PageTitleStyled = styled("h2")`
	margin: 0;
	color: ${({ theme }) => theme.palette.primary.main};
	font-weight: 600px;

	${({ theme }) => theme.breakpoints.down("md")} {
		font-size: ${({ theme }) => theme.typography.h6.fontSize};
	}
`
export const PageSubTitleStyled = styled("h3")`
	margin: ${({ theme }) => theme.spacing(1.5) + " 0"};
	color: ${({ theme }) => theme.palette.text.primary};
	font-size: ${({ theme }) => theme.typography.body1.fontSize};
	font-weight: normal;

	${({ theme }) => theme.breakpoints.down("md")} {
		font-size: ${({ theme }) => theme.typography.body2.fontSize};
	}
`
