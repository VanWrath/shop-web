// src/views/ExternalApi.js
import React, { useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';

const ExternalApi = () => {
	const [ showResult, setShowResult ] = useState(false);
	const [ apiMessage, setApiMessage ] = useState('');
	const { getTokenSilently } = useAuth0();

	const callApi = async () => {
		try {
			const token = await getTokenSilently();

			const response = await fetch('http://localhost:3003/api/external', {
				headers : {
					Authorization : `Bearer ${token}`
				}
			});
			const responseData = await response.json();

			setShowResult(true);
			setApiMessage(responseData);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container my-5">
			<h1>External API</h1>
			<button onClick={callApi} className="mx-2">
				Ping API
			</button>
			{showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
		</div>
	);
};

export default ExternalApi;
