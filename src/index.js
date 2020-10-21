import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app/App';
//import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';
import config from './auth_config.json';
import history from './utils/history';

/* new code fro react routing
ReactDOM.render(<App />, document.getElementById('root'));
*/
const onRedirectCallBack = (appState) => {
	history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

ReactDOM.render(
	<Auth0Provider
		domain={config.domain}
		clientId={config.clientId}
		redirectUri={window.location.origin}
		scope="read:current_user update:current_user_metadata"
		//onRedirectCallBack={onRedirectCallBack}
	>
		<App />
	</Auth0Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
