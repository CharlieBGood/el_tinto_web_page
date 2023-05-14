import { useSearchParams } from "react-router-dom";
import ContentContainer from "../../atoms/ContentContainer";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const EmailProviderButton = styled(Button)`
    box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
    border-radius: 12px;
    :hover {
        box-shadow: rgba(0, 0, 0, 1) 0px 4px 12px;
    }
`


const SuscribeConfirm = () => {

    const [searchParams] = useSearchParams();

    const SendToEmailProvider = () => {

        const emailProviderLink = searchParams.get('email_provider_link') || '/';

        window.location.replace(emailProviderLink);
    }

    return(
        <ContentContainer alignItems="center">
            <img 
                src="https://el-tinto-utils.s3.amazonaws.com/email_icon.jpeg" 
                alt="email"
                style={{width: '30%', display: 'block', margin: 'o auto'}}
            />
            <Typography variant="h2" textAlign="center">
                {searchParams.get('user_name')}, ¡revisa tu correo!
            </Typography>
            <Typography variant="body1" textAlign="center" style={{marginTop: '10px'}}>
                Pronto recibirás un correo de bienvenida para que empieces a degustarnos todas las mañanas.
            </Typography>
            {
                searchParams.get('email_provider') !== 'gmail' && (
                    <Typography variant="body1" textAlign="center" style={{marginTop: '10px'}}>
                        Si no te llegó a la carpeta principal <strong style={{color: 'red'}}>abre
                        spam solo por esta vez</strong> y sigue las instrucciones.
                    </Typography>
                )
            }
            <EmailProviderButton 
                variant="contained"
                style={{padding: '15px', marginTop: '30px'}}
                onClick={SendToEmailProvider}
            >
                <img
                    src={`https://el-tinto-utils.s3.amazonaws.com/${searchParams.get('email_provider')}_icon.png`}
                    style={{width: '30px', margin: '0 10px 0 0'}}
                    alt='email provider'
                />
                    Abrir {searchParams.get('email_provider')}
                <OpenInNewIcon style={{color: "#FFF", margin: "0 0 0 10px"}}/>
            </EmailProviderButton>
        </ContentContainer>
    )
}

export default SuscribeConfirm;