import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
	
	const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

	return (
		<header>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link to="/" className="navbar-brand">
					The Hobby Shop
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<form className="form-inline my-2 w-75">
						<input
							className="form-control m-2 w-75"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-success m-2" type="submit">
							Search
						</button>
					</form>

					<ul className="navbar-nav ml-auto pr-4">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdown"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Account
							</a>
							<div className="dropdown-menu z-1500" aria-labelledby="navbarDropdownMenuLink">
								{!isAuthenticated && (
									<button onClick={() => loginWithRedirect()} className="dropdown-item">
										Log In
									</button>
								)}

								{isAuthenticated && (
									<span>
										<Link to="/profile" className="dropdown-item">
											Profile
										</Link>
										<Link to="/external-api" className="dropdown-item">
											External API
										</Link>
										<button onClick={() => logout({ returnTo: window.location.origin })} className="dropdown-item">
											Log out
										</button>
									</span>
								)}

								{isAuthenticated}

								{/*
                                <Link to="/login" className="dropdown-item">
									Login
								</Link>
								<Link to="/login" className="dropdown-item">
									Sign Up
								</Link>
                                */}
							</div>
						</li>
						<li className="nav-item">
							<Link to="/cart" className="nav-link">
								Cart
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
