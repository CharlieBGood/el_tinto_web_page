import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { FlexContainer } from "../../atoms";
import { SuscribePaymentCardProps } from "./types";
import { Button } from "react-bootstrap";
import THEME from '../../../utils/styledTheme';

const redirectPay = (code: string | undefined) => {
    window.location.href = `https://buy.stripe.com/${code}`
}

const SuscribePaymentCard: React.FC<SuscribePaymentCardProps> = ({name, price, code, recommended, country, benefits, windowWidth}) => {
    return(
        <FlexContainer
            direction="column"
            alignItems="center"
            style={{
                borderColor: THEME.colors.primary,
                backgroundColor: THEME.colors.primary, 
                borderStyle: recommended ? 'solid' : 'none', 
                borderRadius: '20px', 
                boxShadow: recommended ? 'none' : '0 0 2px 2px #ccc',
                margin: windowWidth < 768 ? '0 15%' : '0' 
            }}
        >
            {
                recommended && (
                    <Typography variant="subtitle2" style={{color: "#FFF", textAlign: "center", padding: '5px 10px', fontSize: '10px'}}>
                        <span style={{fontSize: '8px'}}>★</span> Recomendado por El Tinto <span style={{fontSize: '8px'}}>★</span>
                    </Typography>
                )
            }
            <Card 
                sx={{ 
                    borderRadius: '20px', 
                }}>
                <CardContent style={{padding: '0', position: "relative"}}>
                    <FlexContainer style={{alignItems: "center"}}>
                        <img
                            src="/images/taste_club/coffee_bean.png"
                            alt="prize"
                            style={{display: "block", width: '100%'}}
                        />
                        <Typography 
                            style={{
                                position: "absolute", 
                                color: "#FFF", 
                                fontSize: "24px", 
                                textAlign: "center", 
                                fontWeight: "700",
                                padding: "0 20px"
                            }}>
                            {name}
                        </Typography>
                    </FlexContainer>
                    <Typography style={{margin: "20px 0 0 0", fontSize: "30px", textAlign: "center"}}>
                        {price} <span style={{fontSize: "12px"}}>{country === 'CO' ? 'COP' : 'USD'}</span>
                    </Typography>
                    <ul style={{padding: '0 0 0 25px'}}>
                        {
                            benefits.map(benefit => (
                                <li style={{padding: '5px 5px 0 0'}}>
                                    <Typography variant="subtitle2" style={{color: "#000", fontSize: windowWidth < 768 ? '14px' : '12px', lineHeight: '1.2'}}>
                                        {benefit}
                                    </Typography>
                                </li>
                            ))
                        }
                    </ul>
                </CardContent>
                <CardActions>
                <Button 
                    variant="contained" type={'submit'}
                    style={{width: '75%', margin: '10px auto', backgroundColor: THEME.colors.primary, color: "#FFF"}}
                    onClick={() => redirectPay(code)}
                >
                   ¡Únase! 
                </Button>
                </CardActions>
            </Card>
        </FlexContainer>
    )
}

export default SuscribePaymentCard;