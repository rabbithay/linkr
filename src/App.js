import React from 'react';
import {
	BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import UserContext from './contexts/UserContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Timeline from './pages/Timeline';
import MyLikes from './pages/MyLikes';
import MyPosts from './pages/MyPosts';
import Hashtag from './pages/Hashtag';

function App() {
	const infoFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
	const [userInfo, setUserInfo] = useState('');
	useEffect(() => {
		if (infoFromLocalStorage !== null) {
			setUserInfo(infoFromLocalStorage);
		}
	}, []);


	return (
		<UserContext.Provider value={{userInfo, setUserInfo}}>
			<Router>
				<GlobalStyle/>
				<Switch>
					<Route path="/" exact> 
						{userInfo.token !== undefined ? <Redirect to="/timeline" /> : <SignIn />}
					</Route>
					<Route path="/sign-up" exact component={SignUp} />
					<Route path="/timeline" exact>
						{userInfo.token === undefined ? <Redirect to="/" /> : <Timeline />}
					</Route>
					<Route path="/my-posts" exact component={MyPosts} />
					<Route path="/user/:id" exact />
					<Route path="/hashtagh/:hashtag" exact component={Hashtag} />
					<Route path="/my-likes" exact component={MyLikes} />
				</Switch>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
