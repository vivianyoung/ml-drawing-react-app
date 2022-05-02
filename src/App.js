import './App.css';

import Canvas from './components/Canvas';
import StylePanel from './components/StylePanel';

function App() {
  return (
    <div className="App">
      <div id="app-container">
        <Canvas />
        <StylePanel />
      </div>
    </div>
  );
}

export default App;
