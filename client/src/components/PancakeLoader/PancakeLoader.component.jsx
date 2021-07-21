import React from 'react';
import './PancakeLoader.styles.css';

const PancakeLoader = ({ children }) => {

  return (
    <div className="pancakeLoader-container">
      <h1 className="pancakeLoader-label">{children}</h1>
      <div id="pancakeLoader-cooking">
        <div class="pancakeLoader-bubble"></div>
        <div class="pancakeLoader-bubble"></div>
        <div class="pancakeLoader-bubble"></div>
        <div class="pancakeLoader-bubble"></div>
        <div class="pancakeLoader-bubble"></div>
        <div id="pancakeLoader-area">
          <div id="pancakeLoader-sides">
            <div id="pancakeLoader-pan"></div>
            <div id="pancakeLoader-handle"></div>
          </div>
          <div id="pancakeLoader-pancake">
            <div id="pancakeLoader-pastry"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PancakeLoader;
