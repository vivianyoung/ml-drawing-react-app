import './App.css';
import React from 'react';

import Canvas from './components/Canvas';
import StylePanel from './components/StylePanel';

function App() {
  const canvasRef = React.createRef();
  const canvasImgRef = React.createRef();
  const styleImgRef = React.createRef();

  return (
    <div className="App">
      <div id="app-container">

        <Canvas 
          canvasRef={canvasRef} 
          canvasImgRef={canvasImgRef} 
        />

        <StylePanel 
          canvasRef={canvasRef}
          canvasImgRef={canvasImgRef} 
          styleImgRef={styleImgRef}
        />

      </div>
    </div>
  );
}

export default App;
