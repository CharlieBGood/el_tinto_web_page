import { Typography } from "@mui/material";
import { FlexContainer } from "../../atoms"
import THEME from '../../../utils/styledTheme';
import SuscribeForm from "../../molecules/SuscribeForm";
import { useEffect, useState } from "react";
import Breaker from "../../atoms/Breaker";
import Testimonials from "../../molecules/Testimonials";
import ContentContainer from "../../atoms/ContentContainer";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useExitIntent } from "use-exit-intent";
import toast, { Toaster } from "react-hot-toast";
import SuscribePopUp from "../SuscribePopUp";

const Welcome = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [open, setOpen] = useState(false);
    const { registerHandler, unsubscribe } = useExitIntent({
        "desktop": {
            "triggerOnMouseLeave": true,
        },
        "mobile": {
            "triggerOnIdle": true,
            "delayInSecondsToTrigger": 15
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

    useEffect(() => {
        function handleWindowResize() {
            setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const navigateToSuscribeConfirmation = (params: any) => {

        navigate({
            pathname: '/suscripcion-confirmada',
            search: `?${createSearchParams(params)}`
        })
    }

    return(
        <>
            <ContentContainer>
                <Typography variant="h2">
                    Historias importantes para gente ocupada
                </Typography>
                <Typography textAlign="left" variant="subtitle1" style={{margin: '5px 0 0 0'}}>
                    Infórmese en 5 minutos. Revisamos 60+ medios y le enviamos un resumen diario a su correo.
                    <br></br>
                    <strong>¡Es gratis!</strong>
                </Typography>
                <FlexContainer 
                    backgroundColor={THEME.colors.primary}
                    borderRadius="12px"
                    width="100%"
                    margin="20px 0"
                >
                    <SuscribeForm navigateToSuscribeConfirmation={navigateToSuscribeConfirmation} searchParams={searchParams} popUp={false} />
                </FlexContainer>
            </ContentContainer>
            {
                windowWidth < 768 && (
                    <img 
                        style={{width: '100%'}}
                        alt="particles"
                        src={'/images/home/landing_particles.png'}
                    />
                )
            }
            <ContentContainer direction="column" margin="0 0 0 0">
                <Testimonials />
                <Breaker />
                <Typography variant="h2">
                    Y esto, ¿cómo se toma?
                </Typography>
                <Typography variant="subtitle1" style={{margin: '20px 0 0 0'}}>
                    <strong>Calientico y bien cargado.</strong> Así llega la información todos los días a los correos de nuestros usuarios. A
                    través de un resumen diario con las historias más importantes del momento, <strong>El Tinto es la mejor
                    alternativa</strong> para consumir información curada de medios diversos y con la más alta calidad.
                </Typography>
                <Breaker />
                <Typography variant="h2">
                    Pero a mí me gusta es madrugadito para poder despertarme...
                </Typography>
                <Typography variant="subtitle1" style={{margin: '20px 0 0 0'}}>
                    No se preocupe, a nosotros también porque sino se nos pegan las cobijas. <strong>Con un correo diario todos
                    los días a las 6 a.m.</strong> esperándolo en su bandeja de entrada, usted podrá despertarse y en tan solo 5
                    minutos, cosa que no se le enfríe, estar al día con las historias más importantes.
                </Typography>
                <Breaker />
                <Typography variant="h2">
                    Pero eso, ¿sí sabe bueno?
                </Typography>
                <Typography variant="subtitle1" style={{margin: '20px 0 0 0'}}>
                    Hay de todos los sabores y para todos los gustos. <strong>El Tinto</strong> usa como materia prima la 
                    información de la más alta calidad, que curada con el ojo crítico y severo de nuestros experimentados 
                    periodistas, trae un aroma nuevo y fresco a la forma de consumir historias en el país respondiendo
                    a los principales problemas del mercado.
                    <br></br> 
                    <br></br> 
                    <strong>Demasiadas cosas sucediendo al tiempo.</strong> Las personas no tienen ni el tiempo,
                    ni el dinero para seguir el ritmo de toda la información disponible aún cuando quieren hacerlo. 
                    <br></br>  
                    <br></br> 
                    <strong>Los medios tradicionales</strong> son cada vez menos imparciales y más de nicho, generando 
                    cámaras de eco. 
                    <br></br>  
                    <br></br> 
                    <strong>No existe una solución conveniente</strong> que permita informarse de manera rápida, concisa 
                    y con información confiable de la más alta calidad.
                    <br></br>  
                    <br></br> 
                </Typography>
                <SuscribePopUp open={open} setOpen={setOpen} handleClose={handleClose}/>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </ContentContainer>
        </>
    )
}

export default Welcome;