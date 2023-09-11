import { FlexContainer } from "../../atoms";
import SuscribeForm from "../../molecules/SuscribeForm";
import THEME from '../../../utils/styledTheme';
import { Typography, styled } from "@mui/material";
import ContentContainer from "../../atoms/ContentContainer";
import FormsTextContainer from "../../atoms/FormsTextContainer";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { postUserVisits } from "../../../services";


const SubtitleFormTypography = styled(Typography)`
    width: 80%;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`


const Suscribe = () => {

    const [searchParams] = useSearchParams();
    const referral_code = searchParams.get('referral_code')

    useEffect(() => {

        if (referral_code !== null){
            postUserVisits({
                user: referral_code,
                type: "SP"
            })
        }
    }, [referral_code]);

    return(
        <ContentContainer>
            <FlexContainer 
                backgroundColor={THEME.colors.primary}
                borderRadius="12px"
                width="100%"
                direction="column"
                padding="1%"
            >
                <FormsTextContainer direction="column">
                    <Typography variant="h2" textAlign='center' color='#FFFFFF'>
                        Historias importantes para gente ocupada
                    </Typography>
                    <SubtitleFormTypography 
                        textAlign='center' 
                        variant="subtitle2"
                        sx={{margin: '20px auto 0 auto'}}
                    >
                        Un correo diario con lo más relevante del momento en Colombia, curado con los medios más rigurosos e independientes.
                        <br></br>
                        <strong>¡Es gratis!</strong>
                    </SubtitleFormTypography>
                </FormsTextContainer>
                <SuscribeForm popUp={false}/>
            </FlexContainer>
        </ContentContainer>
    )
}

export default Suscribe;