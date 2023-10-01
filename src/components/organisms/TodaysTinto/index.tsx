import styled from "styled-components";
import { getDailyMail } from "../../../services";
import { useEffect, useState } from "react";
import FlexContainer from "../../atoms/FlexContainer";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useExitIntent } from "use-exit-intent";
import SuscribePopUp from "../SuscribePopUp";


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
    const [open, setOpen] = useState(false);
    const { registerHandler, unsubscribe } = useExitIntent({
        "desktop": {
            "triggerOnMouseLeave": true,
        },
        "mobile": {
            "triggerOnIdle": true,
            "delayInSecondsToTrigger": 10
        }
    })

    useEffect(() => {
        getDailyMail({date: searchParams.get('date') || ""})
        .then(response => {
            setTintoContent(response.data.html)
            setShowSpinner(false)
        })
    }, [])

    useEffect(() => {
        if(tintoContent !== null){
            document.getElementById(hash.substring(1))?.scrollIntoView({behavior: 'auto'});
        }
    }, [tintoContent])

    const handleClose = (isSubscription: boolean) => {
        if (isSubscription){
            toast.success('¡Bienvenido a El Tinto!')
        }
        setOpen(false);

        unsubscribe();
    };

    registerHandler({
        id: 'openModal',
        handler: () => setOpen(true),
    })

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
            <SuscribePopUp open={open} setOpen={setOpen} handleClose={handleClose}/>
        </TintoContainer>
    )
}

export default TodaysTinto;