import Game from "./pages/Game";
import Game2 from "./pages/Game";
import Game3 from "./pages/Game";
import Game4 from "./pages/Game";
import Result from "./pages/Result";
import TheEnd from "./components/TheEnd";
import GameEnd from "./components/GameEnd";
import Welcome from "./components/Welcome";
import FormGeneral from "./pages/FormGeneral/FormGeneral";
import InstructionFormPreGame from "./pages/FormPreGame/InstructionFormPreGame";
import InstructionFormPostGame from "./pages/FormPostGame/InstructionFormPostGame";

import FormPreGame from "./pages/FormPreGame/FormPreGame";
import FormPostGame from "./pages/FormPostGame/FormPostGame";

import GrandGame from "./pages/GrandGame/GrandGame";
import FinalResult from "./pages/GrandGame/FinalResult"

import Input from "./components/Input"
import RadioQuestionForm from "./components/Radio"

import Login from './pages/Login'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import { useState } from "react";

export default function App({ ...props }) {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/formgeneral" element={<FormGeneral />} />
        <Route path="/instructionformpregame" element={<InstructionFormPreGame />} />
        <Route path="/formpregame" element={<FormPreGame />} />
        <Route path="/instructionformpostgame" element={<InstructionFormPostGame />} />
        <Route path="/formpostgame" element={<FormPostGame />} />
        
        <Route path="/game" element={ <Game />} />
        <Route path="/game2" element={<Game2 />} />
        <Route path="/game3" element={<Game3 />} />
        <Route path="/game4" element={<Game4 />} />

        <Route path="/grandgame" element={<GrandGame />} />

        <Route path="/finalresult" element={<FinalResult />} />

        <Route path="/welcome" element={<Welcome />} />
        <Route path="/result" element={<Result />} />
        <Route path="/gameend" element={<GameEnd />} />  
        <Route path="/theend" element={<TheEnd />} />                
      </Routes>
    </Router>
  );
}
