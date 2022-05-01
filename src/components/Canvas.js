import React, { useState } from 'react';
import Sketch from 'react-p5';

import './Canvas.css';

const Canvas = () => {
    const [penSize, setPenSize] = useState('15');

    let x = 50;
    let y = 50;
    
    let p5canvas;

    const setup = (p5, canvasParentRef) => {
		p5canvas = p5.createCanvas(640, 480);
        p5canvas.id('p5canvas');
        p5canvas.parent('canvas-wrapper');

        p5.background(255);
	};

	const draw = (p5) => {
		if (p5.mouseIsPressed) {
            p5.stroke(255,0,0);
            p5.strokeWeight(penSize);
            p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
        }
	};

    // press 'backspace' to clear canvas
    const keyPressed = (p5) => {
        if (p5.keyCode === p5.BACKSPACE) {
            p5.background(255);
        }
    }
    
    return (
        <div className='Canvas'>
            <div id='content'>

                <div id='instructions-div' className='left-align'>
                    <p>press backspace to clear canvas.</p>
                </div>

                <div id='canvas-wrapper'>
                    <Sketch setup={setup} draw={draw} keyPressed={keyPressed}/>
                </div>

                <div id='control-panel'>
                    <div id='control-panel-left'></div>
                    <div id='control-panel-right'>
                        <div id='stroke-control'>
                            <p>stroke weight: <span id='slider-val'>{penSize}</span></p>
                            <input 
                                id='stroke-slider' 
                                type='range' 
                                min='5' 
                                max='50'
                                value={penSize}
                                onChange={ (e) => setPenSize(e.target.value) }
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Canvas;