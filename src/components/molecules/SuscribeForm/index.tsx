import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { FlexContainer } from "../../atoms"
import styled from "styled-components";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import THEME from '../../../utils/styledTheme';
import HelpIcon from '@mui/icons-material/Help';
import { SuscribeProps } from "./types";
import { postRegister } from "../../../services";
import { Toaster, toast } from "react-hot-toast";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import ReactGA4 from "react-ga4";

const FormTextFieldElement = styled(TextFieldElement)`
    background-color: #FFFFFF;
    border-radius: 6px;
    width: 100%;
    div input {
        -webkit-text-fill-color: "rgba(0, 0, 0, 1)"
    }
`

const SuscribeFormContainer = styled(FlexContainer)`
    padding: 6%;
    width: 80%;
    margin: 0 auto;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`

const SuscribeForm = () => {

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

    
    const onSubmit = (data: SuscribeProps) => {
        postRegister(data)
        .then(response => {

            const params = new URLSearchParams(response.data);

            navigate({
                pathname: '/suscripcion-confirmada',
                search: `?${createSearchParams(params)}`
            })
        })
        .catch(error => toast.error(error.response.data.email[0]))

        ReactGA4.event({
            category: "User Creation",
            action: "Suscription",
            label: "suscription"
        });
    }

    return(
        <SuscribeFormContainer>
            <FormContainer onSuccess={onSubmit} defaultValues={{referral_code: searchParams.get('referral_code') || undefined}}>
                <FormTextFieldElement name="email" placeholder="tu@correo.com" required/>
                {
                    searchParams.get('referral_code') && (
                        <FlexContainer width='100%' margin='20px 0 0 0' direction="column">
                            <Typography variant="subtitle2" margin='20px 0 10px 0'>
                                Este es el código de quien te refirió 👀
                            </Typography>
                            <FormTextFieldElement
                                name="referral_code"
                                required={false}
                                disabled
                                variant="filled"
                                placeholder={searchParams.get('referral_code') || ''}
                            />
                        </FlexContainer>
                    )
                }
                <Typography variant="subtitle2" margin='20px 0 0 0'>
                    ¡Ayúdanos a llegar a tu correo!
                    {
                        windowWidth >= 768 && (
                            <Tooltip 
                                title="Personalizar el correo con tu nombre nos ayuda a evitar los filtros de spam 😉" 
                                placement="right"
                                arrow
                            >
                                <IconButton>
                                    <HelpIcon sx={{color: '#FFFFFF'}} />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                </Typography>
                <FlexContainer margin="5px 0 0 0" width='100%' direction={windowWidth > 768 ? 'row' : 'column'}>
                    <FormTextFieldElement 
                        name="first_name" 
                        placeholder="Nombre (opcional)" 
                        sx={{margin: windowWidth > 768 ? '0 20px 0 0' : '0 0 10px 0'}} 
                        required={false}
                        inputProps={{ maxLength: 25 }}
                    />
                    <FormTextFieldElement required={false} name="last_name" placeholder="Apellido (opcional)" />
                </FlexContainer>
                <Button 
                    variant="contained" type={'submit'}
                    style={{width: '100%', margin: '20px 0 0 0', backgroundColor: THEME.colors.buttonColor}}
                >
                   ¡Únete gratis! 
                </Button>
                <Typography variant="subtitle2" margin='10px 0 0 0'>
                    Únete a miles de personas que ya están tomando El Tinto.
                </Typography>
            </FormContainer>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </SuscribeFormContainer>
    )
}

export default SuscribeForm;