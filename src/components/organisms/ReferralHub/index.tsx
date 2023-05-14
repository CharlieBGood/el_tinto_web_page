import { Button, Card, CardContent, CardMedia, Link, TextField, Typography } from "@mui/material";
import { FlexContainer } from "../../atoms";
import ContentContainer from "../../atoms/ContentContainer";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReferralHub } from "../../../services";
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

    useEffect(() => {

        const email = decodeURIComponent(searchParams.get('email') || '');

        getReferralHub({email: email})
        .then(response => setReferralHubInfo(response.data))
        .catch(error => console.log(error.data))
    }, [])

    const copyLink = () => {
        navigator.clipboard.writeText(`https://${referralHubInfo.env}eltinto.xyz/suscribirse/?referral_code=${referralHubInfo.referral_code}`);
        toast.success('¡Has copiado tu link!')
    }

    const milestonesInfoFirstRow = [
        {
            name: "Stickers de whatsapp", 
            url: "https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERRAL_PREMIO_1_STICKERS.png",
            referred_users: 1
        },
        {
            name: "Tinto Dominguero", 
            url: "https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERRAL_PREMIO_2_DOMINGUERO.png",
            referred_users: 3
        },
        {
            name: "La Cafeteria (Comunidad)", 
            url: "https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERRAL_PREMIO_3_COMUNIDAD.png",
            referred_users: 5
        },
        {
            name: "Charlas con El Tinto", 
            url: "https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERRAL_PREMIO_4_CHARLAS.png",
            referred_users: 10
        }
    ]
    const milestonesInfoSecondRow = [
        {
            name: "Mug", 
            url: "https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERRAL_PREMIO_5_MUG.png",
            referred_users: 17
        },
        {
            name: "Gorra", 
            url: "https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERRAL_PREMIO_6_GORRA.png",
            referred_users: 25
        },
        {
            name: "Café", 
            url: "https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERRAL_PREMIO_7_CAF%C2%90.png",
            referred_users: 50
        }
    ]

    const ribbonImageUrl = () => {
        if (referralHubInfo.referral_count < 1){
            return 'https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERIDOS_NINGUNO.png'
        }
        else if (referralHubInfo.referral_percentage <= 1){
            return 'https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERIDOS_ORO.png'
        }
        else if (referralHubInfo.referral_percentage <= 10){
            return 'https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERIDOS_PLATA.png'
        }
        else if (referralHubInfo.referral_percentage <= 20){
            return 'https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERIDOS_BRONCE.png'
        }
        else {
            return 'https://el-tinto-utils.s3.amazonaws.com/referral_program/REFERIDOS_OTROS.png'
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
                        Estás a solamente ({referralHubInfo.missing_referred_users_for_next_price}) 
                        referidos de conseguir {referralHubInfo.pre_price_string} <strong>{referralHubInfo.price_description}</strong>.
                    </Typography>
                    <Typography variant="body1" style={{fontWeight: '700', margin: "20px 0"}}>
                        Tu número de referidos: {referralHubInfo.referral_count}
                    </Typography>
                    <FlexContainer width="100%">
                        {
                            milestonesInfoFirstRow.map(milestone => (
                                <Card sx={{ width: '25%', border: `2px solid ${THEME.colors.primary}`, margin: "0 3px" }}>
                                    <CardMedia
                                        component="img"
                                        image={milestone.url}
                                        alt="green iguana"
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
                                </Card>
                            ))
                        }
                    </FlexContainer>
                    <FlexContainer width="100%" margin="10px auto" justify="center">
                        {
                            milestonesInfoSecondRow.map(milestone => (
                                <Card sx={{ width: '25%', border: `2px solid ${THEME.colors.primary}`, margin: "0 3px" }}>
                                    <CardMedia
                                        component="img"
                                        image={milestone.url}
                                        alt="green iguana"
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
                        href={`https://api.whatsapp.com/send?text=${referralHubInfo.invite_users_message}https://${referralHubInfo.env}eltinto.xyz/suscribirse/?referral_code=${referralHubInfo.referral_code}`}
                        style={{width: "12%", maxWidth:"75px"}}
                    >
                        <img
                        src="https://el-tinto-utils.s3.amazonaws.com/share_individual_news/ALPHA_MENU_BG_WA.png"
                        style={{width: "100%"}}
                        alt="share"
                        />  
                    </Link>
                    <Link 
                        href={`https://www.facebook.com/sharer/sharer.php?u=https://${referralHubInfo.env}eltinto.xyz/suscribirse/?referral_code=${referralHubInfo.referral_code}`}
                        style={{width: "12%", maxWidth:"75px"}}
                    >
                        <img
                        src="https://el-tinto-utils.s3.amazonaws.com/share_individual_news/ALPHA_MENU_BG_FB.png"
                        style={{width: "100%"}}
                        alt="share"
                        />  
                    </Link>
                    <Link 
                        href={`https://twitter.com/intent/tweet?text=${referralHubInfo.invite_users_message}https://${referralHubInfo.env}eltinto.xyz/suscribirse/?referral_code=${referralHubInfo.referral_code}`}
                        style={{width: "12%", maxWidth:"75px"}}
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
                    value={`https://${referralHubInfo.env}eltinto.xyz/suscribirse/?referral_code=${referralHubInfo.referral_code}`} 
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
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </ShareContainer>
        </>
    )
}

export default ReferralHub;