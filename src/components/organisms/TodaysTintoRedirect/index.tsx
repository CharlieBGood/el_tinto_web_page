import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const TodaysTintoRedirect = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const queryParams = new URLSearchParams(searchParams);

        navigate({
            pathname: '/el-tinto-de-hoy',
            search: `?${queryParams}`
        })

    }, [])

    return (
        <></>
    )
}

export default TodaysTintoRedirect;