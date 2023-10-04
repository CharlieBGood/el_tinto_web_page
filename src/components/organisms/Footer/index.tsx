import { FlexContainer } from "../../atoms";
import THEME from '../../../utils/styledTheme';
import styled from "styled-components";
import { Link, Typography } from "@mui/material";

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
                    <span style={{fontWeight: "700"}}>Pase y charlemos en La Cafetería</span>, la comunidad de El Tinto, <Link style={{color: "#FFF", textDecoration: "underline"}} href="https://discord.gg/BT5TDrMd8F">aquí</Link>.
                </Typography>
                <Typography variant="subtitle2" textAlign='center'>
                    También puede seguirnos en:
                </Typography>
                <FlexContainer>
                    <Link href="https://twitter.com/ElTinto_" padding="10px">
                        <img 
                            src="/images/utils/white_twitter.png" alt="twitter"
                            style={{maxWidth: "20px"}}
                        />
                    </Link>
                    <Link href="https://twitter.com/ElTinto_" padding="10px">
                        <img 
                            src="/images/utils/white_instagram.png" alt="twitter"
                            style={{maxWidth: "20px"}}
                        />
                    </Link>
                </FlexContainer>
                <Typography variant="subtitle2" textAlign='center' margin='20px 0 0 0'>
                    <span style={{fontWeight: "700"}}>¿Tiene alguna sugerencia?</span> Escríbanos a <a href='mailto:info@eltinto.xyz' style={{color: '#FFFFFF'}}>info@eltinto.xyz</a>.
                </Typography>
                <Typography variant="subtitle2" textAlign='center' marginTop="20px">
                    Copyright © 2023 El Tinto. Todos los derechos reservados.
                </Typography>
                <FooterLine />
            </FlexContainer>
        </FlexContainer>
    )
} 

export default Footer;