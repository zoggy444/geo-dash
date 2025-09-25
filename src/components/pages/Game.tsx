import { MapContainer } from 'react-leaflet'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import type { GeoJsonObject } from 'geojson';
import type { LeafletEvent, } from 'leaflet';

import departmentData from '../../../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../../../data/regions-version-simplifiee.json';
import { MAP_CENTER } from '../../utils/constants';

import '../../index.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import 'leaflet/dist/leaflet.css';
import GamePrompter from "./GamePrompter";

import type { GeoDataType, GeoFeatureType } from '../../types/types';
import type { GameProps } from '../../types/propsTypes';
import { styled } from '@linaria/react';
import { theme } from '../../theme/theme';
import Panel from '../reusable-ui/Panel';
import MapControl from '../reusable-ui/MapControl';
import Button from '../reusable-ui/Button';

function Game({
  gameMode,
  toGuess,
  victory,
  guessedCorrectly,
  guessedIncorrectly,
  dptGuessMap,
  regGuessMap,
  onAreaClick,
  onNewRoundClick,
  onSettingsClick,
  onStartGameClick,
}: GameProps) {

  const geojsonData: GeoDataType = gameMode === 'region' ? regionData : departmentData;;
  const areaMap: Map<string, string> = gameMode === 'region' ? regGuessMap : dptGuessMap;;


  const onGeoJsonClick = (e: LeafletEvent) => {
    const layer = e.propagatedFrom;
    const name = layer.feature.properties.nom;
    return onAreaClick(name);
  }

  const onGeoJsonMouseOver = (e: LeafletEvent) => {
    const layer = e.propagatedFrom;
    // Highlight the hovered area without changing color
    layer.setStyle({
      weight: 3, // Increase stroke width to highlight
      fillOpacity: 0.6 // Increase fill opacity
    })
  }

  const onGeoJsonMouseOut = (e: LeafletEvent) => {
    const layer = e.propagatedFrom;
    // Reset the style when mouse leaves
    layer.setStyle({
      weight: 1, // Reset stroke width
      fillOpacity: 0.4 // Reset fill opacity
    });
  }

  return (
  <GameStyled> 
    <MapContainer
        center={MAP_CENTER}
        dragging={false}
        zoom={6}
        scrollWheelZoom={false}
        zoomControl={false}
        >
      {/* special key for area to guess to force a rerender on third fail guess and allow className to change*/}
      {geojsonData.features.map((f) => (
        <GeoJSON
          key={`${f.properties.nom === toGuess ? guessedIncorrectly.length >=3 ? 'failed-' : 'to-guess-' : '' }${f.properties.code}`}
          data={f as GeoJsonObject}
          style={getGeoJsonStyle(f, areaMap, guessedIncorrectly, toGuess)}
          eventHandlers={{
          click: onGeoJsonClick,
          mouseover: onGeoJsonMouseOver,
          mouseout: onGeoJsonMouseOut
          }}>
        </GeoJSON>
      ))}
      <MapControl key='topleft' position='topleft'>
        <Panel>
          {/* @todo: ghost variant*/}
          <Button label="Quit Game" onClick={onSettingsClick}/>
        </Panel>
      </MapControl>
      <MapControl key='bottomleft' position='bottomleft'>
        <GamePrompter toGuess={toGuess} victory={victory} guessedCorrectly={guessedCorrectly}
            guessedIncorrectly={guessedIncorrectly}
            onStartGameClick={onStartGameClick}
            onNewRoundClick={onNewRoundClick}/>
      </MapControl>
    </MapContainer>
    
  </GameStyled>
  )
}

function getGeoJsonStyle(f:GeoFeatureType, areaMap: Map<string, string>, guessedIncorrectly: string[], toGuess:string | null) {
  return {
    color: `${ !areaMap.get(f.properties.code) ? theme.colors.success : guessedIncorrectly.indexOf(f.properties.nom) !== -1 ? theme.colors.error : theme.colors.parchmentDark}`, weight: 1,
    fillColor: `${ !areaMap.get(f.properties.code) ? theme.colors.successLight : guessedIncorrectly.indexOf(f.properties.nom) !== -1 ? theme.colors.error : theme.colors.parchment}`,
    fillOpacity: 0.4,
    className: `
      area-${f.properties.code}
      ${f.properties.nom === toGuess ? 
        (
          guessedIncorrectly.length >=3 ?
          'failed' :
          'to-guess'
        ) :
        '' }`
    }
}

export default Game;

const GameStyled = styled.div`
  background-color: ${theme.colors.parchmentWhite};
`;