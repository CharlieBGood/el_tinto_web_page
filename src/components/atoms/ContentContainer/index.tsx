import styled from "styled-components";
import FlexContainer from "../FlexContainer";

const ContentContainer = styled(FlexContainer)`
    padding: 0 5%;
    width: 60%;
    flex-direction: column;
    margin: 2.5rem auto;
    @media only screen and (max-width: 768px) {
        width: 100%;
        padding: 0 9%;
    }
`

export default ContentContainer;