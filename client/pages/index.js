import axios from 'axios';

const LandingPage = ({ currentUser }) => {
    return <h1>You have signed in! Welcome, { currentUser }</h1>
}

LandingPage.getInitialProps = async () => {
    const response = await axios.get('/api/users/currentuser');

    return response.data;
}

export default LandingPage;