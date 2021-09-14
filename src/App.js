import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <Router>
      <GlobalStyle/>
      <Switch>
      <Route path="/" exact  />
      <Route path="/sign-up" exact  />
      <Route path="/timeline" exact  />
      <Route path="/my-posts" exact />
      <Route path="/user/:id" exact  />
      <Route path="/hashtagh/:hashtag" exact/>
      <Route path="/my-likes" exact  />
      </Switch>
    </Router>
  );
}

export default App;
