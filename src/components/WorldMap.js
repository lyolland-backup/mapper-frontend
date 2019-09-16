import React, { Component } from "react";
import worlddata from "./world";
import { geoMercator, geoPath } from "d3-geo";
class WorldMap extends Component {
  render() {
    const projection = geoMercator();
    const pathGenerator = geoPath().projection(projection);
    const countries = worlddata.features.map((d, i) => (
      <path key={d.id} d={pathGenerator(d)} className="countries" />
    ));
    console.log(countries)
    return (
      <svg width="100%" height="auto">
        {countries}
      </svg>
    );
  }
}
export default WorldMap;
