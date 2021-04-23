import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

//import "./styles.css";

import WorldMap from '../../components/WorldMap/WorldMap.component';

const WorldMapPage = () => {
  const [content, setContent] = useState("");
  return (
    <div style={{paddingTop: '0px', width: '100%', paddingLeft:'30px', paddingRight: '30px'}}>
      <WorldMap setTooltipContent={setContent} style={{paddingTop: '0px', width: '100%'}}/>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default WorldMapPage
