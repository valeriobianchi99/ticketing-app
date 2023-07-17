import axios from 'axios';

const LandingPage = ({ currentUser }) => {
    return <h1>You have signed in! Welcome, { currentUser.email }</h1>
}

LandingPage.getInitialProps = async ({ req  }) => {
    if(!window){
        // we are on the server
        const { data } = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', 
            {
                headers: {
                    Host: 'ticketing.dev'
                }
            }
        );
        return data;
    } else {
        const { data } = await axios.get('/api/users/currentuser');
        return data;
    }
}

export default LandingPage;