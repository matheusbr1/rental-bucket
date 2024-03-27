import React, { useState, useEffect } from 'react';
import { Container, Tooltip } from '@material-ui/core';
import { AppBar } from 'components/AppBar';
import { useSelector } from 'react-redux'
import axios from 'axios'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { IDefaultRootState, IWork } from 'interfaces';
import { removeMask } from 'utils/formatters';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const Map: React.FC = () => {
  const works = useSelector<IDefaultRootState, IWork[]>(state => state.works.all)

  const [points, setPoints] = useState<any[]>([])

  async function convertToCoordinates(work: IWork) {
    try {
      const cep = removeMask(work.address.CEP)
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      const data = response.data;
      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        const coordinates = {
          lat: location.lat,
          lng: location.lng
        }
        setPoints(points => [...points, { ...work, coordinates }])
      } else {
        console.error('Geocoding failed. Status:', data.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function convertAllToCoordinates() {
    const CEPs = works
      .filter(work => !work.is_done)
      .map(convertToCoordinates)
    await Promise.all(CEPs)
  }

  useEffect(() => {
    convertAllToCoordinates()
  }, [])

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
          center={{
            lat: -23.55777688954754,
            lng: -46.792403583963974
          }}
          zoom={13}
        >
          {points.map(point => {
            const client = `Cliente: ${point.customer.name}\n`
            const CEP = `CEP: ${point.address.CEP}\n`
            const street = `Rua: ${point.address.street}\n`
            const neighborhood = `Bairro: ${point.address.neighborhood}\n`
            const number = `Número: ${point.address.neighborhood}\n`
            const service = `Serviço: ${point.work_type.name}\nQuantidade: ${point.quantity}`
            const quantity = `Quantidade: ${point.quantity}`
            const title =
              client +
              (CEP + street + neighborhood + number) +
              (service + quantity)

            return (
              <Tooltip key={point.coordinates.lat} title={title} placement='top' >
                <Marker position={point.coordinates} />
              </Tooltip>
            )
          })}
        </GoogleMap>
      )}
    </Container>
  )
}

export default Map