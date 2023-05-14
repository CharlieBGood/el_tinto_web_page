import styled from "styled-components";
import { getTemplates, getMail } from "../../../services";
import { useEffect, useState } from "react";
import FlexContainer from "../../atoms/FlexContainer";
import { Toaster, toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";


const TintoContainer = styled(FlexContainer)`
    width: 100%;
    flex-direction: column;
    margin: 1.5rem 0;
    padding: 0 9%;
`

const TodaysTinto = () => {
    
    const [template, setTemplate] = useState<string>('')
    const [searchParams] = useSearchParams();

    useEffect(() => {
        getTemplates()
        .then(response => {setTemplate(response.data.results.filter((template: { name: string; }) => template.name === 'Base Daily')[0].html)})
        .catch(error => {toast.error('Hubo un error en la página 😔')})

    }, [])

    useEffect(() => {
        if (template !== '') {
            let date = searchParams.get('date')

            if (date === null){
                const today = new Date();

                let day = today.getDate();
                let month = today.getMonth() + 1;
                let year = today.getFullYear();

                date = `${day}-${month}-${year}`
            }

            getMail({date: date})
            .then((response: any) => {setTemplate(template.replace('{{html}}', response.data.results[0].html))})
            .catch((error: any) => {console.log(error)})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [template])

    return (
        <TintoContainer>
            <div dangerouslySetInnerHTML={{__html: template}} />
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </TintoContainer>
    )
}

export default TodaysTinto;