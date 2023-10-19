import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { FlexContainer } from "../../atoms";
import { SuscribePaymentCardProps } from "./types";
import { Button } from "react-bootstrap";
import THEME from '../../../utils/styledTheme';
import styled from "styled-components";

const redirectPay = (code: string | undefined) => {
    window.location.href = `https://buy.stripe.com/${code}`
}

const CardContainer = styled(FlexContainer)<{recommended: boolean}>`
    
    @media (max-width: 960px) {
        height: auto;
    }
    @media (min-width: 960px) {
        height: ${props => props.recommended ? '490' : '475'}px;
    }
    @media (min-width: 1920px) {
        height: ${props => props.recommended ? '510' : '495'}px;
    }
`

const SuscribePaymentCard: React.FC<SuscribePaymentCardProps> = ({name, price, image, code, recommended, benefits, windowWidth}) => {
    return(
        <CardContainer
            direction="column"
            alignItems="center"
            margin={recommended && windowWidth > 960 ? "0" : "15px 0 0 0"}
            padding={recommended ? "0 0 2px 0" : "0"}
            recommended={recommended}
            style={{
                borderColor: THEME.colors.primary,
                backgroundColor: THEME.colors.primary, 
                borderStyle: recommended ? 'solid' : 'none', 
                borderRadius: '20px', 
                boxShadow: recommended ? 'none' : '0 0 2px 2px #ccc'
            }}
        >
            {
                recommended && (
                    <Typography variant="subtitle2" style={{color: "#FFF", textAlign: "center", fontSize: '12px'}}>
                        <span style={{fontSize: '8px'}}>★</span> Recomendado por El Tinto <span style={{fontSize: '8px'}}>★</span>
                    </Typography>
                )
            }
            <Card sx={{ borderRadius: '20px'}} style={{width: recommended ? "98%" : "100%", height: "100%", display: "grid"}}>
                <CardContent style={{padding: 0}}>
                    <FlexContainer
                        style={{
                            alignItems: "center", backgroundImage: `url(${image})`, backgroundSize: "cover", 
                            backgroundPosition: "center", height: "131px", minWidth: "271"
                        }}
                    >
                        <Typography 
                            variant="h2"
                            style={{
                                color: "#FFF",
                                textAlign: "center",
                                margin: "0 auto",
                            }}>
                            {name}
                        </Typography>
                    </FlexContainer>
                    <Typography variant="h2" style={{margin: "25px 0 0 0", textAlign: "center", fontWeight: '400'}}>
                        {price} <span style={{fontSize: "12px"}}>COP</span>
                    </Typography>
                    <ul style={{paddingLeft: '2.5rem'}}>
                        {
                            benefits.map(benefit => (
                                <li style={{padding: '5px 5px 0 0'}}>
                                    <Typography variant="caption" style={{color: "#000", lineHeight: '1.2'}}>
                                        {benefit}
                                    </Typography>
                                </li>
                            ))
                        }
                    </ul>
                </CardContent>
                <CardActions sx={{marginTop: "auto"}}>
                    <Button 
                        variant="contained" type={'submit'}
                        style={{width: '127px', margin: windowWidth < 960 ? '50px auto 10px auto' : 'auto auto 10px auto', backgroundColor: THEME.colors.primary, color: "#FFF"}}
                        onClick={() => redirectPay(code)}
                    >
                    ¡Únase! 
                    </Button>
                </CardActions>
            </Card>
        </CardContainer>
    )
}

export default SuscribePaymentCard;