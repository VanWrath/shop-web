// src/views/ExternalApi.js
import React, { useState } from 'react';
import { useAuth0, withAuthenticationRequired  } from '@auth0/auth0-react';
import config from "../auth_config.json";
import Loading from "../components/Loading";
import HttpService from '../services/http-service';

const http = new HttpService();

const ExternalApiComponent = () => {
	const [state, setState] = useState({
		showResult: false,
		apiMessage: "",
		error: null,
	});

	const { getAccessTokenSilently, 
			loginWithPopup,
			getAccessTokenWithPopup } = useAuth0();

	const handleConsent = async () => {
		try {
			 await getAccessTokenWithPopup();
			setState({
			...state,
			error: null,
			});
		} catch (error) {
			setState({
			...state,
			error: error.error,
			});
		}
		await callApi();
	};

	const handleLoginAgain = async () => {
		try {
		  await loginWithPopup();
		  setState({
			...state,
			error: null,
		  });
		} catch (error) {
		  setState({
			...state,
			error: error.error,
		  });
		}
	
		await callApi();
	  };

	const callApi = async () => {
		try {
			const token = await getAccessTokenSilently();

			const response = await fetch('http://localhost:3003/api/external', {
				headers : {
					Authorization : `Bearer ${token}`
				}
			});
			const responseData = await response.json();

			setState({
				...state,
				showResult: true,
				apiMessage: responseData,
			  });
		} catch (error) {
			setState({
				...state,
				error: error.error,
			  });
		}
	};

	const handle = (e, fn) => {
		e.preventDefault();
		fn();
	  };

	/*
	const updateUserData = async () => {
		try {
			const token = await getTokenSilently();
			var data = {
				authToken : token,
				uid       : 'google-oauth2|106215224160757600657',
				metadata  : {
					name : 'Kyle'
				}
			};
			const response = await http.updateUser(data);
		} catch (error) {
			console.error(error);
		}
	};
*/
	return (
		<div className="container my-5">
        	{state.error === "consent_required" && (
           <div className='alert alert-warning'>
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleConsent)}
            >
              consent to get access to users api
            </a>
          </div>
        	)}

        	{state.error === "login_required" && (
          	<div className='alert alert-warning'>
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}
            >
              log in again
            </a>
          </div>
        )}

		<h1>External API</h1>
        <p>
          Ping an external API by clicking the button below. This will call the
          external API using an access token, and the API will validate it using
          the API's audience value.
        </p>

			<button onClick={callApi} className="mx-2">
				Ping API
			</button>
			
		<div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            <div className='bg-warning text-dark'>
              <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
            </div>
          </div>
        )}
		</div>
      {/* </div>
			<button onClick={updateUserData} className="ms-2">
				Update User Test
			</button>
		</div> */}
	</div>
	);
};

export default withAuthenticationRequired(ExternalApiComponent, {
	onRedirecting: () => <Loading />,
  });
