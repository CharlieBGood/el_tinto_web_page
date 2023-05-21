import { Button, Typography } from "@mui/material";
import ContentContainer from "../../atoms/ContentContainer";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    const redirectToHome = () => {
        navigate('/el-tinto-de-hoy')
    }

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
                style={{padding: '15px', marginTop: '30px'}}
                variant="contained"
                onClick={redirectToHome}
            >
                El Tinto de hoy ☕
            </Button>
        </ContentContainer>
    )
}

export default NotFound;