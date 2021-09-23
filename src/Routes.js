import React, {useContext, useEffect} from 'react';
import {
	Route, Redirect, useLocation, useHistory
} from 'react-router-dom';
import UserContext from './contexts/UserContext';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Timeline from './pages/Timeline';
import MyPosts from './pages/MyPosts';
import SomeonesPosts from './pages/SomeonesPosts';
import Hashtag from './pages/Hashtag';
import MyLikes from './pages/MyLikes';


function Routes() {
	const { userInfo } = useContext(UserContext);
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		if (location.pathname !== '/' && location.pathname !== 'sign-up' && !userInfo) {
			history.push('/');
		}
	}, [location]);

	return (
		<>
			<Route path="/" exact> 
				{userInfo.token ? <Redirect to="/timeline" /> : <SignIn />}
			</Route>
			<Route path="/sign-up" exact component={SignUp} />
			<Route path="/timeline" exact>
				{userInfo.token ? <Timeline /> : <Redirect to="/" />}
			</Route>
			<Route path="/my-posts" exact component={MyPosts} >
			</Route>
			<Route path="/user/:id" exact component={SomeonesPosts}/>
			<Route path="/hashtag/:hashtag" exact component={Hashtag} />
			<Route path="/my-likes" exact component={MyLikes} />
		</>

	);
}

export default Routes;
