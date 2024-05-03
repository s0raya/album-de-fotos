import RoutesApp from './routes/RoutesApp';
import { AuthProvider } from './auth/AuthContext';

import './App.css'

function App() {
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  )
}

export default App
