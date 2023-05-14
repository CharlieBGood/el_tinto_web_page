import { FlexContainer } from "../../atoms";
import THEME from '../../../utils/styledTheme';
import styled from "styled-components";
import { Typography } from "@mui/material";

const FooterLine = styled.hr`
    background-color: #FFFFFF;
    height: 2px;
    width: 100%;
    opacity: 0.75;
`

const Footer = () => {
    return (
        <FlexContainer width="100%" backgroundColor={THEME.colors.primary} justify="center" style={{marginTop: 'auto'}}>
            <FlexContainer width="90%" direction="column" padding="10px 0" alignItems="center">
                <FooterLine />
                <Typography variant="subtitle2" textAlign='center'>
                    Copyright © El Tinto 2023 Todos los derechos reservados.
                </Typography>
                <Typography variant="subtitle2" textAlign='center' margin='20px 0 0 0'>
                    ¿Tienes alguna sugerencia o quisieras que incluyeramos algo nuevo?
                </Typography>
                <Typography variant="subtitle2" textAlign='center'>
                    Escríbenos a <a href='mailto:info@eltinto.xyz' style={{color: '#FFFFFF'}}>info@eltinto.xyz</a> y te daremos respuesta antes de que se te enfríe el tintico.
                </Typography>
                <FooterLine />
            </FlexContainer>
        </FlexContainer>
    )
} 

export default Footer;