import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

//import "./styles.css";

import WorldMap from '../../components/WorldMap/WorldMap.component';

const WorldMapPage = () => {
  const [content, setContent] = useState("");
  return (
    <div>
      <WorldMap setTooltipContent={setContent}/>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default WorldMapPage
