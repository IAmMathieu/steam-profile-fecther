import { useState } from "react";
import "./App.css";
import GameList from "./components/GameList/GameList";
import GameModal from "./components/GameModal/GameModal";
import ProfileCard from "./components/ProfileCard/ProfileCard";

function App() {
  return (
    <div className="App">
      <ProfileCard profilID="76561198042858555" />
      <GameList profilID="76561198042858555" />
    </div>
  );
}

export default App;
