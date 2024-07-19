'use client'

import { TooltipProvider } from '@/components/ui/tooltip';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
  })

  return (
    <TooltipProvider>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={11}
          center={{
            lat: -23.55774738545756,
            lng: -46.79262889133513
          }}
        >
          <Marker position={{
            lat: -23.55774738545756,
            lng: -46.79262889133513
          }} />
          <Marker position={{
            lat: -23.55507232790729,
            lng: -46.78305876963619
          }} />
          <Marker position={{
            lat: -23.55229540796138,
            lng: -46.74817058763666
          }} />
        </GoogleMap >
      )
      }
    </TooltipProvider>
  )
}