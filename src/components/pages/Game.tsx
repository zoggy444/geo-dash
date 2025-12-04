import { MapContainer, Pane } from 'react-leaflet'
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
  gameStage,
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
    return onAreaClick(name, e.originalEvent.pageX, e.originalEvent.pageY);
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
        doubleClickZoom={false}
        >
      <Pane name="success" style={{ zIndex: 10 }}/>
      <Pane name="failure" style={{ zIndex: 40 }}/>
      <Pane name="yet-to-guess" style={{ zIndex: 20 }}/>
      {/* Random key to force a rerender everytime. Else, className changes won't be applied.
        Furthermore, when a new area to guess was selected, it was the only one being rerendered, 
        Causing it's border to overlay on top of already guessed area, making it easy to spot.
        I couldn't find a better way to do this than a full map rerender each round.
      */}
      {geojsonData.features.map((f) => (
        <GeoJSON
          key={(+new Date * Math.random()).toString(36).substring(0,6)}
          data={f as GeoJsonObject}
          style={getGeoJsonStyle(f, areaMap, guessedIncorrectly, toGuess)}
          pane={`${ !areaMap.get(f.properties.code) ? "success" : guessedIncorrectly.indexOf(f.properties.nom) !== -1 ? "failure" : "yet-to-guess"}`}
          eventHandlers={{
            click: onGeoJsonClick,
            mouseover: onGeoJsonMouseOver,
            mouseout: onGeoJsonMouseOut,
          }}>
        </GeoJSON>
      ))}
      <MapControl key='topright' position='topright'>
        <Panel>
          {/* @todo: ghost variant*/}
          <Button label="Quit Game" onClick={onSettingsClick}/>
        </Panel>
      </MapControl>
      <GamePrompter toGuess={toGuess} gameStage={gameStage} guessedCorrectly={guessedCorrectly}
          guessedIncorrectly={guessedIncorrectly}
          onStartGameClick={onStartGameClick}
          onNewRoundClick={onNewRoundClick}/>
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