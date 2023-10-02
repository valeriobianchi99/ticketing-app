const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1>You have signed in! Welcome, { currentUser.email }</h1> : <h1>You are not signed in</h1>
}

LandingPage.getInitialProps = async (context, client, currentUser) => {
    return {}
}

export default LandingPage;