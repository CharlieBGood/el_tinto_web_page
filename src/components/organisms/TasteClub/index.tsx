import { Grid, Link, Typography } from "@mui/material";
import { FlexContainer } from "../../atoms";
import { useEffect, useState } from "react";
import SuscribePaymentCard from "../../molecules/SuscribePaymentCard";
import { getGeoInfo } from "../../../services";
import styled from "styled-components";
import THEME from '../../../utils/styledTheme';


const TasteClubContentContainer = styled(FlexContainer)`
    padding: 0 6%;
`

const BulletLogo = styled.img`
    margin-right: 20px;
    max-width: 22px;
`

const VakiContainer = styled(FlexContainer)`
    @media only screen and (max-width: 960px) {
        margin-top: 30px;
    }
`

const OtherContainer = styled(Grid)`
    && {
        @media only screen and (max-width: 960px) {
            margin-top: 30px;
        }
        @media only screen and (min-width: 960px) {
            margin-top: 70px;
        }
    }
`

const TasteClub = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [continent, setContinent] = useState('')

    const setGeoInfo = () => {
        getGeoInfo()
        .then(response => {
            console.log(response.data)
            setContinent(response.data.continent_code)
        })
    }

    const suscriptionTiers = [
        {
            name: 'Grano de café',
            price: '5.000',
            image: "/images/taste_club/coffee_bean.png",
            code: process.env.REACT_APP_COFFEE_BEAN_BUY_CODE,
            recommended: false,
            benefits: [
                '1 Tinto dominguero al mes.',
                'Informe El Tinto.'
            ]
        },
        {
            name: 'Café molido',
            price: '10.000',
            image: "/images/taste_club/ground_coffee.png",
            code: process.env.REACT_APP_GROUND_COFFEE_BUY_CODE,
            recommended: false,
            benefits: [
                '2 Tintos Domingueros al mes.',
                '1 Tinto de edición especial al año.',
                'Informe El Tinto.'
            ]
        },
        {
            name: 'Un Tinto',
            price: '25.000',
            image: "/images/taste_club/coffee.png",
            code: process.env.REACT_APP_TINTO_BUY_CODE,
            recommended: continent === 'SA' ? true : false,
            benefits: [
                '3 Tintos Domingueros al mes.',
                '3 Tintos de edición especial al año.',
                '1 taller de El Tinto al año.',
                'Regale estos beneficios a 1 persona.',
                'Informe El Tinto.'
            ]
        },
        {
            name: 'Café de exportación',
            price: '50.000',
            image: "/images/taste_club/exportation_coffee.png",
            code: process.env.REACT_APP_EXPORTATION_COFFEE_BUY_CODE,
            recommended: continent !== 'SA' ? true : false,
            benefits: [
                'Todos los Tintos Domingueros.',
                'Todos los Tintos de edición especial.',
                '2 taller de El Tinto al año.',
                'Personalización de la hora de llegada.',
                'Acceso prioritario a desarrollos nuevos.',
                'Regale estos beneficios a 3 personas.',
                'Informe El Tinto.'
            ]
        }
    ]

    useEffect(() => {

        if (continent === '') {
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
            <TasteClubContentContainer
                alignItems="center"
                width="100%"
                style={{
                    backgroundImage: "url(/images/taste_club/banner.png)", 
                    backgroundSize: "cover",
                }}
            >
                <img 
                    src="/images/taste_club/logo.png" alt="banner"
                    style={{display: "block", minWidth: "100px", marginTop: "32px", marginBottom: "32px"}}
                    width="15%"
                />
                {windowWidth < 1200 ? (
                        <Typography variant="h1" marginLeft="32px" color="#FFF">
                            ¡Pase al<br></br> Club de Cata!
                        </Typography>
                    ): (
                        <Typography variant="h1" marginLeft="3%" color="#FFF">
                            ¡Pase al Club de Cata!
                        </Typography>
                    )}
                
            </TasteClubContentContainer>
            <TasteClubContentContainer width="100%" direction="column" margin="60px 0">
                <Grid container rowSpacing="75px" spacing={2} style={{marginBottom: "75px"}}>
                    <Grid item lg={6} xs={12}>
                        <FlexContainer direction="column">
                            <FlexContainer width="100%" alignItems="center">
                                <BulletLogo src="/images/taste_club/bullet.png" />
                                <Typography variant="h3" width="100%">
                                    Y esto, ¿cómo se come?
                                </Typography>
                            </FlexContainer>
                            <Typography variant="body1" margin="10px 0 0">
                                El Club de Cata es un espacio exclusivo para los Tinteros y Tinteras más dedicados que 
                                quieran recibir beneficios extras y ayudar con la sostenibilidad de El Tinto.
                            </Typography>
                        </FlexContainer>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <FlexContainer direction="column">
                            <FlexContainer width="100%" alignItems="center">
                                <BulletLogo src="/images/taste_club/bullet.png" />
                                <Typography variant="h3" width="100%">
                                    ¿Cómo puedo ayudar?
                                </Typography>
                            </FlexContainer>
                            <Typography variant="body1" margin="10px 0 0">
                                Escoja cualquiera de las cuatro opciones y haga click en "Únase". 
                                O haga una donación única al final de esta página.
                            </Typography>
                        </FlexContainer>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={5} spacing={2} padding={windowWidth < 960 ? '0 11%' : '0'}>
                    {
                        suscriptionTiers.map(tier => (
                            <Grid item xs={12} md={3}>
                                <SuscribePaymentCard 
                                    name={tier.name} 
                                    price={tier.price}
                                    image={tier.image} 
                                    code={tier.code} 
                                    recommended={tier.recommended} 
                                    benefits={tier.benefits}
                                    windowWidth={windowWidth}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                <FlexContainer width="100%" margin="75px 0 0 0">
                    <BulletLogo src="/images/taste_club/bullet.png" style={{marginTop: "3px"}} />
                    <Typography variant="h3">
                        Ahora sí, <br></br>explíqueme bien los beneficios
                    </Typography>
                </FlexContainer>
                {
                    windowWidth > 960 ? (
                        <>
                            <FlexContainer width="90%" alignItems="center" margin="0 auto">
                                <FlexContainer 
                                    style={{boxShadow: '0 0 2px 2px #ccc', padding: "36px 41px", borderRadius: "36px"}}
                                    alignSelf="flex-end"
                                >
                                    <Typography variant='h3' padding="0 26% 0 0" fontWeight="400">
                                        El informe es una rendición de cuentas. Cada mes impar le vamos a mostrar  
                                        cómo usamos su dinero, qué desarrollamos nuevo y cómo nos ha ido.  
                                        <span style={{color: THEME.colors.primary, fontWeight: 700}}>&nbsp;¡Total transparencia!</span>
                                    </Typography>
                                </FlexContainer>
                                <img 
                                    style={{margin: "0 0 0 -20%", maxWidth: "322px"}}
                                    src="/images/taste_club/memoji_1.png" alt="memoji"
                                />
                            </FlexContainer>
                            <FlexContainer width="90%" alignItems="center" margin="15px auto 0 auto">
                                <img
                                    style={{margin: "0 0 0 -5%", maxWidth: "316px", zIndex: 1}}
                                    src="/images/taste_club/memoji_2.png" alt="memoji"
                                />
                                <FlexContainer 
                                    style={{boxShadow: '0 0 2px 2px #ccc', padding: "36px 41px", borderRadius: "36px", margin: "0 0 0 -20%"}}
                                    alignSelf="flex-end"
                                >
                                    <Typography variant='h3' padding="0 0 0 16%" fontWeight="400" textAlign="right">
                                        Los talleres los hacemos en escritura, ciencia de datos, desarrollo web, 
                                        diseño, periodismo y periodismo de datos.  
                                        <span style={{color: THEME.colors.primary, fontWeight: 700}}>&nbsp;Mejor dicho, le enseñamos 
                                        todo lo que nosotros sabemos hacer.</span>
                                    </Typography>
                                </FlexContainer>
                            </FlexContainer>
                            <FlexContainer width="90%" alignItems="center" margin="30px auto 0 auto">
                                <FlexContainer 
                                    style={{boxShadow: '0 0 2px 2px #ccc', padding: "36px 41px", borderRadius: "36px"}}
                                >
                                    <Typography variant='h3' padding="0 20% 0 0" fontWeight="400">
                                        Además de nuestros clásicos Tintos Domingueros, cada año tendremos 
                                        <span style={{color: THEME.colors.primary, fontWeight: 700}}>&nbsp;seis Tintos de edición especial.</span>
                                        &nbsp;Van desde Año Nuevo y Navidad, hasta el Día de los Inocentes y dos Tintos sorpresa.
                                    </Typography>
                                </FlexContainer>
                                <img 
                                    style={{margin: "0 0 0 -20%", maxWidth: "277px"}}
                                    src="/images/taste_club/memoji_3.png" alt="memoji"
                                />
                            </FlexContainer>
                            <FlexContainer width="90%" alignItems="center" margin="-75px auto 0 auto">
                                <img
                                    style={{margin: "0 0 0 -10%", maxWidth: "316px", zIndex: 1}}
                                    src="/images/taste_club/memoji_4.png" alt="memoji"
                                />
                                <FlexContainer 
                                    style={{boxShadow: '0 0 2px 2px #ccc', padding: "36px 41px", borderRadius: "36px", margin: "0 0 0 -20%"}}
                                    alignSelf="flex-end"
                                >
                                    <Typography variant='h3' padding="0 0 0 14%" fontWeight="400" textAlign="right">
                                        <span style={{color: THEME.colors.primary, fontWeight: 700}}>
                                            &emsp;Porque de eso tan bueno sí dan tanto,
                                        </span> podrá compartir los beneficios de su nivel con los Tinter@s que usted elija, acceder de primero 
                                        a desarrollos nuevos y hasta personalizar la hora a la que le llega el Tinto.
                                    </Typography>
                                </FlexContainer>
                            </FlexContainer>
                        </>
                    ) : (
                        <>
                            <FlexContainer width="100%" direction="column" alignItems="center" margin="30px auto auto">
                                <img 
                                    style={{margin: "0 auto 0 0", maxWidth: "200px"}}
                                    src="/images/taste_club/memoji_2.png" alt="memoji"
                                />
                                <FlexContainer 
                                    style={{boxShadow: '0 0 2px 2px #ccc', padding: "25px 10px", borderRadius: "24px"}}
                                    alignSelf="flex-end"
                                >
                                    <Typography variant='h3' fontWeight="400" style={{fontSize: "18px"}}>
                                        El informe es una rendición de cuentas. Cada mes impar le vamos a mostrar  
                                        cómo usamos su dinero, qué desarrollamos nuevo y cómo nos ha ido.
                                        <span style={{color: THEME.colors.primary, fontWeight: 700}}>&nbsp;¡Total transparencia!</span>
                                    </Typography>
                                </FlexContainer>
                            </FlexContainer>
                            <FlexContainer width="100%" direction="column" alignItems="center" margin="30px auto auto">
                                <img
                                    style={{maxWidth: "200px", zIndex: 1}}
                                    src="/images/taste_club/memoji_1.png" alt="memoji"
                                />
                                <FlexContainer 
                                    style={{boxShadow: '0 0 2px 2px #ccc', padding: "25px 10px", borderRadius: "24px"}}
                                    alignSelf="flex-end"
                                >
                                    <Typography variant='h3' fontWeight="400" style={{fontSize: "18px"}}>
                                        Los talleres los hacemos en escritura, ciencia de datos, desarrollo web, 
                                        diseño, periodismo, y periodismo de datos.  
                                        <span style={{color: THEME.colors.primary, fontWeight: 700}}>&nbsp;Mejor dicho, le enseñamos 
                                        todo lo que nosotros sabemos hacer.</span>
                                    </Typography>
                                </FlexContainer>
                            </FlexContainer>
                            <FlexContainer width="100%" direction="column" alignItems="center" margin="30px auto auto">
                                <img 
                                    style={{maxWidth: "150px"}}
                                    src="/images/taste_club/memoji_3.png" alt="memoji"
                                />
                                <FlexContainer 
                                    style={{boxShadow: '0 0 2px 2px #ccc', padding: "25px 10px", borderRadius: "24px"}}
                                >
                                    <Typography variant='h3' fontWeight="400" style={{fontSize: "18px"}}>
                                        Además de nuestros clásicos Tintos Domingueros, cada año tendremos 
                                        <span style={{color: THEME.colors.primary, fontWeight: 700}}>&nbsp;seis Tintos de edición especial.</span>
                                        &nbsp;Van desde Año Nuevo y Navidad, hasta el Día de los Inocentes y dos Tintos sorpresa.
                                    </Typography>
                                </FlexContainer>
                            </FlexContainer>
                            <FlexContainer width="100%" direction="column" alignItems="center" margin="10px auto auto">
                                <img
                                    style={{margin: "0 0 0 auto", maxWidth: "200px", zIndex: 1}}
                                    src="/images/taste_club/memoji_4_right.png" alt="memoji"
                                />
                                <FlexContainer 
                                    style={{boxShadow: '0 0 2px 2px #ccc', padding: "25px 10px", borderRadius: "24px"}}
                                    alignSelf="flex-end"
                                >
                                    <Typography variant='h3' fontWeight="400" style={{fontSize: "18px"}}>
                                        <span style={{color: THEME.colors.primary, fontWeight: 700}}>
                                            &nbsp;Porque de eso tan bueno sí dan tanto,
                                        </span> podrá compartir los beneficios de su nivel con los Tinter@s que usted elija, acceder de primero 
                                        a desarrollos nuevos y hasta personalizar la hora a la que le llega el Tinto.
                                    </Typography>
                                </FlexContainer>
                            </FlexContainer>
                        </>
                    )
                }
                <OtherContainer container spacing={2}>
                    <Grid item lg={6} xs={12}>
                        <FlexContainer 
                            direction="column" 
                            backgroundColor={THEME.colors.primary} 
                            borderRadius="36px"
                            padding="25px 20px"
                        >
                            <Typography variant="h3" width="100%" color="#FFF">
                                ¿Le gustaría tener algo que no ve acá?
                            </Typography>
                            <Typography variant="body1" margin="10px 0 0" color="#FFF">
                                Déjenos saber en esta <Link href="https://tally.so/r/m6jGQB">encuesta</Link>
                            </Typography>
                            <Typography variant="body1" margin="10px 0 0" color="#FFF">
                                El Club de Cata siempre va a seguir mejorando, incluirémos nuevos beneficios que le traigan 
                                aún más valor a los Tinteros y Tinteras.
                            </Typography>
                        </FlexContainer>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <VakiContainer direction="column" padding="25px 20px">
                            <FlexContainer width="100%" alignItems="center">
                                <Typography variant="h3" width="100%">
                                <BulletLogo src="/images/taste_club/bullet.png" />
                                    No estoy listo para unirme al Club de Cata pero me gustaría hacer un aporte 
                                    único, ¿eso es posible?
                                </Typography>
                            </FlexContainer>
                            <Typography variant="body1" margin="10px 0 0">
                                ¡Claro que sí! Puede hacer un aporte único en nuestro Vaki <Link href="https://vaki.co/es/vaki/eltinto">acá.</Link>
                            </Typography>
                        </VakiContainer>
                    </Grid>
                </OtherContainer>
                <img 
                    src="/images/taste_club/logo.png" alt="banner"
                    style={{display: "block", minWidth: "100px", marginLeft: "auto", marginTop: "65px"}}
                    width="15%"
                />
            </TasteClubContentContainer>
        </>
    )
}

export default TasteClub;