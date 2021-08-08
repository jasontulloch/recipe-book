import React, { memo, useState, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom'
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = ({ setTooltipContent, history }) => {

  const countryRecipesHandler = (e) => { 
    history.push('/recipes', { countryName: e }) 
  }

  return (
    <div>
      <ComposableMap data-tip="" projectionConfig={{ scale: 225 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={(e) => countryRecipesHandler(geo.properties.NAME)}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      setTooltipContent(`${NAME}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: "#71881B",
                        outline: "none"
                      },
                      hover: {
                        fill: "#aacc2b",
                        outline: "none",
                        cursor: 'pointer'
                      },
                      pressed: {
                        fill: "#aacc2b",
                        outline: "none"
                      }
                    }}
                  />
              ))
            }
          </Geographies>
      </ComposableMap>
    </div>
  );
};

export default withRouter(memo(WorldMap));
