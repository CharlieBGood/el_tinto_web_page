import { Typography, styled } from "@mui/material";
import { FlexContainer } from "../../atoms";
import FormsTextContainer from "../../atoms/FormsTextContainer";
import THEME from '../../../utils/styledTheme';
import { useSearchParams } from "react-router-dom";
import ContentContainer from "../../atoms/ContentContainer";


const SubtitleFormTypography = styled(Typography)`
    width: 80%;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`

const ChangeDaysConfirm = () => {

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
                <FormsTextContainer style={{paddingBottom: '6%'}}>
                    <SubtitleFormTypography variant="body2" style={{margin: '0 auto'}}>
                        Hola {searchParams.get('user_name')},
                        <br></br>
                        <br></br>
                        ¡Acabas de personalizar los días en los que quieres recibir tu Tinto! ✅
                        <br></br>
                        <br></br>
                        Recuerda que puedes cambiar la frecuencia siempre que quieras siguiendo el link en nuestro correo 😁
                    </SubtitleFormTypography>
                </FormsTextContainer>
            </FlexContainer>
        </ContentContainer>
    )
}

export default ChangeDaysConfirm;