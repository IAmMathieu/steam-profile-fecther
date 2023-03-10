import './App.css';
import GameList from './components/GameList/GameList';
import ProfileCard from './components/ProfileCard/ProfileCard';

function App() {
  return (
    <div className="App">
      <ProfileCard />
      <GameList />
    </div>
  );
}

export default App;
