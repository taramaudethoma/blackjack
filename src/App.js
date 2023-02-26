import Scoreboard from "./components/Scoreboard";
import background from "./blackjacktable.png"
import './App.css';
import NewGame from "./components/NewGame";



function App() {


  return (

    <div className="App">

      <div className="background" style={{ backgroundImage: `url(${background})` }}>

        <header className="App-header">

        </header>

        < NewGame />

        <br />

        <br />

        <div className="container">

          <Scoreboard />

        </div>

      </div>

    </div>

  );
}


export default App;
