
import './App.css'
import Relay from './components/Relay'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Relay/>
    </div>
    </QueryClientProvider>

  )
}

export default App
