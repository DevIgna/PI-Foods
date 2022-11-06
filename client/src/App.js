import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './components/LandingPage/Landing.jsx'
import Home from './components/Home/Home.jsx'
import Details from './components/Details/Details.jsx'
import Created from './components/Recipe_Created/Created.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route path='/home/:id' component={Details} />
          <Route path='/create-recipe' component={Created} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
