import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { FlexContainer } from "../../atoms"
import styled from "styled-components";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import THEME from '../../../utils/styledTheme';
import HelpIcon from '@mui/icons-material/Help';
import { SuscribeFormProps, SuscribeProps } from "./types";
import { postRegister, postUserVisits } from "../../../services";
import { Toaster, toast } from "react-hot-toast";
import ReactGA4 from "react-ga4";

const FormTextFieldElement = styled(TextFieldElement)`
    background-color: #FFFFFF;
    border-radius: 6px;
    width: 100%;
    div input {
        -webkit-text-fill-color: "rgba(0, 0, 0, 1)"
    }
`

const SuscribeFormContainer = styled(FlexContainer)<{popUp: boolean}>`
    padding: ${props => props.popUp ? '10px 6% 6%' : '6%'};
    width: 100%;
    margin: 0 auto;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`

const SuscribeForm: React.FC<SuscribeFormProps> = ({navigateToSuscribeConfirmation, searchParams, popUp, handlePopUpClose}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const referralCodeParam = searchParams !== undefined ? searchParams.get('referral_code') : null;
    const utmSourceParam = searchParams !== undefined ? searchParams.get('utm_source') || '' : '';
    const mediumParam = searchParams !== undefined ? searchParams.get('medium') || '' : '';

    useEffect(() => {
        function handleWindowResize() {
            setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {

        if (referralCodeParam !== null){
            postUserVisits({
                user: referralCodeParam,
                type: "SP"
            })
        }
    }, [referralCodeParam]);

    
    const onSubmit = (data: SuscribeProps) => {
        postRegister(data)
        .then(response => {

            ReactGA4.event({
                category: "User Creation",
                action: "Suscription",
                label: "suscription"
            });

            if (navigateToSuscribeConfirmation !== undefined){
                const params = new URLSearchParams(response.data);
                navigateToSuscribeConfirmation(params);
            }

            if (handlePopUpClose !== undefined){
                handlePopUpClose(true)
            }

        })
        .catch(error => toast.error(error.response.data.email[0]))
    }

    return(
        <SuscribeFormContainer popUp={popUp}>
            <FormContainer 
                onSuccess={onSubmit} 
                defaultValues={{
                    referral_code: referralCodeParam, 
                    utm_source: utmSourceParam,
                    medium: mediumParam
                }}
            >
                <FormTextFieldElement name="email" placeholder="un@correo.com" required/>
                {
                    referralCodeParam && (
                        <FlexContainer width='100%' margin='20px 0 0 0' direction="column">
                            <Typography variant="subtitle2" margin='20px 0 10px 0'>
                                Este es el código de quien lo refirió 👀
                            </Typography>
                            <FormTextFieldElement
                                name="referral_code"
                                required={false}
                                disabled
                                variant="filled"
                                placeholder={referralCodeParam}
                            />
                        </FlexContainer>
                    )
                }

                {
                    !popUp && (
                        <>
                        <Typography variant="subtitle2" margin='20px 0 0 0'>
                            ¡Ayúdenos a llegar a su correo!
                            {
                                windowWidth >= 768 && (
                                    <Tooltip 
                                        title="Personalizar el correo con su nombre nos ayuda a evitar los filtros de spam 😉" 
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
                        </>
                    )
                }
                <FlexContainer width='100%' margin='20px 0 0 0' direction="column" style={{display: "none"}}>
                    <FormTextFieldElement
                        name="utm_source"
                        required={false}
                        disabled
                        variant="filled"
                        placeholder={utmSourceParam}
                    />
                </FlexContainer>
                <FlexContainer width='100%' margin='20px 0 0 0' direction="column" style={{display: "none"}}>
                    <FormTextFieldElement
                        name="medium"
                        required={false}
                        disabled
                        variant="filled"
                        placeholder={mediumParam}
                    />
                </FlexContainer>
                <Button 
                    variant="contained" type={'submit'}
                    style={{width: '100%', margin: '20px auto 0 auto', backgroundColor: THEME.colors.buttonColor}}
                >
                ¡Únase gratis! 
                </Button>
                {
                    !popUp && (
                        <Typography variant="subtitle2" margin='10px 0 0 0'>
                            Únase a miles de personas que ya están tomando El Tinto.
                        </Typography>
                    )
                }
            </FormContainer>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </SuscribeFormContainer>
    )
}

export default SuscribeForm;