
import Result from "./pages/Result";
import TheEnd from "./components/TheEnd";
import GameEnd from "./components/GameEnd";
import Welcome from "./components/Welcome";
import Signup from "./pages/Signup";
import FormGeneral from "./pages/FormGeneral/FormGeneral";
import InstructionFormPreGame from "./pages/FormPreGame/InstructionFormPreGame";
import InstructionFormPostGame from "./pages/FormPostGame/InstructionFormPostGame";

import FormPreGame from "./pages/FormPreGame/FormPreGame";
import FormPostGame from "./pages/FormPostGame/FormPostGame";

import GrandGame from "./pages/GrandGame/GrandGame";

import Login from './pages/Login'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'

export default function App({ ...props }) {

  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/formgeneral" element={<FormGeneral />} />
          <Route path="/instructionformpregame" element={<InstructionFormPreGame />} />
          <Route path="/formpregame" element={<FormPreGame />} />
          <Route path="/instructionformpostgame" element={<InstructionFormPostGame />} />
          <Route path="/formpostgame" element={<FormPostGame />} />

          <Route path="/grandgame" element={<GrandGame />} />

          <Route path="/welcome" element={<Welcome />} />
          <Route path="/result" element={<Result />} />
          <Route path="/gameend" element={<GameEnd />} />  
          <Route path="/theend" element={<TheEnd />} />                
        </Routes>
      </Router>
  );
}
