
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/Header/header';
import Home from './component/home/home';
import Quiz from './component/quiz/quiz';

function App() {


  return (
    <BrowserRouter>
    <div className="app" style={{
      
    }}>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/quiz' element={<Quiz/>} />
      
    </Routes>
    
    </div>
    </BrowserRouter>
  );
}

export default App;
