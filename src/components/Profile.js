// src/components/Profile.js

import React, { Fragment, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import config from "../auth_config.json";


const Profile = () => {
	const { loading, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [userMetadata, setUserMetadata] = useState(null);

	useEffect(() => {
		//console.log("loading metadata");
		const getUserMetadata = async () => {
			const domain = config.domain;
		
			try {
			  const accessToken = await getAccessTokenSilently({
				audience:  config.audience,
				scope: "read:current_user",
			  });
			  
			  //console.log("AccessToken: " + accessToken);
	
			  const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
			  //console.log("userSub: " + user.sub);
		
			  const metadataResponse = await fetch(userDetailsByIdUrl, {
				headers: {
				  Authorization: `Bearer ${accessToken}`,
				},
			  });
			  
			  const { user_metadata } = await metadataResponse.json();
			  //console.log("Metadata: "+ user_metadata);
			  
			  setUserMetadata(user_metadata);
			} catch (e) {
			  console.eror(e.message);
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
						
						<h3>Address</h3>
						{userMetadata ? (
							<div className="m-2 border">
								<p className="my-0 mx-2">{userMetadata.address.address}</p>
								<p className="my-0 mx-2">{userMetadata.address.city}, {userMetadata.address.state} {userMetadata.address.postal}</p>
								<p className="my-0 mx-2">{userMetadata.address.country}</p>
								<Link to={{
									pathname: "/editAddress",
									state: {
										userMetadata
									}}} 
									className="btn btn-primary px-3 m-2">Edit</Link>
							</div>
          					
						) : ("No address added")}

						<div />
					</div>
				</div>
			</div>
		</Fragment>
		)
		
	);
};

export default Profile;
