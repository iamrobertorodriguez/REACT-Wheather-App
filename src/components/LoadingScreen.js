import React from 'react';

const LoadingScreen = () => {

    return (
        <div id='loading-page' >
            <img className='loading-icon' src="https://media3.giphy.com/media/OQuEO3CScOAuFYJlBd/200w.gif?cid=82a1493b6xzjclmtzvyyii9q7b5lc7bi7pgq0n60pylfd1q7&rid=200w.gif&ct=s" alt="water drop filling" />
            <h2>Before start please allow access to your location for a corret operation...<br />If you are using Firefox please enable backdrop-filter for styling purposes.<br /><br />By: iamrobertorodriguez.netlify.app</h2>
        </div>
    );
};

export default LoadingScreen;