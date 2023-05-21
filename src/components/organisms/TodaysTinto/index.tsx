import styled from "styled-components";
import { getDailyMail } from "../../../services";
import { useEffect, useState } from "react";
import FlexContainer from "../../atoms/FlexContainer";
import { Toaster, toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Helmet } from 'react-helmet-async';


const TintoContainer = styled(FlexContainer)`
    width: 100%;
    flex-direction: column;
    margin: 1.5rem 0;
    padding: 0 9%;
`

const TodaysTinto = () => {
    
    const [tintoContent, setTintoContent] = useState<string>('')
    const [searchParams] = useSearchParams();
    const [showSpinner, setShowSpinner] = useState<boolean>(true)

    useEffect(() => {
        getDailyMail({date: searchParams.get('date') || ""})
        .then(response => {
            setTintoContent(response.data.html)
            setShowSpinner(false)
        })
        .catch(() => {toast.error('Hubo un error en la página 😔')})
    }, [])

    const Spinner = () => {
        return(
            <FlexContainer height="70vh">
                <CircularProgress sx={{margin: "auto 0"}} />
            </FlexContainer>
        )
    }

    return (
        <TintoContainer alignItems="center" className="wrapper">
            <Helmet prioritizeSeoTags>
                <title>El Tinto de hoy</title>
                <meta property="og:description" content="Historias importantes para gente ocupada."/>
                <meta property="og:image" content="https://el-tinto-utils.s3.amazonaws.com/logos/el_tinto_image.png" />
            </Helmet>
            {
                showSpinner ? (
                    <Spinner />
                ) : (
                    <div dangerouslySetInnerHTML={{__html: tintoContent}} />
                )
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </TintoContainer>
    )
}

export default TodaysTinto;