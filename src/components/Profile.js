// src/components/Profile.js

import React, { Fragment } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import Loading from './Loading';

const Profile = () => {
	const { loading, user } = useAuth0();

	if (loading || !user) {
		return <Loading />;
	}

	return (
		<Fragment>
			<div className="container py-5">
				<div className="row">
					<div className="col-3">
						<img src={user.picture} alt="Profile" className="img-fluid" />
					</div>

					<div className="col-9">
						<h2>{user.name}</h2>
						<p>{user.email}</p>
						<code>{JSON.stringify(user, null, 2)}</code>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Profile;
