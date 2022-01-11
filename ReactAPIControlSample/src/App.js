import "./App.css";
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';


function App() {

  return(
    <BrowserRouter>
      <div className='App'>
        <Route path="/" exact component={Login}/>
        <Route path="/home" component={Home}/>
          
      </div>
    </BrowserRouter>
  );
}

export default App;
