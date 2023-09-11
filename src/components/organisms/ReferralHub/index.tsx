import { Button, Card, CardContent, CardMedia, CircularProgress, Link, TextField, Typography } from "@mui/material";
import { FlexContainer } from "../../atoms";
import ContentContainer from "../../atoms/ContentContainer";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReferralHub, postMilestoneEmail, postUserButtonInteraction } from "../../../services";
import styled from "styled-components";
import THEME from '../../../utils/styledTheme';
import { FileCopySharp } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";


const ReferralHubInfoContainer = styled(FlexContainer)`
    width: 100%;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`

const BookmarkRibbon = styled.div`
    width: 100%;
    margin: 20px 0;
    background: linear-gradient(90deg, rgba(255,255,255,1) 11%, rgba(32,44,84,1) 12%);
    clip-path: polygon(0% 0%, 100% 0%, calc(100% - 20px) 50%, 100% 100%, 0% 100%);
`

const RibbonTypography = styled(Typography)`
    font-size: 24px !important;
    color: #FFF;
    padding-left: 20px;
    @media only screen and (max-width: 768px) {
        font-size: 14px !important;
        padding-left: 5px;
    }
`

const MilestoneTitleTypography = styled(Typography)`
    font-size: 16px !important;
    text-align: center;
    @media only screen and (max-width: 768px) {
        font-size: 9px !important;
    }
`

const MilestoneClaimTypography = styled(Typography)`
    font-size: 20px !important;
    text-align: center;
    @media only screen and (max-width: 768px) {
        font-size: 12px !important;
    }
`

const MilestoneNumberTypography = styled(Typography)`
    font-size: 24px !important;
    text-align: center;
    font-weight: 700 !important;
    @media only screen and (max-width: 768px) {
        font-size: 16px !important;
    }
`

const MilestoneDescriptionContainer = styled(CardContent)`
    padding: 0 20% !important;
    @media only screen and (max-width: 768px) {
        padding: 0 !important;
    }
`

const ShareContainer = styled(FlexContainer)`
    padding: 3% 25%;
    @media only screen and (max-width: 768px) {
        padding: 5% 10%;
    }
`

const ReferralHub = () => {

    const [searchParams] = useSearchParams();
    const [referralHubInfo, setReferralHubInfo] = useState<any>({})
    const [showSpinner, setShowSpinner] = useState<boolean>(true)

    useEffect(() => {

        const uuid = decodeURIComponent(searchParams.get('user') || '');

        getReferralHub({uuid: uuid})
        .then(response => {
            setReferralHubInfo(response.data)
            setShowSpinner(false);
        })
        .catch(() => {
            toast.error('El usuario ingresado no existe.')
        })

    }, [])

    const copyLink = () => {
        navigator.clipboard.writeText(`https://${referralHubInfo.env}eltinto.xyz/suscribirse/?referral_code=${referralHubInfo.referral_code}`);
        toast.success('¡Has copiado tu link!')

        buttonInteraction('CP')
    }

    const sendMilestoneEmail = (milestone: number) => {

        const uuid = decodeURIComponent(searchParams.get('user') || '');

        postMilestoneEmail({milestone: milestone, uuid: uuid})
        .then(response => {
            setReferralHubInfo(response.data)
            toast.success(
                '¡Has reclamado tu premio!\nRevisa tu correo', 
                {duration: 5000, style: {textAlign: "center"}}
            )
        })
        .catch(() => toast.error('Ha ocurrido un error, por favor contacta a soporte.'))
    }

    const buttonInteraction = (type: string) => {
        postUserButtonInteraction({
            visit: searchParams.get('user_visit') || 0,
            type: type,
            medium: "referral"
        })
    }

    const milestonesInfoFirstRow = [
        {
            name: "Stickers de whatsapp", 
            url: "/images/referral_hub/prize_1_stickers.png",
            referred_users: 1
        },
        {
            name: "Tinto Dominguero", 
            url: "/images/referral_hub/prize_2_dominguero.png",
            referred_users: 3
        },
        {
            name: "La Cafeteria (Comunidad)", 
            url: "/images/referral_hub/prize_3_community.png",
            referred_users: 5
        },
        {
            name: "Charlas con El Tinto", 
            url: "/images/referral_hub/prize_4_talks.png",
            referred_users: 10
        }
    ]
    const milestonesInfoSecondRow = [
        {
            name: "Mug", 
            url: "/images/referral_hub/prize_5_mug.png",
            referred_users: 17
        },
        {
            name: "Gorra", 
            url: "/images/referral_hub/prize_6_hat.png",
            referred_users: 25
        },
        {
            name: "Café", 
            url: "/images/referral_hub/prize_7_coffee.png",
            referred_users: 50
        }
    ]

    const ribbonImageUrl = () => {
        if (referralHubInfo.referral_count < 1){
            return '/images/referral_hub/referred_none.png'
        }
        else if (referralHubInfo.referral_percentage <= 1){
            return '/images/referral_hub/referred_gold.png'
        }
        else if (referralHubInfo.referral_percentage <= 10){
            return '/images/referral_hub/referred_silver.png'
        }
        else if (referralHubInfo.referral_percentage <= 20){
            return '/images/referral_hub/referred_bronze.png'
        }
        else {
            return '/images/referral_hub/referred_others.png'
        }
    }

    const ribbonString = () => {
        if (referralHubInfo.referral_count === 0){
            return (
                <RibbonTypography width="70%">
                    Refiere a una persona para entrar en el ranking.
                </RibbonTypography>
            )
        }
        else if (referralHubInfo.referral_race_position === 1){
            return (
                <RibbonTypography width="70%">
                    Eres el <strong>usuario #1</strong> que más ha recomendado El Tinto.
                </RibbonTypography>
            )
        }
        else if (referralHubInfo.referral_race_position === 2){
            return (
                <RibbonTypography width="70%">
                    Eres el <strong>usuario #2</strong> que más ha recomendado El Tinto.
                </RibbonTypography>
            )
        }
        else if (referralHubInfo.referral_race_position === 3){
            return (
                <RibbonTypography width="70%">
                    Eres el <strong>usuario #3</strong> que más ha recomendado El Tinto.
                </RibbonTypography>
            )
        }
        else {
            return (
                <RibbonTypography width="70%">
                    Eres parte del <strong>{referralHubInfo.referral_percentage}% de usuarios</strong> que más recomienda El Tinto.
                </RibbonTypography>
            )
        }
    }

    const Spinner = () => {
        return(
            <FlexContainer height="70vh" width="100%">
                <CircularProgress sx={{margin: "auto"}} />
            </FlexContainer>
        )
    }

    const ReferralHubInfo = () => {
        return(
            <>
                <ContentContainer>
                    <ReferralHubInfoContainer direction="column">
                        <Typography variant="h2">
                            ¡Hola {referralHubInfo.user_name}!
                        </Typography>
                        <BookmarkRibbon>
                            <FlexContainer width="100%" alignItems="center">
                                <img 
                                    src={ribbonImageUrl()}
                                    alt='ribbon_image' 
                                    style={{width: '25%'}}
                                />
                                {ribbonString()}
                            </FlexContainer>
                        </BookmarkRibbon>
                        <Typography variant="body1">
                            Estás a solamente ({referralHubInfo.missing_referred_users_for_next_prize}) 
                            referidos de conseguir {referralHubInfo.pre_prize_string} <strong>{referralHubInfo.prize_description}</strong>.
                        </Typography>
                        <Typography variant="body1" style={{fontWeight: '700', margin: "20px 0"}}>
                            Tu número de referidos: {referralHubInfo.referral_count}
                        </Typography>
                        <FlexContainer width="100%">
                            {
                                milestonesInfoFirstRow.map(milestone => (
                                    <Card sx={{ 
                                            width: '25%', 
                                            border: referralHubInfo.milestone_status !== undefined && referralHubInfo.milestone_status[milestone.referred_users].claimed === true ? `2px solid ${THEME.colors.secondary}` : `2px solid ${THEME.colors.primary}` , 
                                            margin: "0 3px", 
                                            position: "relative" 
                                        }}>
                                        <FlexContainer 
                                            height="100%"
                                            width="100%"
                                            direction="column" 
                                            alignItems="center"
                                            onClick={() => sendMilestoneEmail(milestone.referred_users)}
                                            style={{
                                                zIndex: referralHubInfo.milestone_status !== undefined && referralHubInfo.milestone_status[milestone.referred_users].obtained === true && referralHubInfo.milestone_status[milestone.referred_users].claimed === false ? 10 : -1, 
                                                backgroundColor: THEME.colors.primary,
                                                opacity: 0.7, 
                                                position: "absolute",
                                                cursor: "pointer"
                                            }}
                                        >
                                            <MilestoneClaimTypography style={{color: "#FFF", margin: "auto 0", fontWeight: "700"}}>
                                                Reclamar
                                            </MilestoneClaimTypography>
                                        </FlexContainer>
                                        <FlexContainer direction="column">
                                            <CardMedia
                                                component="img"
                                                image={milestone.url}
                                                alt="prize"
                                                style={{padding: "0 10%"}}
                                            />
                                            <MilestoneDescriptionContainer>
                                                <MilestoneTitleTypography>
                                                    {milestone.name}
                                                </MilestoneTitleTypography>
                                                <MilestoneNumberTypography>
                                                    {milestone.referred_users}
                                                </MilestoneNumberTypography>
                                            </MilestoneDescriptionContainer>
                                        </FlexContainer>
                                    </Card>
                                ))
                            }
                        </FlexContainer>
                        <FlexContainer width="100%" margin="10px auto" justify="center">
                            {
                                milestonesInfoSecondRow.map(milestone => (
                                    <Card sx={{ 
                                        width: '25%', 
                                        border: referralHubInfo.milestone_status !== undefined && referralHubInfo.milestone_status[milestone.referred_users].claimed === true ? `2px solid ${THEME.colors.secondary}` : `2px solid ${THEME.colors.primary}` , 
                                        margin: "0 3px", position: "relative" 
                                    }}>
                                    <FlexContainer 
                                        height="100%"
                                        width="100%"
                                        direction="column" 
                                        alignItems="center"
                                        onClick={() => sendMilestoneEmail(milestone.referred_users)}
                                        style={{
                                            zIndex: referralHubInfo.milestone_status !== undefined && referralHubInfo.milestone_status[milestone.referred_users].obtained === true && referralHubInfo.milestone_status[milestone.referred_users].claimed === false ? 10 : -1, 
                                            backgroundColor: THEME.colors.primary,
                                            opacity: 0.7, 
                                            position: "absolute",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <MilestoneClaimTypography style={{color: "#FFF", margin: "auto 0", fontWeight: "700"}}>
                                            Reclamar
                                        </MilestoneClaimTypography>
                                    </FlexContainer>
                                    <FlexContainer direction="column" alignItems="center">
                                        <CardMedia
                                            component="img"
                                            image={milestone.url}
                                            alt="prize"
                                            style={{padding: "0 10%"}}
                                        />
                                        <MilestoneDescriptionContainer>
                                            <MilestoneTitleTypography>
                                                {milestone.name}
                                            </MilestoneTitleTypography>
                                            <MilestoneNumberTypography>
                                                {milestone.referred_users}
                                            </MilestoneNumberTypography>
                                        </MilestoneDescriptionContainer>
                                    </FlexContainer>
                                </Card>
                                ))
                            }
                        </FlexContainer>
                    </ReferralHubInfoContainer>
                </ContentContainer>
                <ShareContainer
                    direction="column"
                    width="100%" 
                    backgroundColor="#f8f4f4" 
                    borderRadius="0"
                    boxShadow="rgba(0, 0, 0, 0.1) 0px -12px 10px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
                >
                    <Typography variant="body1" style={{fontWeight: '700'}}>
                        Comparte tu link por redes
                    </Typography>
                    <Typography variant="body1">
                        Haz click en los botones de redes para compartir tu link personalizado
                    </Typography>
                    <FlexContainer width="100%">
                        <img
                          src="https://el-tinto-utils.s3.amazonaws.com/share_individual_news/ALPHA_MENU_BG_SHARE.png"
                          style={{width: "12%", maxWidth:"75px"}}
                          alt="share"
                        />
                        <Link 
                            href={`https://api.whatsapp.com/send?text=${referralHubInfo.invite_users_message}https://${referralHubInfo.env}eltinto.xyz/?referral_code=${referralHubInfo.referral_code}%26utm_source=whatsapp%26medium=referral`}
                            style={{width: "12%", maxWidth:"75px"}}
                            onClick={() => buttonInteraction('WP')}
                        >
                            <img
                            src="https://el-tinto-utils.s3.amazonaws.com/share_individual_news/ALPHA_MENU_BG_WA.png"
                            style={{width: "100%"}}
                            alt="share"
                            />  
                        </Link>
                        <Link 
                            href={`https://www.facebook.com/sharer/sharer.php?u=https://${referralHubInfo.env}eltinto.xyz/?referral_code=${referralHubInfo.referral_code}%26utm_source=facebook%26medium=referral`}
                            style={{width: "12%", maxWidth:"75px"}}
                            onClick={() => buttonInteraction('FB')}
                            
                        >
                            <img
                            src="https://el-tinto-utils.s3.amazonaws.com/share_individual_news/ALPHA_MENU_BG_FB.png"
                            style={{width: "100%"}}
                            alt="share"
                            />  
                        </Link>
                        <Link 
                            href={`https://twitter.com/intent/tweet?text=${referralHubInfo.invite_users_message}https://${referralHubInfo.env}eltinto.xyz/?referral_code=${referralHubInfo.referral_code}%26utm_source=twitter%26medium=referral`}
                            style={{width: "12%", maxWidth:"75px"}}
                            onClick={() => buttonInteraction('TW')}
                        >
                            <img
                            src="https://el-tinto-utils.s3.amazonaws.com/share_individual_news/ALPHA_MENU_BG_TW.png"
                            style={{width: "100%"}}
                            alt="share"
                            />  
                        </Link>
                    </FlexContainer>
                </ShareContainer>
                <ShareContainer
                    direction="column"
                    width="100%"
                    borderRadius="0"
                    margin="10px 0"
                >
                    <Typography variant="body1" style={{fontWeight: '700'}}>
                        O copia y pega tu link personalizado
                    </Typography>
                    <TextField 
                        variant="filled" 
                        disabled
                        value={`https://${referralHubInfo.env}eltinto.xyz/?referral_code=${referralHubInfo.referral_code}`} 
                        sx={{width: '80%'}}
                    />
                    <Button 
                        variant="contained" 
                        sx={{marginTop: "20px", padding: "10px"}}
                        onClick={copyLink}
                    >
                        <FileCopySharp />
                        Copiar link
                    </Button>
                </ShareContainer>
            </>
        )
    }

    return (
        <>
            {
                showSpinner ? (
                    <Spinner />
                ) : (
                    <ReferralHubInfo />
                )
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}

export default ReferralHub;