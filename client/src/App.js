import './App.css';
import {Route ,Routes} from 'react-router-dom';
import Homepage from './pages/homepage';
import Dashboard from './pages/dashboard';
import CreateForm from './pages/createform';


function App() {

  return (
      <Routes>
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createform" element={<CreateForm />} />
      </Routes>
  );
}

export default App;
