import AddProduct from './AddProduct';
import Home from './Home'
import Product from './Product';
import Admin from './Admin';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route exact path="/" Component={Home} />
        <Route exact path="/Product" Component={Product} />
        <Route exact path="/AddProduct" Component={AddProduct} />
        <Route exact path="/Admin" Component={Admin} />
        <Route exact path='/AdminDashboard' Component={AdminDashboard} />
      </Routes>
    </div>
  );
}

export default App;
