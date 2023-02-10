import Comments from "./components/comments/comments";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="heading">
        <h2>Comment Section</h2>
      </div>
      <div className="main">
        <Comments currentUserId="1" />
      </div>
    </div>
  );
}

export default App;
