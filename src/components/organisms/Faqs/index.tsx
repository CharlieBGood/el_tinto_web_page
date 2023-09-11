import { Accordion, AccordionDetails, AccordionSummary, Link, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentContainer from "../../atoms/ContentContainer"
import THEME from '../../../utils/styledTheme';
import styled from "styled-components";
import { useState } from "react";
import { useExitIntent } from "use-exit-intent";
import toast, { Toaster } from "react-hot-toast";
import SuscribePopUp from "../SuscribePopUp";


const FaqsImage = styled.img`
    display: block; 
    margin: 20px auto; 
    max-width: 100%
`

const TAccordion = styled(Accordion)`
    .css-1vshtfz-MuiPaper-root-MuiAccordion-root.Mui-expanded:first-of-type: {
        margin: 2px;
    }
`

const Faqs = () => {

    const [open, setOpen] = useState(false);
    const { registerHandler, unsubscribe } = useExitIntent({
        "desktop": {
            "triggerOnMouseLeave": true,
        },
        "mobile": {
            "triggerOnIdle": true,
            "delayInSecondsToTrigger": 10
        }
    })

    const handleClose = (isSubscription: boolean) => {
        if (isSubscription){
            toast.success('¡Bienvenido a El Tinto!')
        }
        setOpen(false);

        unsubscribe();
    };

    registerHandler({
        id: 'openModal',
        handler: () => setOpen(true),
    })
    
    return (
        <ContentContainer>
            <Typography variant="h2">
                Preguntas frecuentes
            </Typography>
            <Typography variant="subtitle1" style={{margin: '5px 0 0 0'}}>
                Aquí puedes encontrar las dudas más comunes de nuestros usuarios y si tienes alguna que no te podamos resolver, 
                recuerda que siempre puedes escribirnos a <Link href='mailto:info@eltinto.xyz'>info@eltinto.xyz</Link>.
            </Typography>
            <TAccordion sx={{marginTop: "40px"}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography variant="body1">¿Qué hacemos?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant="subtitle1" color={THEME.colors.placeholderColor}>
                    El internet tiene mucho ruido. Estamos seguros de que la gente quiere informarse sin sesgos, pero nadie tiene el tiempo para estar pendiente de todo lo que publican los medios, ni para diferenciar lo importante y bien hecho de las historias que se publican solo para atraer tráfico.
                    <br></br>
                    <br></br>
                    En El Tinto nos encargamos de eso. Nuestro equipo le pone la lupa a los ciclos de historias, y decanta y resume solo las historias más importantes del momento. Las construimos usando 60+ medios nacionales e internacionales para que solo consumas labor periodística diversa y de alta calidad.
                </Typography>
                </AccordionDetails>
            </TAccordion>
            <Accordion sx={{width: '100%'}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography variant="body1">¿A qué horas llegan los correos?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant="subtitle1" color={THEME.colors.placeholderColor}>
                    Todos los días a las 6 a.m. hora Colombia (UTC-5). 
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{width: '100%'}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography variant="body1">No me llegan los correos (Gmail)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant="subtitle1" color={THEME.colors.placeholderColor}>
                    Revisa tu carpeta de correo no deseado (spam) y la pestaña de promociones. Google a veces nos manda allá.
                    <br></br>
                    <br></br>
                    <br></br>
                    <strong>Agréganos como contacto</strong>
                    <br></br>
                    <br></br>
                    Esta es la única forma de garantizar que nuestros correos siempre lleguen a tu carpeta principal. Para agregar a El Tinto como contacto, pon tu mouse sobre nuestro nombre en alguno de nuestros correos y haz click sobre el ícono de agregar contácto:
                    <br></br>
                    <FaqsImage src="https://el-tinto-utils.s3.amazonaws.com/faq/addToContacts.png" />
                    <strong>Mueve nuestros correos a tu carpeta principal</strong>
                    <br></br>
                    <br></br>
                    Si tienes activadas las pestañas (tabs) y El Tinto te llega a “Promociones” (“Promotions”), puedes arrastrar el correo a tu carpeta principal:
                    <br></br>
                    <FaqsImage src="https://el-tinto-utils.s3.amazonaws.com/faq/moveEmailGmail.png" />
                    Gmail te va a preguntar si quieres que todos nuestros correos lleguen a tu carpeta principal:
                    <br></br>
                    <FaqsImage src="https://el-tinto-utils.s3.amazonaws.com/faq/acceptGmailPopup.png" />
                    Haz click en sí/yes. 
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion 
                sx={{
                    ":last-of-type": {
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                    },
                    'width': '100%'
                }}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography variant="body1">No me llegan los correos (Outlook)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Revisa tu carpeta de correo no deseado (junk). Microsoft suele enviar correos ahí.
                      <br></br>
                      <br></br>
                      <br></br>
                      <strong>Mueve el correo a “correo deseado”</strong>
                      <br></br>
                      <br></br>
                      En la carpeta de correo no deseado, haz click en el correo y después sobre el botón de “Correo deseado”.
                      <br></br>
                      <FaqsImage src="https://el-tinto-utils.s3.amazonaws.com/faq/moveWantedMail.png" />
                      Si Microsoft te pide informar que es correo deseado, por favor haz click en “Informar”:
                      <br></br>
                      <FaqsImage src="https://el-tinto-utils.s3.amazonaws.com/faq/informMicrosoft.png" />
                      <strong>Agrega info@eltinto.xzy a la lista de dominios seguros</strong>
                      <br></br>
                      <br></br>
                      Haz click en configuración (settings) - la ruedita en la barra de navegación:
                      <br></br>
                      <FaqsImage src="https://el-tinto-utils.s3.amazonaws.com/faq/settings.png" />
                      Luego, abre todos los ajustes:
                      <br></br>
                      <FaqsImage src="https://el-tinto-utils.s3.amazonaws.com/faq/allSettings.png" />
                      Navega hacia los ajustes de correo no deseado:
                      <br></br>
                      <FaqsImage src="https://el-tinto-utils.s3.amazonaws.com/faq/unwantedMail.png" />
                      Agrega “info@eltinto.xyz” a los dominios seguros:
                      <br></br>
                      <FaqsImage src="https://el-tinto-utils.s3.amazonaws.com/faq/addSafeDomain.png" />
                      ¡Listo!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion 
                sx={{
                    ":last-of-type": {
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                    }
                }}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography variant="body1">¿Cómo ayuda mi nombre a que los correos lleguen a la bandeja de entrada/inbox?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Gmail y Outlook tienen filtros que clasifican todos los correos. Personalizar los correos con tu nombre y apellido le dice a los clasificadores que nos conocemos y que nuestros correos deberían llegar a tu bandeja de entrada/inbox.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <SuscribePopUp open={open} setOpen={setOpen} handleClose={handleClose}/>
        </ContentContainer>
    )
}

export default Faqs;