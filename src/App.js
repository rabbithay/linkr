import React from 'react';
import { useState, useEffect } from 'react';
import {
	BrowserRouter as Router, Switch, 
} from 'react-router-dom';

import UserContext from './contexts/UserContext';

import GlobalStyle from './styles/GlobalStyle';

import Routes from './Routes';
import FollowsContext from './contexts/FollowsContext';
import { getFollows } from './service/service.users';

function App() {
	const [userInfo, setUserInfo] = useState('');
	const [peopleIFollow, setPeopleIFollow] = useState([]);
	const infoFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));

	const updatePeopleIFollow = () => {
		getFollows(userInfo.token).then((res)=>{
			setPeopleIFollow(res.data.users);
		}).catch();
	};

	useEffect(() => {
		if (infoFromLocalStorage) setUserInfo(infoFromLocalStorage);
		if(userInfo.token) updatePeopleIFollow;
	}, [userInfo.token]);


	return (
		<UserContext.Provider value={{userInfo, setUserInfo}}>
			<FollowsContext.Provider value={{peopleIFollow, updatePeopleIFollow}}>
				<Router>
					<GlobalStyle/>
					<Switch>
						<Routes/>
					</Switch>
				</Router>
			</FollowsContext.Provider>
		</UserContext.Provider>
	);
}

export default App;