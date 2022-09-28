import logo from './logo.svg';
import './App.css';
import Pocke from './component/Pocke';
import { Route, Routes } from 'react-router-dom';
import PockeDetail from './component/PockeDetail';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Pocke/>} />
        <Route path='/pockdetail/:pokid' element={<PockeDetail/>} />
      </Routes>
    </>
  );
}

export default App;
