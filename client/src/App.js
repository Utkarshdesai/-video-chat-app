
import './App.css';
import { Route ,Routes } from 'react-router-dom';
import { Home } from './screens/Home';
import { Room } from './screens/Room';


function App() {
  
  return (
    <div >
      <Routes>
          <Route path = "/"  element={<Home></Home>} /> 
         <Route path = "/room/:roomId" element={<Room></Room>} />
      </Routes>
    
    </div>
  );
}

export default App;
