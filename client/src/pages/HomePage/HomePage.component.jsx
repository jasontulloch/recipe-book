import React from 'react';
import { isBrowser } from 'react-device-detect';
import WorldMapPage from '../WorldMapPage/WorldMapPage.component';
import HomePageMobile from './HomePageMobile.component';


const HomePage = () => {

  return (
    <div>
    {(isBrowser) ? (
      < WorldMapPage />
    ) : (
      < HomePageMobile />
    )}
    </div>

  )
}

export default HomePage;
