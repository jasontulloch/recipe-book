import React, { memo } from "react";
import { Link } from 'react-router-dom'
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = ({ setTooltipContent }) => {
  return (
    <div>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Link to={`/recipes/advanced-search-results/keywordCookTimeMin=0/keywordCookTimeMax=90/keywordCountry=${geo.properties.NAME}/page/1`}>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
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
                        fill: "#F53",
                        outline: "none",
                        cursor: 'pointer'
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                </Link>
              ))
            }
          </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(WorldMap);
