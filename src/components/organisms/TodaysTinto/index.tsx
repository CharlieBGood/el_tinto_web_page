import styled from "styled-components";
import { getDailyMail } from "../../../services";
import { useEffect, useState } from "react";
import FlexContainer from "../../atoms/FlexContainer";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Helmet } from 'react-helmet-async';


const TintoContainer = styled(FlexContainer)`
    width: 100%;
    flex-direction: column;
    margin: 1.5rem 0;
    padding: 0 9%;
`

const TodaysTinto = () => {
    
    const [searchParams] = useSearchParams();
    const { hash } = useLocation();
    const [tintoContent, setTintoContent] = useState<string>('')
    const [showSpinner, setShowSpinner] = useState<boolean>(true)

    useEffect(() => {
        getDailyMail({date: searchParams.get('date') || ""})
        .then(response => {
            setTintoContent(response.data.html)
            setShowSpinner(false)
        })
        .catch(() => {toast.error('Hubo un error en la página 😔')})
    }, [])

    useEffect(() => {
        if(tintoContent !== null){
            document.getElementById(hash.substring(1))?.scrollIntoView({block: "start", behavior: 'auto'});
        }
    }, [tintoContent])

    const Spinner = () => {
        return(
            <FlexContainer height="70vh">
                <CircularProgress sx={{margin: "auto 0"}} />
            </FlexContainer>
        )
    }

    return (
        <TintoContainer alignItems="center">
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