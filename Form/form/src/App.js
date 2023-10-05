import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Example from './Components/Example/Example';
import Viewform from './Components/Viewform/Viewform';
import Trial from './Components/Trial/Trial';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='' element={<Example></Example>}></Route>
      <Route path='Navbar' element={<Navbar></Navbar>}></Route>
      <Route path='Viewform' element={<Viewform></Viewform>}></Route>
      <Route path='Trial' element={<Trial></Trial>}></Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
