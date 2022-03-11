import { Paper } from "@mui/material"
import { styled } from "@mui/material/styles"
import theme from "ui/themes/theme"

export const FormElementsContainer = styled("div")`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${({ theme }) => theme.spacing(5)};
	max-width: 650px;
	margin: 0 auto ${({ theme }) => theme.spacing(7)};
`

export const ProfissionaisPaper = styled(Paper)`
	//background-color: red;
	padding: ${({ theme }) => theme.spacing(7)};
	margin: 0 ${({ theme }) => theme.spacing(10)};

	${({ theme }) => theme.breakpoints.down("md")} {
		&.MuiPaper-root {
			padding: 0;
			box-shadow: none;
		}
	}
`

export const ProfissionaisContainer = styled("div")`
	display: grid;
	grid-template-columns: 1fr;

	${({ theme }) => theme.breakpoints.up("md")} {
		grid-template-columns: repeat(2, 3fr);
		gap: ${({ theme }) => theme.spacing(6)};
	}

	${({ theme }) => theme.breakpoints.down("md")} {
		margin-left: ${({ theme }) => theme.spacing(-2)};
		margin-right: ${({ theme }) => theme.spacing(-2)};
		// odd --> impar
		> :nth-of-type(odd) {
			background-color: ${({ theme }) => theme.palette.background.paper};
		}
	}
`
