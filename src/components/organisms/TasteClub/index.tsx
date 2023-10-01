import { Grid, Link, Typography } from "@mui/material";
import ContentContainer from "../../atoms/ContentContainer";
import { FlexContainer } from "../../atoms";
import { useEffect, useState } from "react";
import SuscribePaymentCard from "../../molecules/SuscribePaymentCard";
import { getGeoInfo } from "../../../services";
import Breaker from "../../atoms/Breaker";
import SuscribeSpecialEditionMails from "../../molecules/SuscribeSpecialEditionMails";

const TasteClub = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [country, setCountry] = useState('')

    const setGeoInfo = () => {
        getGeoInfo()
        .then(response => {
            setCountry(response.data.country)
        })
    }

    const suscriptionTiers = [
        {
            name: 'Grano de café',
            price: country === 'CO' ? '5.000' : '1',
            code: country === 'CO' ? process.env.REACT_APP_COFFEE_BEAN_BUY_CODE : process.env.REACT_APP_COFFEE_BEAN_USD_BUY_CODE,
            recommended: false,
            benefits: [
                '1 Tinto dominguero al mes.',
                'Informe El Tinto.'
            ]
        },
        {
            name: 'Café molido',
            price: country === 'CO' ? '10.000' : '2',
            code: country === 'CO' ? process.env.REACT_APP_GROUND_COFFEE_BUY_CODE : process.env.REACT_APP_GROUND_COFFEE_USD_BUY_CODE,
            recommended: false,
            benefits: [
                '2 Tintos Domingueros al mes.',
                '1 de los 6 Tintos de edición especial.',
                'Informe El Tinto.'
            ]
        },
        {
            name: 'Un Tinto',
            price: country === 'CO' ? '25.000' : '5',
            code: country === 'CO' ? process.env.REACT_APP_TINTO_BUY_CODE : process.env.REACT_APP_TINTO_USD_BUY_CODE,
            recommended: true,
            benefits: [
                '3 Tintos Domingueros al mes.',
                '3 de los 6 Tintos de edición especial.',
                'Acceso gratuito a 1 taller de El Tinto al año.',
                'Comparta estos beneficios con 1 Tintero o Tintera que usted escoja.',
                'Informe El Tinto.'
            ]
        },
        {
            name: 'Café de exportación',
            price: country === 'CO' ? '50.000' : '10',
            code: country === 'CO' ? process.env.REACT_APP_EXPORTATION_COFFEE_BUY_CODE : process.env.REACT_APP_EXPORTATION_COFFEE_USD_BUY_CODE,
            recommended: false,
            benefits: [
                'Todos los Tintos Domingueros del mes (4 o 5 según el mes).',
                'Todos los Tintos de edición especial.',
                'Acceso gratuito a 2 taller de El Tinto al año.',
                'Comparta estos beneficios con 3 Tinteros o Tinteras que usted escoja.',
                'Personalizar la hora de llegada de su Tinto.',
                'Ser el primero en tener acceso a desarrollos nuevos.',
                'Informe El Tinto.'
            ]
        }
    ]

    const specialEditionMailsList = [
        {
            name: 'Café molido',
            benefits: ['Acceso al tinto de Santos inocentes.']
        },
        {
            name: 'Un Tinto',
            benefits: ['Acceso a:', 'El Tinto de Inocentes + el Primer Tinto del Año + un Tinto sorpresa.']
        },
        {
            name: 'Café de exportación',
            benefits: ['Acceso a:', 'El Tinto de Inocentes + el Tinto Navideño + el Último Tinto del Año + el Primer Tinto del Año + dos Tintos sorpresa.']
        }
    ]

    useEffect(() => {

        if (country === '') {
            setGeoInfo();
        }

        function handleWindowResize() {
            setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };

    }, []);

    return(
        <>
            <ContentContainer>
                <img 
                    src="/images/taste_club/logo.jpg" 
                    style={{width: windowWidth < 768 ? '30%' : '10%', margin: '0 auto'}}
                    alt="logo"
                /> 
                <Typography 
                    variant="h2"
                    style={{margin: "10px auto 40px auto"}}
                >
                    ¡Únase al Club de Cata!
                </Typography>
                <Typography variant="h2">
                    Y esto, ¿cómo se come?
                </Typography>
                <Typography variant="subtitle1">
                    El Club de Cata es un espacio exclusivo para los Tinteros y Tinteras más dedicados.
                </Typography>
                {
                    windowWidth < 768 && (
                        <Breaker />
                    )
                }
                {
                    windowWidth < 768 ? (
                        <>
                            <Typography variant="h2">
                                Además, seamos francos:
                            </Typography>
                            <Typography variant="subtitle1" style={{marginTop: "10px"}}>
                                De amor no se vive. Si queremos hacer que El Tinto sea algo 
                                sostenible, a través del Club de Cata se puede sentir orgulloso y orgullosa de ayudar un emprendimiento 
                                Colombiano en una industria que necesita innovación: <strong>la periodística.</strong>
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="subtitle1" marginTop='10px'>
                            <strong>Además, seamos francos: </strong> de amor no se vive. Si queremos hacer que El Tinto sea algo 
                            sostenible, a través del Club de Cata se puede sentir orgulloso y orgullosa de ayudar un emprendimiento 
                            Colombiano en una industria que necesita innovación: la periodística.
                        </Typography>
                    )
                }
                <Breaker />
                <Typography variant="h2">
                    ¿Cómo puedo ayudar?
                </Typography>
                <Typography variant="subtitle1" style={{marginBottom: "40px"}}>
                    Escoja cualquiera de las cuatro opciones y haga click en "Únase".
                </Typography>
                <Grid container rowSpacing={5} spacing={2}>
                    {
                        suscriptionTiers.map(tier => (
                            <Grid item xs={12} lg={3}>
                                <SuscribePaymentCard 
                                    name={tier.name} 
                                    price={tier.price} 
                                    code={tier.code} 
                                    recommended={tier.recommended} 
                                    benefits={tier.benefits} 
                                    country={country} 
                                    windowWidth={windowWidth}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                <Breaker />
                <Typography variant="h2">
                    ¿Le gustaría tener algo que no ve acá?
                </Typography>
                <Typography variant="subtitle1">
                    Déjenos saber en <Link href="www.google.com">esta encuesta</Link>
                </Typography>
                <Typography variant="subtitle1" style={{marginTop: "10px"}}>
                    <strong>El Club de Cata siempre va a seguir mejorando,</strong> vamos a incluir nuevos beneficios 
                    que les traigan aún más valor a los Tinteros y Tinteras.
                </Typography>
                <Breaker />
                <Typography variant="h2">
                    Ahora sí, explíqueme bien los beneficios
                </Typography>
                <ul style={{padding: "0 18px", margin: windowWidth < 768 ? "10px 0" : "0"}}>
                    <li>
                        <Typography variant="subtitle1">
                            El informe El Tinto es una rendición de cuentas. Cada mes impar le vamos a mostrar detalladamente 
                            cómo estamos usando su dinero, qué estamos desarrollando nuevo y cómo nos ha ido hasta el momento. 
                            ¡Total transparencia!
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1">
                            Los talleres de El Tinto los haecemos en periodismo, escritura, ciencia de datos, desarrollo web, diseño 
                            y periodismo de datos. Mejor dicho, loe enseñamos todo lo que nosotros sabemos hacer.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1">
                            Ahora hablemos de los Tintos de edición especial, que son una belleza:
                        </Typography>
                    </li>
                </ul>
                <FlexContainer container margin="20px auto" width="100%" padding={windowWidth > 768 ? '0 10%' : '0'}>
                    {
                        specialEditionMailsList.map(specialEditionMail => (
                            <SuscribeSpecialEditionMails name={specialEditionMail.name} benefits={specialEditionMail.benefits} windowWidth={windowWidth} />
                        ))
                    }
                </FlexContainer>
                <ul style={{padding: "0 18px"}}>
                <li>
                        <Typography variant="subtitle1">
                            Los demás beneficios se explican solos, ¿no? Pero si tiene alguna duda, no dude en mandarnos un correo 
                            a <Link style={{marginLeft: "3px"}} href="mailto:info@eltinto.xyz">info@eltinto.xyz</Link>
                        </Typography>
                    </li>
                </ul>
                <Breaker />
                <Typography variant="h2">
                    No estoy listo para unirme al Club de Cata pero me gustaría hacer un aporte único, 
                    ¿eso es posible?
                </Typography>
                <Typography variant="subtitle1" style={{marginBottom: "20px"}}>
                    ¡Claro que sí! Puede hacer un aporte único en nuestro Vaki <Link href="https://vaki.co/es/vaki/eltinto">acá.</Link>
                </Typography>
            </ContentContainer>
        </>
    )
}

export default TasteClub;