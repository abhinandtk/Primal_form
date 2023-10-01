import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Example from './Components/Example/Example';
import Viewform from './Components/Viewform/Viewform';
import Edit_page from './Components/Edit page/Edit_page';
import Trial from './Components/Trial/Trial';
import Newhome from './Components/Newhome/Newhome';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='Home' element={<Home></Home>}></Route>
      <Route path='Navbar' element={<Navbar></Navbar>}></Route>
      <Route path='' element={<Example></Example>}></Route>
      <Route path='Viewform' element={<Viewform></Viewform>}></Route>
      <Route path='Edit_page' element={<Edit_page></Edit_page>}></Route>
      <Route path='Trial' element={<Trial></Trial>}></Route>
      <Route path='Newhome' element={<Newhome></Newhome>}></Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
