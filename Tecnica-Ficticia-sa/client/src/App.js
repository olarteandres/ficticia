import './App.css';
import {BrowserRouter, Route ,Switch} from "react-router-dom";
import Home from './components/Home';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ="/" component ={Home}/>
        <Route exact path="/CreateProduct" component={CreateProduct}/>
        <Route exact path="/UpdateProduct" component={UpdateProduct}/> 
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
