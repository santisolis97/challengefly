import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Movies></Movies>
      </div>
    </div>
  );
}

export default App;
