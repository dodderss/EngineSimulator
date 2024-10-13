import React, { Dispatch, SetStateAction } from 'react';
import Overlay from './ui/overlay';

interface OnlineHubProps {
    isOverlayOpen: boolean;
    setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
  }

function OnlineHub({isOverlayOpen, setIsOverlayOpen}: OnlineHubProps) {
    return (
        <Overlay isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen} title='Enginuity Hub' size="large">
        <p>Temp</p>
      </Overlay>
    );
};

export default OnlineHub;