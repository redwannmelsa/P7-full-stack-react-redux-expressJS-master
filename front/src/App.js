import './styles/App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch, useSelector } from 'react-redux';
import { loggedIn } from './actions';

const App = () => {




  return (
    <div className='App'>
        <Home />
    </div>
  );
}

export default App;
