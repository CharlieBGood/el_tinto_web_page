import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FlexContainer } from "../../atoms";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import ContentContainer from "../../atoms/ContentContainer";
import { getMyTasteClub, patchMyTasteClubActions } from "../../../services";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import THEME from '../../../utils/styledTheme'
import { FormContainer, SelectElement, TextFieldElement, TimePickerElement } from "react-hook-form-mui";
import styled from "styled-components";
import { ParamType } from "../../../services/types";
import DateFnsProvider from "../../atoms/DateFnsProvider";
import timezones from 'timezones-list';
import Breaker from "../../atoms/Breaker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";


const FormTextFieldElement = styled(TextFieldElement)`
    background-color: #FFFFFF;
    border-radius: 6px;
    width: 50%;
    div input {
        -webkit-text-fill-color: "rgba(0, 0, 0, 1)"
    }
`

const ShareContainer = styled(FlexContainer)`
    padding: 3% 25%;
    @media only screen and (max-width: 768px) {
        padding: 5% 10%;
    }
`

const tiers = [
    {
        tier: 1,
        name: 'Semilla de café',
        image: '/images/taste_club/coffee_bean.png'
    },
    {
        tier: 2,
        name: 'Café molido',
        image: '/images/taste_club/coffee_seed.png'
    },
    {
        tier: 3,
        name: 'Un tinto',
        image: '/images/taste_club/coffee.png'
    },
    {
        tier: 4,
        name: 'Café de exportación',
        image: '/images/taste_club/exportation_coffee.png'
    }
]


const MyTasteClub = () => {

    let { uuid } = useParams();

    const [showSpinner, setShowSpinner] = useState<boolean>(true)
    const [myTasteClubInfo, setMyTestClubInfo] = useState<any>({})
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        
        if (uuid !== undefined){
            getMyTasteClub(uuid)
            .then(response => {
                setShowSpinner(false);
                setMyTestClubInfo(response.data);
            })
        }

        function handleWindowResize() {
            setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };

    }, [])

    const addUser = (data: ParamType) => {
        patchMyTasteClubActions(myTasteClubInfo.id, 'add_user', data)
        .then(response => {toast.success('Usuario agregado exitosamente', {duration: 5000}); setMyTestClubInfo(response.data)})
    }

    const removeUser = (data: ParamType) => {
        patchMyTasteClubActions(myTasteClubInfo.id, 'remove_user', data)
        .then(response => {toast.success('Usuario removido exitosamente', {duration: 5000}); setMyTestClubInfo(response.data)})
    }

    const updateDispatchTime = (data: ParamType) => {
        if (data.dispatch_time instanceof Date){
            const time = `${data.dispatch_time.getHours()}:${data.dispatch_time.getMinutes()}:00`
            data.dispatch_time = time
        }
        patchMyTasteClubActions(myTasteClubInfo.id, 'change_dispatch_time', data)
        .then(response => {toast.success('Hora actualizada exitosamente', {duration: 5000}); setMyTestClubInfo(response.data)})
    }

    const unsuscribe = () => {
        patchMyTasteClubActions(myTasteClubInfo.id, 'unsuscribe', {})
        .then(response => {toast.success('Se ha desuscrito exitosamente, no se generarán más cargos a su cuenta.', {duration: 5000}); setMyTestClubInfo(response.data)})

        setOpen(false)
    }

    const calculateDispatchTime = () => {
        const date = new Date()
        const time_values = myTasteClubInfo.dispatch_time.split(':')
        date.setHours(parseInt(time_values[0]))
        date.setMinutes(parseInt(time_values[1]))

        return date
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const Spinner = () => {
        return(
            <FlexContainer height="70vh" margin="0 auto">
                <CircularProgress sx={{margin: "auto 0"}} />
            </FlexContainer>
        )
    }

    const MyTasteClubInfo = () => (
        <>
        <ContentContainer>
            <Typography variant="h2">
                ¡Hola {myTasteClubInfo.user_name}!
            </Typography>
            {
                tiers.filter(tier => tier.tier === myTasteClubInfo.tier).map(tier => (
                    
                    windowWidth < 960 ? (
                        <FlexContainer 
                            direction="column"
                            alignItems="center"
                            padding="20px"
                            margin="20px auto" 
                            borderRadius="12px"
                            style={{backgroundImage: `url(${tier.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}
                        >
                            <Typography color="#FFF" variant="h2" textAlign="center">
                                {tier.name}
                            </Typography>
                            <Typography variant="caption" textAlign="center" margin="0 auto" color="#FFF">
                                {
                                    myTasteClubInfo.will_renew ? 'Se renovará ' : 'Vencerá '
                                }
                                el <strong>{myTasteClubInfo.valid_to}</strong>
                                {
                                    myTasteClubInfo.plan_owner && (
                                        <>
                                            <br></br>
                                            Este plan es auspiciado por <strong>{myTasteClubInfo.plan_owner}</strong>
                                        </>
                                    )
                                }
                            </Typography>
                        </FlexContainer>
                    ) : (
                        <FlexContainer width="100%" alignItems="center">
                            <FlexContainer 
                                direction="column"
                                alignItems="center"
                                width="50%"
                                padding="20px"
                                margin="20px auto" 
                                borderRadius="12px"
                                style={{backgroundImage: `url(${tier.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "center"}}
                            >
                                <Typography variant="h2" color="#FFF" textAlign="center">
                                    {tier.name}
                                </Typography>
                                {
                                    myTasteClubInfo.plan_owner && (
                                        <Typography variant="caption" color="#FFF" textAlign="center">
                                            Este plan es auspiciado por <strong>{myTasteClubInfo.plan_owner}</strong>
                                        </Typography>
                                    )
                                }
                            </FlexContainer>
                            <Typography width="50%" textAlign="center">
                                Su plan {myTasteClubInfo.will_renew ? 'se renovará ' : 'vencerá '} el
                                <br></br>
                                <strong>{myTasteClubInfo.valid_to}</strong>
                            </Typography>
                        </FlexContainer>
                        
                    )

                ))
            }
            {
                myTasteClubInfo.is_main_account && (
                    <>
                        {
                            myTasteClubInfo.beneficiaries.length > 0 && (
                                <Typography variant="body1" style={{fontWeight: '700', marginBottom: '30px'}}>
                                    Personas en este plan:
                                </Typography>
                            )
                        }
                        {myTasteClubInfo.beneficiaries.filter((beneficiarie: string | null) => beneficiarie !== null).map((beneficiarie: string) => (
                            <FlexContainer margin="0 0 30px 0">
                                <AccountCircleRoundedIcon style={{fill: THEME.colors.primary, fontSize: '75px'}} />
                                <FlexContainer direction="column" margin="auto 0 auto 10px">
                                    <Typography fontWeight="700">
                                        {beneficiarie}
                                        <RemoveCircleOutlineIcon 
                                            style={{fill: "#FF0000", marginLeft: '10px', cursor: "pointer"}} 
                                            onClick={() => removeUser({email: beneficiarie})}
                                        />
                                    </Typography>
                                    <Typography>
                                        Miembro activo
                                    </Typography>
                                </FlexContainer>
                            </FlexContainer>
                        ))}
                        {
                            myTasteClubInfo.available_beneficiaries_places > 0 && (
                                <>
                                    <Typography variant="body1" style={{marginBottom: '10px'}}>
                                        Gracias a los beneficios de su plan  
                                        puede <strong>invitar hasta {myTasteClubInfo.available_beneficiaries_places} {myTasteClubInfo.available_beneficiaries_places === 1 ? 'persona' : 'personas'}</strong> más 
                                        a que compartan sus beneficios <strong>completamente gratis</strong>. Si no están suscritos a El Tinto no se preocupe, los invitamos por usted.
                                    </Typography>
                                    <FlexContainer 
                                        backgroundColor={THEME.colors.primary}
                                        borderRadius="12px"
                                        width="100%"
                                        margin="10px 0 20px 0"
                                        padding={windowWidth < 768 ? "6%" : "3%"}
                                    >
                                        <FormContainer
                                            onSuccess={data => addUser(data)}
                                        >
                                            <FlexContainer 
                                                alignItems="center"
                                                direction={windowWidth < 768 ? "column" : "row"}
                                            >
                                                <FormTextFieldElement 
                                                    name="email" 
                                                    placeholder="un@correo.com" 
                                                    required
                                                    style={{width: windowWidth < 768 ? "100%" : "80%"}}
                                                />
                                                <Button 
                                                    variant="contained" type={'submit'}
                                                    style={{
                                                        backgroundColor: THEME.colors.buttonColor, 
                                                        margin: windowWidth < 768 ? "20px 0 0" : "0 0 0 20px"
                                                    }}
                                                >
                                                ¡Invitar! 
                                                </Button>
                                            </FlexContainer>
                                        </FormContainer>
                                    </FlexContainer>
                                </>
                            )
                        }
                        {
                            myTasteClubInfo.beneficiaries.length > 0 && (
                                <Typography variant="body1">
                                    Si alguno de sus invitados ya no comparte con usted nuestro sabor siempre puede retirarlo 
                                    de su plan haciendo click en el ícono al lado de su correo.
                                </Typography>
                            )
                        }
                    </>
                )
            }
        </ContentContainer>
        {
            myTasteClubInfo.tier > 3 && (
                <ShareContainer
                    direction="column"
                    width="100%" 
                    backgroundColor="#f8f4f4" 
                    borderRadius="0"
                    boxShadow="rgba(0, 0, 0, 0.1) 0px -12px 10px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
                >
                    <Typography variant="body1">
                        Gracias a su suscripción puede configurar la hora en que desea recibir los Tintos diarios aquí:
                    </Typography>
                    <FlexContainer 
                        backgroundColor={THEME.colors.primary}
                        borderRadius="12px"
                        width="100%"
                        margin="10px 0 20px 0"
                        padding={windowWidth < 768 ? "6%" : "3%"}
                    >
                        <DateFnsProvider>
                            <FormContainer
                                onSuccess={data => updateDispatchTime(data)}
                                defaultValues={{
                                    dispatch_time: myTasteClubInfo.dispatch_time !== null ? calculateDispatchTime(): null,
                                    tzinfo: myTasteClubInfo.timezone !== '' ? myTasteClubInfo.timezone : 'America/Bogota'
                                }}
                            >
                                <FlexContainer
                                    direction="column"
                                    alignItems="center"
                                >
                                    <FlexContainer 
                                        width="100%"
                                        direction={windowWidth < 768 ? "column" : "row"}
                                    >
                                        <TimePickerElement 
                                            name="dispatch_time"
                                            views={['hours', 'minutes']}
                                            required
                                            viewRenderers={{
                                                hours: renderTimeViewClock,
                                                minutes: renderTimeViewClock,
                                                seconds: renderTimeViewClock,
                                              }}
                                            sx={{
                                                width: windowWidth < 768 ? "100%" : "50%",
                                                backgroundColor: "#FFF",
                                                borderRadius: '12px',
                                                border: 'none',
                                            }}
                                        />
                                        <SelectElement
                                            name="tzinfo"
                                            valueKey="tzCode"
                                            options={timezones}
                                            required
                                            sx={{
                                                width: windowWidth < 768 ? "100%" : "50%",
                                                backgroundColor: "#FFF",
                                                borderRadius: '12px',
                                                border: 'none',
                                                margin: windowWidth < 768 ? "20px 0 0 0%" : "0 0 0 10px",
                                                font: 'inherit'
                                            }}
                                        />
                                    </FlexContainer>
                                    <Button 
                                        variant="contained" type={'submit'}
                                        style={{
                                            backgroundColor: THEME.colors.buttonColor, 
                                            margin: windowWidth < 768 ? "20px 0 0" : "20px auto 0 auto",
                                        }}
                                    >
                                    ¡Programar! 
                                    </Button>
                                </FlexContainer>
                            </FormContainer>
                        </DateFnsProvider>
                    </FlexContainer>
                </ShareContainer>
            )
        }
        {
            myTasteClubInfo.tier < 4 && (
                <Breaker />
            )
        }
        <ShareContainer
            direction="column"
            width="100%"
            borderRadius="0"
            margin="10px 0"
        >
            <Typography variant="body1">
                Recuerde que puede cancelar su suscripción al Club de Cata en cualquier momento.
            </Typography>
            <Button 
                variant="contained" 
                sx={{margin: "20px auto 0 auto", padding: "10px"}}
                onClick={handleClickOpen}
            >
                Cancelar suscripción 😔
            </Button>
        </ShareContainer>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Typography>
                    Lamentamos mucho que no te hayas encariñado con nuestro sabor, haremos todo lo posible por mejorar. 
                    Pero siempre recuerda que puedes suscribirte de nuevo.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={unsuscribe}>Desuscribirme</Button>
            </DialogActions>
        </Dialog>
        </>
    )

    return(
        <>
            {
                showSpinner ? (
                    <Spinner />
                ) : (
                    <MyTasteClubInfo />
                )
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}

export default MyTasteClub;