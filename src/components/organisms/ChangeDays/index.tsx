import { useSearchParams } from "react-router-dom";
import ContentContainer from "../../atoms/ContentContainer";
import { FlexContainer } from "../../atoms";
import THEME from '../../../utils/styledTheme';
import { Typography, styled } from "@mui/material";
import FormsTextContainer from "../../atoms/FormsTextContainer";
import ChangeDaysForm from "../../molecules/ChangeDaysForm";
import { useState } from "react";


const SubtitleFormTypography = styled(Typography)`
    width: 80%;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`


const ChangeDays = () => {

    const [searchParams] = useSearchParams();
    const [pageState, setPageState] = useState<number>(1);

    const ChangeDaysInputForm = () => {
        return(
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
                        Antes de irte, personaliza la frecuencia con la que te informas de las historias más importantes.
                        <br></br>
                        <br></br>
                        Recibe El Tinto <span style={{color: "#FFF", fontWeight: "700"}}>los días que tú prefieras</span>. Acá entre nos, yo no dejaría ir los Tinticos domingueros 😉
                    </SubtitleFormTypography>
                </FormsTextContainer>
                <ChangeDaysForm setPageState={setPageState}/>
            </FlexContainer>
        )
    }

    const ConfirmChangeDays = () => {
        return(
            <FlexContainer width="100%" direction="column" alignItems="center">
                <img 
                    src="https://el-tinto-utils.s3.amazonaws.com/email_icon.jpeg" 
                    alt="email"
                    style={{width: '30%', display: 'block', margin: 'o auto'}}
                />
                <Typography variant="h2" textAlign="center">
                    {searchParams.get('user_name')}, ¡revisa tu correo!
                </Typography>
                <Typography variant="body1" textAlign="center" style={{marginTop: '10px'}}>
                    Pronto recibirás un correo de confirmación para asegurarnos de que seas solamente tú quien define qué tan seguido nos tomas.
                </Typography>
            </FlexContainer>
        )
    }

    return(
        <ContentContainer>
            {
                pageState === 1 ? (
                    <ChangeDaysInputForm />
                ) : (
                    <ConfirmChangeDays />
                )
            }
        </ContentContainer>
    )
}

export default ChangeDays;