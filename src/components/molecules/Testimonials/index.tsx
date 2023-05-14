import { Link, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import Testimonial from "../../atoms/Testimonial";

const Testimonials = () => {

    const items = [
        {
            imageUrl: 'https://el-tinto-utils.s3.amazonaws.com/home/user_2.png',
            text: 'Me toma cinco minutos iniciar el día con los pies en la tierra. No me pierdo las conversaciones importantes desde que inicié a leer El Tinto',
            name: 'Natalia C., Bogotá, Estudiante de derecho'
        },
        {
            imageUrl: 'https://el-tinto-utils.s3.amazonaws.com/home/user_1.png',
            text: 'El Tinto me ayuda a mantenerme al día con los eventos más importantes de mi país. Realmente no tengo tiempo, así que es perfecto para mí.',
            name: 'Jesús P., Medellín, Desarrollador'
        },
        {
            imageUrl: 'https://el-tinto-utils.s3.amazonaws.com/home/user_3.png',
            text: 'El Tinto se ha convertido en parte de mi rutina mañanera. La sección "¿Qué estamos viendo?" ¡se ha vuelto verdaderamente esencial para mí!',
            name: 'Isabella E., Cali, Cineasta'
        }
    ]

    return (
        <>
            <Typography variant="h2">
                ¡Yo quiero una pruebita!
            </Typography>
            <Typography variant="subtitle1" style={{margin: '20px 0 0 0'}}>
                La mejor forma de disfrutar de nuestro producto es suscribiéndose a nuestro boletín 
                diario 👉🏻​<Link href="/suscribirse">aquí</Link>👈🏻​. No se lo recomendamos nosotros, se lo recomiendan nuestros usuarios.
            </Typography>
            <Carousel
                indicators={false}
                height="375px" 
                sx={{margin: "40px 0 auto", width: "100%"}}
            >
                {
                    items.map(
                        (item, i) => <Testimonial key={i} imageUlr={item.imageUrl} name={item.name} text={item.text}/>
                    )
                }
            </Carousel>
        </>
    )
}

export default Testimonials;