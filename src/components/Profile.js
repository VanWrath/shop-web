// src/components/Profile.js

import React, { Fragment } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';

const Profile = () => {
	const { loading, user, isAuthenticated } = useAuth0();

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

						<div />
					</div>
				</div>
			</div>
		</Fragment>
		)
		
	);
};

export default Profile;
