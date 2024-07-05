
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUserstate} from '../js/UserContext'

function Logout() {
    const navigate = useNavigate();
    const {refreshOtherPages} =useUserstate();
    useEffect(() => {
        localStorage.clear();
        refreshOtherPages();
        navigate("/");
    })
}

export default Logout;