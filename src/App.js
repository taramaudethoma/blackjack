import background from "./blackjacktable.png"
import './App.css';
import NewGame from "./components/NewGame";



function App() {


  return (

    <div className="App">

      <div className="background" style={{ backgroundImage: `url(${background})` }}>

        <header className="App-header">
          <h1>Feeling Lucky?</h1>

        </header>

        < NewGame />

       
      </div>

    </div>

  );
}


export default App;
