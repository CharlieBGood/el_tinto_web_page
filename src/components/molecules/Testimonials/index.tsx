import { Link, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import Testimonial from "../../atoms/Testimonial";

const Testimonials = () => {

    const items = [
        {
            imageUrl: '/images/home/user_karen.png',
            text: 'Además de ser una inspiración para productos rápidos, breves e inteligentes, El Tinto es súper entretenido.',
            name: 'Karen Tatiana Duque, periodista. Directora de Huevos Revueltos con Política de La Silla Vacía.'
        },
        {
            imageUrl: '/images/home/user_jesus.png',
            text: 'El Tinto me ayuda a mantenerme al día con los eventos más importantes de mi país. Realmente no tengo tiempo, así que es perfecto para mí.',
            name: 'Jesús Prada, desarrollador de Inteligencia Artificial.'
        },
        {
            imageUrl: '/images/home/user_natalia.png',
            text: 'Me toma cinco minutos iniciar el día con los pies en la tierra. No me pierdo las conversaciones importantes desde que inicié a leer El Tinto.',
            name: 'Natalia Chavarro, periodista. Productora de La No Ficción.'
        },
        {
            imageUrl: '/images/home/user_david.png',
            text: 'Es una gran herramienta para tener un panorama de lo que está pasando. Además, incluye una buena sección de recomendaciones del día.',
            name: 'David Trujillo, periodista. Productor de Radio Ambulante.'
        },
        {
            imageUrl: '/images/home/user_isabella.png',
            text: 'El Tinto se ha convertido en parte de mi rutina mañanera. ¡Sus recomendados se han vuelto verdaderamente esenciales para mí!',
            name: 'Natalia Espinosa, cineasta.'
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