
import './App.css'
import Relay from './pages/Relay';
import Navbar from './components/Navbar';
import { Route,Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registration from './pages/Registration';

const queryClient = new QueryClient();
function App() {

  return (
    <div className='app'>
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar/>
        </div>
        <section className='mainSection'>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/Home' element={<Relay/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register/*' element={<Registration/>}/>

          </Routes>
        </section>
      </QueryClientProvider>
    </div>


  )
}

export default App
