import { Typography } from "@mui/material";
import FlexContainer from "../FlexContainer";
import { TestimonialProps } from "./types";

const Testimonial: React.FC<TestimonialProps> = ({imageUlr, text, name}) => {
    return(
        <FlexContainer alignItems="center" direction="column" width="70%" margin="0 auto">
            <img src={imageUlr} alt="personal" style={{margin: '0 auto'}} />
            <Typography variant="subtitle2" textAlign='center' style={{margin: '20px 0 0 0', color: '#000000'}}>
                {text}
            </Typography>
            <Typography variant="subtitle2" textAlign='center' style={{margin: '20px 0 0 0', color: '#000000'}}>
                <strong>{name}</strong>
            </Typography>
        </FlexContainer>
    )
}

export default Testimonial;