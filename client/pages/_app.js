import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import buidClient from '../api/buid-client';

const AppComponent = ({ Component, pageProps, currentUser}) => {
    return <React.Fragment>
        <Header></Header>
        <Component {...pageProps} />
    </React.Fragment>
     
}

AppComponent.getInitialProps = async (appContext) =>{
    const { data } = await buidClient(appContext.ctx).get('/api/users/currentuser');
    let pageProps = {}
    if(appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
        pageProps,
        ...data
    };
}

export default AppComponent;