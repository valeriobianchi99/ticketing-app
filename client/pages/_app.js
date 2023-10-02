import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import buidClient from '../api/buid-client';
import CustomHeader from '../components/custom-header';

const AppComponent = ({ Component, pageProps, currentUser}) => {
    return <React.Fragment>
        <CustomHeader currentUser={currentUser}></CustomHeader>
        <Component currentUser={currentUser} {...pageProps} />
    </React.Fragment>
     
}

AppComponent.getInitialProps = async (appContext) =>{
    const client = buidClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
    let pageProps = {}
    if(appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    }
    return {
        pageProps,
        ...data
    };
}

export default AppComponent;