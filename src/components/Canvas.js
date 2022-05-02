import React, { useState } from 'react';
import Sketch from 'react-p5';
import chroma from "chroma-js";

import './Canvas.css';

const Canvas = () => {
    const [penSize, setPenSize] = useState('15');
    const [paintColor, setPaintColor] = useState('#000000');

    const [paletteEndColor1, setPaletteEndColor1] = useState('#900C3F');
    const [paletteEndColor2, setPaletteEndColor2] = useState('#DAF7A6');

    const [paletteColors, setPaletteColors] = useState(['#900c3f', '#aa3b3d', '#be613f', '#cb8749', '#d4ad5d', '#d8d27c', '#daf7a6']);

    let minPenSize = 5;
    let maxPenSize = 100;

    // let paletteColors = [];
    
    let p5canvas;
    const setup = (p5, canvasParentRef) => {
		p5canvas = p5.createCanvas(640, 480);
        p5canvas.id('p5canvas');
        p5canvas.parent('canvas-wrapper');

        p5.background(255);
	};

	const draw = (p5) => {
		if (p5.mouseIsPressed) {
            let strokeColor = p5.color(paintColor);
            p5.stroke(strokeColor);
            p5.fill(strokeColor);
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

    const updatePaletteColors = (colorString, colorNum) => {
        // set palette end colors
        switch (colorNum) {
            case 1:
                setPaletteEndColor1(colorString);
                break;
            case 2:
                setPaletteEndColor2(colorString);
                break;
            default:
                break;
        }

        // update color palette
        let paletteResults = chroma.scale( [paletteEndColor1, paletteEndColor2] ).mode('lch').colors(7);
        console.log(paletteResults);
        setPaletteColors(paletteResults);
    }
    
    const renderColorButtons = () => {
        let colorBtns = [];

        paletteColors.forEach((color, i) => {
            colorBtns.push(
                <div className='color-div'>
                    <button id={`colorBtn-${i}`} style={ { backgroundColor: `${ color }` } } value={color} onClick={(e) => setPaintColor(e.target.value)}>
                    </button>
                </div>
            );
        });

        return colorBtns;
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
                    <div id='stroke-control'>
                        <div>
                            <input 
                                id='stroke-slider' 
                                type='range' 
                                min={minPenSize} 
                                max={maxPenSize}
                                value={penSize}
                                onChange={ (e) => setPenSize(e.target.value) }
                            />
                        </div>

                        <div>
                            <p>pen size: <span id='slider-val'>{penSize}</span></p>
                        </div>
                    </div>

                    <div id='color-palette'>
                        {renderColorButtons()}
                    </div>

                    <div id='middle-colors-div'>
                        <div id='middle-left'>
                            <div className='middle-color color-picker'>
                                <input value={paletteEndColor1} type="color" id="color1" onChange={ (e) => updatePaletteColors(e.target.value, 1) }></input>
                            </div>

                            <div className='middle-color color-picker'>
                                <input value={paletteEndColor2} type="color" id="color2" onChange={ (e) => updatePaletteColors(e.target.value, 2) }></input>
                            </div>
                        </div>

                        <div id='middle-right'>
                            <div className='middle-color middle-color-filler'></div>
                            <div className='middle-color middle-color-filler'></div>
                            <div className='middle-color middle-color-filler'></div>

                            <div className='middle-color'>
                                <button id='greyscale-color-btn1' value='#ffffff' onClick={(e) => setPaintColor(e.target.value)}> </button>
                            </div>

                            <div className='middle-color'>
                                <button id='greyscale-color-btn2' value='#A5A5A5' onClick={(e) => setPaintColor(e.target.value)}> </button>
                            </div>

                            <div className='middle-color'>
                                <button id='greyscale-color-btn3' value='#000000' onClick={(e) => setPaintColor(e.target.value)}> </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Canvas;