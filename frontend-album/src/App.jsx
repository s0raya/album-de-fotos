import RoutesApp from './routes/RoutesApp';
import { AuthProvider } from './auth/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
