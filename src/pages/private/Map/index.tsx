import React from 'react';
import { Container, Tooltip } from '@material-ui/core';
import { AppBar } from 'components/AppBar';
import { useSelector } from 'react-redux'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { IDefaultRootState, IWork } from 'interfaces';
import { getTolltipContent } from './getTolltipContent';
import { useData } from 'hooks/useData';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const Map: React.FC = () => {
  const works = useSelector<IDefaultRootState, IWork[]>(state => state.works.all)

  const { company } = useData()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string
  })

  return (
    <Container style={{
      paddingRight: 0,
      paddingLeft: 0,
      maxWidth: 'unset',
      height: '100vh'
    }}>
      <AppBar />

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={11}
          center={{
            lat: Number(company?.address.lat),
            lng: Number(company?.address.lng)
          }}
        >
          {works
            .filter(w => !w.is_done)
            .map(w => (
              <Tooltip key={w.id} title={getTolltipContent(w)} placement='top' >
                <Marker position={{
                  lat: Number(w.address.lat),
                  lng: Number(w.address.lng),
                }} />
              </Tooltip>
            ))}
        </GoogleMap>
      )}
    </Container>
  )
}

export default Map