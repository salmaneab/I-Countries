
import './sass/style.scss';
import Main from './component/main';
import Detail from './component/detail';
import Header from './component/header';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
      <Header />
       <Switch>
        <Route exact path="/" component={Main}> </Route>
        <Route path="/country/:name" component={Detail}></Route>
       </Switch>
      </BrowserRouter>
  );
}

export default App;
