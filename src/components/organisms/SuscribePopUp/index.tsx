import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { SuscribePopUpProps } from "./types";
import SuscribeForm from "../../molecules/SuscribeForm";
import THEME from '../../../utils/styledTheme';
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";


const PopUpDialog = styled(Dialog)`
    .MuiPaper-root {
        border-radius: 12px;
    } 
`


const SuscribePopUp: React.FC<SuscribePopUpProps> = ({open, handleClose}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    return(
        <>
            <PopUpDialog
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='xs'
            >
                <DialogTitle id="alert-dialog-title" style={{backgroundColor: THEME.colors.primary, padding: '6% 6% 0 6%'}}>
                    {
                        windowWidth > 768 ? (
                            <Typography variant="h2" textAlign='center' style={{color: "#FFF", fontSize: "15px"}}>
                                Revisamos 60+ medios y le enviamos un resumen a su correo, solo toma 5 minutos leerlo.
                            </Typography>
                        ) : (
                            <Typography textAlign="center" variant="subtitle1" style={{margin: '5px 0 0 0', color: "#FFF"}}>
                                Revisamos 60+ medios y le enviamos un resumen a su correo, solo toma 5 minutos leerlo.
                            </Typography>
                        )
                    }
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => handleClose(false)}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: (theme) => theme.palette.grey[500],
                        backgroundColor: THEME.colors.primary
                    }}
                    >
                    <CloseIcon />
                </IconButton>
                <DialogContent style={{backgroundColor: THEME.colors.primary, padding: '0'}}>
                    <SuscribeForm popUp={true} handlePopUpClose={handleClose}/>
                </DialogContent>
            </PopUpDialog>
        </>
    )
}

export default SuscribePopUp;