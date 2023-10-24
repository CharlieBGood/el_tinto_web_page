import styled from "styled-components";
import { FlexContainer } from "../../atoms";
import { CheckboxElement, FormContainer, TextFieldElement, TextareaAutosizeElement } from "react-hook-form-mui";
import { Button, Typography } from "@mui/material";
import THEME from '../../../utils/styledTheme';
import { UnsuscribeProps } from "./types";
import { deleteRegister } from "../../../services";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SuscribeFormContainer = styled(FlexContainer)`
    padding: 6%;
    width: 80%;
    margin: 0 auto;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`

const UnsuscribeForm = () => {

    const [searchParams] = useSearchParams();

    const delay = (ms:number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const Reasons = [
        {
            label: "El contenido está muy aburrido",
            name: "boring"
        },
        {
            label: "Los correos son demasiado invasivos",
            name: "invasive"
        },
        {
            label: "No hay suficiente variedad de temas",
            name: "variety"
        },
        {
            label: "Ya no uso este correo",
            name: "not_used"
        },
        {
            label: "Ya los sigo en otro correo",
            name: "other_email"
        }
    ]

    const onSubmit = (data:UnsuscribeProps) => {
        deleteRegister(data)
        .then(async () => {
            toast.error('Has eliminado tu suscripción.')
            await delay(3000);
            window.location.replace('/')
        })
    }

    return(
        <SuscribeFormContainer>
            <FormContainer 
                onSuccess={data => onSubmit(data)}
                defaultValues={{
                    boring: false,
                    invasive: false,
                    variety: false,
                    not_used: false,
                    other_email: false,
                    recommendation: "",
                    uuid: searchParams.get('user') || ''
                }}
            >
                <Typography marginBottom="10px" variant="body2" fontWeight="700" sx={{color: "#FFF !important"}}>
                    Cuéntanos por qué nos enfriamos
                </Typography>
                <TextFieldElement
                    name="uuid"
                    disabled
                    variant="filled"
                    sx={{display: 'none'}}
                />
                {
                    Reasons.map(reason => (
                        <FlexContainer width="100%">
                            <CheckboxElement
                                label={reason.label}
                                name={reason.name}
                            />
                        </FlexContainer>
                    ))
                }
                <Typography marginBottom="10px" marginTop="20px" variant="body2" fontWeight="700" sx={{color: "#FFF !important"}}>
                    ¿Alguna recomendación para mejorar nuestro sabor?
                </Typography>
                <TextareaAutosizeElement
                    style={{width: '100%', backgroundColor: "#FFF"}}
                    name="recommendation"
                    resizeStyle="none"
                    rows={2}
                />
                <Typography variant="body2" style={{margin: '20px 0 10px 0'}}>
                    Cuando sientas que todo va muy rápido y el día a día no te permite estar informado con las historias más importantes 
                    de las fuentes más confiables, <span style={{color: "#FFF", fontWeight: "700"}}>siempre puedes suscribirte de nuevo. </span>
                    ¡Te estaremos esperando!
                </Typography>
                <Button 
                    variant="contained" type={'submit'}
                    style={{
                        width: '100%', 
                        margin: '20px 0 0 0',
                        backgroundColor: THEME.colors.buttonColor
                    }}
                >
                    Desuscribirme 🥺
                </Button>
            </FormContainer>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </SuscribeFormContainer>
    )
}

export default UnsuscribeForm;