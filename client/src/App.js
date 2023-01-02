import './App.css';
import {Route ,Routes} from 'react-router-dom';
import Homepage from './pages/homepage';
import Dashboard from './pages/dashboard';



function App() {

  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
}

export default App;
