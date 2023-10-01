import styled from "styled-components";
import FlexContainer from "../FlexContainer";
import THEME from '../../../utils/styledTheme';

const Dot = styled.span`
    height: 5px;
    width: 5px;
    background-color: #ffa414;
    border-radius: 50%;
    display: inline-block;
    margin: 0 10px;
    @media only screen and (max-width: 768px) {
        height: 4px;
        width: 4px;
    }
`

const Line = styled.hr`
    background-color: ${THEME.colors.primary};
    height: 2px;
    width: 25%;
    opacity: 0.75;
    margin: 0 3%;
`

const Breaker = () => {
    return (
        <FlexContainer width="100%" justify="center" alignItems="center" margin="40px 0">
            <Line />
            <Dot />
            <Line />
        </FlexContainer>
    )
}

export default Breaker;