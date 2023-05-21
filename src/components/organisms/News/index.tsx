import styled from "styled-components";
import { getNews } from "../../../services";
import { useEffect, useState } from "react";
import FlexContainer from "../../atoms/FlexContainer";
import { Toaster, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import MetaTags from 'react-meta-tags';


const NewsContainer = styled(FlexContainer)`
    width: 100%;
    flex-direction: column;
    margin: 1.5rem 0;
    padding: 0 9%;
`

const News = () => {
    
    const [tintoContent, setTintoContent] = useState<string>('')
    const [showSpinner, setShowSpinner] = useState<boolean>(true)

    let { id } = useParams();

    useEffect(() => {
        const newsId = id !== undefined ? id : '' 

        getNews(newsId)
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
        <NewsContainer alignItems="center">
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
            <MetaTags>
                <title>El Tinto de hoy</title>
                <meta name="url" content="https://eltinto.xyz/noticias/" />
                <meta property="og:title" content="El Tinto - Noticias" />
                <meta property="og:image" content="https://el-tinto-utils.s3.amazonaws.com/logos/el_tinto_image.png"/>
                <meta property="og:description" content="Historias importantes para gente ocupada"/>
            </MetaTags>
        </NewsContainer>
    )
}

export default News;