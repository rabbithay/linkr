import React, {useContext, useEffect, useState} from 'react';
import {
	Route, useLocation, useHistory, Switch
} from 'react-router-dom';
import UserContext from './contexts/UserContext';
import { motion } from 'framer-motion';

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
	const [previousLocation, setPreviousLocation] = useState('');

	useEffect(() => {
		if (location.pathname !== '/' && location.pathname !== '/sign-up' && !userInfo) {
			setPreviousLocation(location.pathname);
			history.push('/');
		}
		if (userInfo && location.pathname === '/') {
			if (previousLocation !== '/timeline' && previousLocation !== '') {
				history.push('/timeline');
				history.push(previousLocation);
			}
			else {
				history.push('/timeline');
			}
		}
	}, [previousLocation, userInfo]);

	const routes = 
	[
		{path: '/timeline', Component: Timeline},
		{path: '/my-posts', Component: MyPosts},
		{path: '/my-likes', Component: MyLikes},
		{path: '/user/:id', Component: SomeonesPosts},
		{path: '/hashtag/:hashtag', Component: Hashtag},
	];

	return (
		<Switch location={location} key={location.pathname}>
			<Route exact path='/'component={SignIn} />
			<Route exact path='/sign-up'component={SignUp} />
			{routes.map(({ path, Component }) => (
				<Route key={path} exact path={path}>
					<motion.div
						initial={{ position: 'absolute', left: '-100%', width: '100%' }}
						animate={{ left: '0%' }}
						exit={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<Component />
					</motion.div>
				</Route>))}
		</Switch>
	);
}

export default Routes;
