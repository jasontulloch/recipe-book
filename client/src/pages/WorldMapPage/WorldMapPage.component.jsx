import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

import { isBrowser } from 'react-device-detect';
import WorldMap from '../../components/WorldMap/WorldMap.component';

const WorldMapPage = () => {
  const [content, setContent] = useState("");
  return (
    <div style={{paddingTop: '0px', width: '100%', paddingLeft:'200px', paddingRight: '30px'}}>
      {(isBrowser) ? (
        <div>
          <WorldMap setTooltipContent={setContent} style={{paddingTop: '0px', width: '100%'}}/>
          <ReactTooltip>{content}</ReactTooltip>
        </div>
      ) : (
        <div style={{paddingTop:'70px', paddingLeft: '20px', textAlign: 'center'}}>
          <h3>Oops, looks like you found a page under construction.</h3>
          <h4 style={{paddingTop: '40px'}}>If you would like to access the world map, please use your computer or tablet device.</h4>
        </div>

      )}
    </div>
  );
}

export default WorldMapPage
