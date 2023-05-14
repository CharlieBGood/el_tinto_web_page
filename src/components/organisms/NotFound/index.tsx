import { Typography } from "@mui/material";
import ContentContainer from "../../atoms/ContentContainer";
import { Button } from "react-bootstrap";
import THEME from '../../../utils/styledTheme';

const NotFound = () => {
    return(
        <ContentContainer alignItems="center">
            <Typography variant="h2" textAlign="center">
                404 Not Found
            </Typography>
            <Typography variant="body1" fontWeight="700" textAlign="center" style={{marginTop: '40px'}}>
                Creemos que confundiste El Tinto con la aromática 😅
            </Typography>
            <img 
                src="https://media.tenor.com/hCS1ly00EYoAAAAC/espresso-classy.gif" 
                alt="sorbito"
                style={{width: '80%', margin: "5% 0"}}
            /> 
            <Typography variant="body1" textAlign="center">
                No te preocupes, nos pasa a todos. Para que te recargues de vuelta con nuestro 
                sabor y te acabes de despertar hoy, síguenos leyendo de nuevo aquí 👇🏻
            </Typography>
            <Button 
                variant="contained"
                style={{margin: '20px 0 0 0', backgroundColor: THEME.colors.buttonColor, color: "#FFFFFF"}}
            >
                El Tinto de hoy ☕
            </Button>
        </ContentContainer>
    )
}

export default NotFound;