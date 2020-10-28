// src/components/Profile.js

import React, { Fragment, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';
import config from "../auth_config.json";

const Profile = () => {
	const { loading, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [userMetadata, setUserMetadata] = useState(null);

	useEffect(() => {
		const getUserMetadata = async () => {
		  const domain = config.domain;
	  
		  try {
			const accessToken = await getAccessTokenSilently({
			  audience: `https://${domain}/api/v2/`,
			  scope: "read:current_user",
			});
			
			const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
	  
			const metadataResponse = await fetch(userDetailsByIdUrl, {
			  headers: {
				Authorization: `Bearer ${accessToken}`,
			  },
			});
			
			const { user_metadata } = await metadataResponse.json();
			console.log("Metadata: "+user_metadata);
	  
			setUserMetadata(user_metadata);
		  } catch (e) {
			console.log(e.message);
		  }
		};
		
		getUserMetadata();
	  }, []);

	if (loading || !user) {
		return <Loading />;
	}


	return (
		isAuthenticated && (
			<Fragment>
			<div className="container py-5">
				<div className="row">
					<div className="col-3">
						<img src={user.picture} alt="Profile" className="card-img" />
					</div>

					<div className="col-9">
						<h2>{user.name}</h2>
						<p>{user.email}</p>

						<h3>User Metadata</h3>
						{userMetadata ? (
          					<pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        						) : ("No user metadata defined")}

						<div />
					</div>
				</div>
			</div>
		</Fragment>
		)
		
	);
};

export default Profile;
