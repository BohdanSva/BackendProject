import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Landing = () => {
    // Hooks definitions
    const navigate = useNavigate();

    // Functions
    const toLogin = () => navigate('/account/login');

    useEffect(() => {
        toLogin();
    }, []);

    return ( 
    <>
    </>
    );
}
 
export default Landing;