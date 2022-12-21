import * as React from 'react';

import { MapProps } from './Interfaces/ConfigMap';
import { useLeafletMap } from './useLeafletMap';

const LeafletMap: React.FunctionComponent<{ config: MapProps }> = ({
  config,
}) => {
  const { start, reset, mapContainer, initConfig } = useLeafletMap(config);

  React.useEffect(() => {
    if (!mapContainer) {
      start();
    } else {
      initConfig();
    }
  }, [mapContainer]);

  React.useEffect(() => {
    if (mapContainer) {
      reset();
    }
  }, [config.center, config.id, config.markers, config.layers]);

  return <div id={config.id} style={config.style} className="map"></div>;
};

// TODO Define to validate data input
/*if (process.env.NODE_ENV !== "production") {
    Map.propTypes= {
      id: PropTypes.string,
      style: {
        width: PropTypes.string,
        height: PropTypes.string
      }
    };
  }*/

export default LeafletMap;
