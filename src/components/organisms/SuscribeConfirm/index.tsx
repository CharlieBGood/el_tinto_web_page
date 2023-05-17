import { useSearchParams } from "react-router-dom";
import ContentContainer from "../../atoms/ContentContainer";
import { Button, Typography } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const SuscribeConfirm = () => {

    const [searchParams] = useSearchParams();

    const SendToEmailProvider = () => {

        const emailProviderLink = searchParams.get('email_provider_link') || '/';

        window.location.replace(emailProviderLink);
    }

    const emailProvider: string = searchParams.get("email_provider") || "tu correo";

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
                searchParams.get('email_provider') !== 'Gmail' && (
                    <Typography variant="body1" textAlign="center" style={{marginTop: '10px'}}>
                        Si no te llegó a la carpeta principal <strong style={{color: 'red'}}>abre
                        spam solo por esta vez</strong> y sigue las instrucciones.
                    </Typography>
                )
            }
            <Button 
                variant="contained"
                style={{padding: '15px', marginTop: '30px'}}
                onClick={SendToEmailProvider}
            >
                {
                    (emailProvider === "gmail" || emailProvider === "outlook" || emailProvider === "yahoo")
                    && (
                        <img
                            src={`/images/utils/${emailProvider}_icon.png`}
                            style={{width: '30px', margin: '0 10px 0 0'}}
                            alt='email provider'
                        />
                    )
                }
                    Abrir {emailProvider.charAt(0).toUpperCase() + emailProvider.slice(1).toLocaleLowerCase()}
                <OpenInNewIcon style={{color: "#FFF", margin: "0 0 0 10px"}}/>
            </Button>
        </ContentContainer>
    )
}

export default SuscribeConfirm;