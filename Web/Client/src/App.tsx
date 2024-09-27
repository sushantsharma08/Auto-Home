
import './App.css'
import Relay from './components/Relay'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();
function App() {

  return (
    <div className='app'>
      <QueryClientProvider client={queryClient}>
        <div>
          <Relay />
        </div>
      </QueryClientProvider>
    </div>


  )
}

export default App
