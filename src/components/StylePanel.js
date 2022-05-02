import React, { useState } from 'react';
import axios from 'axios';
import * as mi from '@magenta/image';

import './StylePanel.css';

// unsplash stuff
const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

// magenta stuff
const model = new mi.ArbitraryStyleTransferNetwork();

const StylePanel = (props) => {
    // state vars for api stuff
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState([]);
    const [imgSrc, setImgSrc] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [showImg, setShowImg] = useState(false);

    const fetchImages = () => {
        let fetchUrl = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_KEY}&query=${query}&per_page=10&page=${page}`;

        axios.get(fetchUrl, {headers: {}})
        .then( (response) => {
            // console.log(response);
            // console.log(`found ${response.data.total} results`);
            
            setShowResults(true);

            switch (response.data.total > 0) {
                case true:
                    setSearchData([...searchData, ...response.data.results]);
                    break;
                case false:
                    setSearchData([]);
                    break;
            }
        })
        .catch( (error) => {
            // console.log(error);

            setShowResults(false);
            setSearchData([]);
        });
    }

    const handleInputChange = (e) => {
        setPage(1);
        setQuery(e.target.value);
    }

    const handleDisplayMore = () => {
        setPage(page + 1);
        fetchImages();
    }

    const handleSearchImageClick = (e) => {
        setImgSrc(e.target.src);
        setShowImg(true);
    }

    const stylize = () => {
        
        const contentImg = props.canvasImgRef.current;
        const styleImg = props.styleImgRef.current;
        const stylizedCanvas = props.canvasRef.current.children[1];

        model.stylize(contentImg, styleImg)
        .then( (imageData) => {
            stylizedCanvas.getContext('2d').putImageData(imageData,0,0);
        });
    }

    const handleTransferClick = () => {
       model.initialize().then(stylize);
    }

    const handleUndoClick = () => {

    }
    
    return (
        <div className='StylePanel'>
            <div id='stylepanel-content'>

                <div id='instructions-div' className='left-align'>
                    <p>search for an image to style transfer:</p>
                </div>
             
                <div className='search-div'>
                    <input 
                        value={query} 
                        id='search-input' 
                        type='text' 
                        placeholder='search..' 
                        name='search'
                        onInput={(e) => handleInputChange(e)}
                    />

                    <button onClick={() => fetchImages()}>search</button>
                </div>


                { 
                    showResults ? 
                        <div className='search-results-div'>
                            <div className='results-content'>
                                {
                                    searchData.length > 0 ? 
                                        searchData.map((imgData) => (
                                            <div className='search-result-img-div'>
                                                <img className='search-result-img' src={imgData.urls.regular} onClick={(e) => handleSearchImageClick(e)}></img>
                                            </div>
                                        ))
                                    :
                                        (<p>no search results.</p>)
                                }

                                <div className='display-more-div'>
                                    <button onClick={() => handleDisplayMore()}>display more</button>
                                </div>
                            </div>
                            
                        </div>
                    : (<p>no search results.</p>)
                }

                {
                    showImg ?
                        <div>
                            <div className='selected-img-div'>
                                <img id='selected-img' src={imgSrc} ref={props.styleImgRef} crossOrigin="anonymous" />
                            </div>

                            <div className='transfer-btns-div'>
                                <button onClick={()=>handleUndoClick()}>undo style transfer</button>
                                <button onClick={()=>handleTransferClick()}>apply image style</button>
                            </div>
                        </div>
                    : (<p></p>)
                }
                
            </div>
        </div>
    );
}

export default StylePanel;