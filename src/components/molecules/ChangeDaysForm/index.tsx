import styled from "styled-components";
import { FlexContainer } from "../../atoms";
import { Button, Typography } from "@mui/material";
import { FormContainer, SwitchElement, TextFieldElement } from "react-hook-form-mui";
import THEME from '../../../utils/styledTheme';
import { useEffect, useState } from "react";
import { ChangeDaysFormProps, ChangeDaysProps } from "./types";
import toast, { Toaster } from "react-hot-toast";
import { updatePreferredDays } from "../../../services";
import { useNavigate, useSearchParams } from "react-router-dom";


const SuscribeFormContainer = styled(FlexContainer)`
    padding: 6%;
    width: 80%;
    margin: 0 auto;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`


const ChangeDaysForm: React.FC<ChangeDaysFormProps> = ({setPageState}) => {

    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [searchParams] = useSearchParams();

    useEffect(() => {
        function handleWindowResize() {
            setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const WeekDays = [
        {
            label: "Lunes",
            name: "monday"
        },
        {
            label: "Martes",
            name: "tuesday"
        },
        {
            label: "Miércoles",
            name: "wednesday"
        },
        {
            label: "Jueves",
            name: "thursday"
        },
        {
            label: "Viernes",
            name: "friday"
        },
        {
            label: "Sábado",
            name: "saturday"
        },
        {
            label: "Domingo",
            name: "sunday"
        }
    ]

    const onClick = () => {
        navigate({
            pathname: '/desuscribirse/adios',
            search: `?user_name=${searchParams.get('user_name')}&user=${searchParams.get('user')}`
        })
    }

    const onSubmit = (data: ChangeDaysProps) => {

        if(
            [data.monday, data.tuesday, data.wednesday, data.thursday, data.friday, data.saturday, data.sunday].every((val) => val === false)
        ){
            toast.error("Debes seleccionar al menos un día.")
            return;
        }

        if (data.uuid === ''){
            toast.error("El usuario no existe.")
            return;
        }

        updatePreferredDays(data)
        .then(() => {

            if (setPageState !== undefined){
                setPageState(2);
            }
        })
    }

    return(
        <SuscribeFormContainer direction="column">
            <Typography marginBottom="10px" variant="body2" fontWeight="700" sx={{color: "#FFF !important"}}>
                ¡Personaliza tu frecuencia!
            </Typography>
            <FormContainer
                defaultValues={{
                    monday: true, 
                    tuesday: true, 
                    wednesday: true, 
                    thursday: true, 
                    friday: true, 
                    saturday: true, 
                    sunday: true,
                    uuid: searchParams.get('user') || ''
                }}
                onSuccess={data => onSubmit(data)}
            >
                {
                    WeekDays.map(day => (
                        <SwitchElement
                            label={day.label}
                            name={day.name}
                            sx={{width: '100%'}}
                        />
                    ))
                }
                <TextFieldElement
                    name="uuid"
                    disabled
                    variant="filled"
                    sx={{display: 'none'}}
                />
                <FlexContainer margin="5px 0 0 0" width='100%' direction={windowWidth > 768 ? 'row' : 'column'}>
                    <Button 
                        variant="contained" type={'submit'}
                        style={{
                            width: '100%', 
                            margin: windowWidth > 768 ? '20px 20px 0 0' : '20px 0 10px 0', 
                            backgroundColor: THEME.colors.buttonColor
                        }}
                    >
                        Solicitar actualización 
                    </Button>
                    <Button 
                        variant="contained"
                        onClick={onClick}
                        style={{
                            width: '100%', 
                            margin: windowWidth > 768 ? '20px 0 0 0' : '10px 0 0 0', 
                            backgroundColor: THEME.colors.buttonColor
                        }}
                    >
                        Desuscribirme 🥺
                    </Button>
                </FlexContainer>
            </FormContainer>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </SuscribeFormContainer>
    )
}

export default ChangeDaysForm;