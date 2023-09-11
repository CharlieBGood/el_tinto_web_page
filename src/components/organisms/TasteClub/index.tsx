import { Grid, Typography } from "@mui/material";
import ContentContainer from "../../atoms/ContentContainer";
import { FlexContainer } from "../../atoms";
import { useEffect, useState } from "react";
import SuscribePaymentCard from "../../molecules/SuscribePaymentCard";
import { getGeoInfo } from "../../../services";

const TasteClub = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [country, setCountry] = useState('')

    const setGeoInfo = () => {
        getGeoInfo()
        .then(response => {
            setCountry(response.data.country)
        })
        .catch(error => console.log(error.data))
    }

    const suscriptionTiers = [
        {
            name: 'Semilla de café',
            price: country === 'CO' ? '5.000' : '1',
            code: country === 'CO' ? process.env.REACT_APP_COFFEE_SEED_BUY_CODE : process.env.REACT_APP_COFFEE_SEED_USD_BUY_CODE,
            recommended: false
        },
        {
            name: 'Grano de café',
            price: country === 'CO' ? '10.000' : '2',
            code: country === 'CO' ? process.env.REACT_APP_COFFEE_BEAN_BUY_CODE : process.env.REACT_APP_COFFEE_BEAN_USD_BUY_CODE,
            recommended: false
        },
        {
            name: 'Un Tinto',
            price: country === 'CO' ? '25.000' : '5',
            code: country === 'CO' ? process.env.REACT_APP_TINTO_BUY_CODE : process.env.REACT_APP_TINTO_USD_BUY_CODE,
            recommended: true
        },
        {
            name: 'Café de exportación',
            price: country === 'CO' ? '50.000' : '10',
            code: country === 'CO' ? process.env.REACT_APP_EXPORTATION_COFFEE_BUY_CODE : process.env.REACT_APP_EXPORTATION_COFFEE_USD_BUY_CODE,
            recommended: false
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
                <FlexContainer
                    direction={windowWidth < 768 ? 'column' : 'row'}
                    alignItems="baseline"
                >
                     <img 
                        src="/images/taste_club/logo.jpg" 
                        style={{width: windowWidth < 768 ? '20%' : '10%', margin: '0 15px 0 0'}}
                        alt="logo"
                    /> 
                    <Typography 
                        variant="h2"
                        style={{marginTop: windowWidth < 768 ? '10px' : '0'}}
                    >
                        Haz parte del Club de Cata
                    </Typography>
                </FlexContainer>
                <Typography variant="subtitle1" style={{margin: '20px 0 0 0'}}>
                    <strong>Calientico y bien cargado.</strong> Así llega la información todos los días a los correos de nuestros usuarios. A
                    través de un resumen diario con las historias más importantes del momento, <strong>El Tinto es la mejor
                    alternativa</strong> para consumir información curada de medios diversos y con la más alta calidad.
                </Typography>
                <Typography variant="subtitle1" style={{margin: '40px 0'}}>
                    <strong>¡Bienvenidos al Club de Cata!</strong>
                </Typography>
                <Grid container spacing={2}>
                    {
                        suscriptionTiers.map(tier => (
                            <Grid item xs={6} lg={3}>
                                <SuscribePaymentCard name={tier.name} price={tier.price} code={tier.code} recommended={tier.recommended} country={country} />
                            </Grid>
                        ))
                    }
                </Grid>
                
            </ContentContainer>
        </>
    )
}

export default TasteClub;