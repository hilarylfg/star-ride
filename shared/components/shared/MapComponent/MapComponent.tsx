"use client";

import {YMaps, Map} from '@pbe/react-yandex-maps';

export function MapComponent() {
    return (
        <>
            <div className="map">
                <YMaps query={{apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY, }}>
                    <Map
                        defaultState={{center: [55.751574, 37.573856], zoom: 10}}
                        options={{
                            copyrightUaVisible: false,
                            copyrightProvidersVisible: false,
                            copyrightLogoVisible: false,
                        }}
                        width="500px"
                        height="100vh"
                    >
                    </Map>
                </YMaps>
            </div>
        </>

    )
}