import ContentContainer from "../../atoms/ContentContainer";
import { FlexContainer } from "../../atoms";
import styled from "styled-components";
import { Typography } from "@mui/material";
import THEME from '../../../utils/styledTheme';
import FormsTextContainer from "../../atoms/FormsTextContainer";
import { useSearchParams } from "react-router-dom";
import UnsuscribeForm from "../../molecules/UnsuscribeForm";


const SubtitleFormTypography = styled(Typography)`
    width: 80%;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`

const Unsuscribe = () => {

    const [searchParams] = useSearchParams();

    return(
        <ContentContainer>
            <FlexContainer 
                backgroundColor={THEME.colors.primary}
                borderRadius="12px"
                width="100%"
                direction="column"
                padding="1%"
            >
                <FormsTextContainer>
                    <SubtitleFormTypography variant="body2" style={{margin: '0 auto'}}>
                        Hola {searchParams.get('user_name')},
                        <br></br>
                        <br></br>
                        Vemos que este Tinto se enfrió o nos pasamos de amargos 😔.
                        Estamos muy tristes de verte partir y esperamos mejorar para que un futuro podamos acompañarte nuevamente todas las mañanas más calienticos, más cargaditos y con mejor sabor.
                    </SubtitleFormTypography>
                </FormsTextContainer>
                <UnsuscribeForm />
            </FlexContainer>
        </ContentContainer>
    )
}

export default Unsuscribe;