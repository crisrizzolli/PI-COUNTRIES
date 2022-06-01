import './App.css';

//REDUX
import store from "./store";
import {Provider} from "react-redux";

//REACT ROUTER DOM

import { BrowserRouter, Routes, Route}  from "react-router-dom";
import LandingPage from './components/landingPage/LandingPage';

//COMPONENTES

function App() {
  return (
    <Provider store= {store}>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<LandingPage />}/> 
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
