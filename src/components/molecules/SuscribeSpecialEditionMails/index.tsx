import { Card, CardContent, Typography } from "@mui/material";
import { FlexContainer } from "../../atoms";
import { SuscribeSpecialEditionMailsProps } from "./types";
import THEME from '../../../utils/styledTheme';


const SuscribeSpecialEditionMails: React.FC<SuscribeSpecialEditionMailsProps> = ({name, benefits, windowWidth}) => {
    return(
        <FlexContainer
            direction="column"
            alignItems="center"
            margin="0 10px"
            style={{
                borderColor: THEME.colors.primary,
                backgroundColor: THEME.colors.primary,  
                borderRadius: '20px',
            }}
        >
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
                    <FlexContainer direction="column" padding="10px" width="100%">
                        {
                            benefits.map(benefit => (
                                <Typography variant="subtitle2" style={{color: "#000", fontSize: windowWidth < 768 ? '8px' : '12px', lineHeight: '1.2'}}>
                                    {benefit}
                                </Typography>
                            ))
                        }
                    </FlexContainer>
                </CardContent>
            </Card>
        </FlexContainer>
    )
}

export default SuscribeSpecialEditionMails;