import React from 'react';
import {
	BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Timeline from './pages/Timeline';
import MyLikes from './pages/MyLikes';
import MyPosts from './pages/MyPosts';
import Hashtag from './pages/Hashtag';

function App() {
	return (
		<Router>
			<GlobalStyle/>
			<Switch>
				<Route path="/" exact component={SignIn} />
				<Route path="/sign-up" exact component={SignUp} />
				<Route path="/timeline" exact component={Timeline} />
				<Route path="/my-posts" exact component={MyPosts} />
				<Route path="/user/:id" exact />
				<Route path="/hashtag" exact component={Hashtag} />
				<Route path="/my-likes" exact component={MyLikes} />
			</Switch>
		</Router>
	);
}

export default App;
