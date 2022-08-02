'use strict';

let mapCenterCoords;

ymaps.ready(init);

function init() {

    getMapCoords ();

    const myMap = new ymaps.Map("map", {
        center: mapCenterCoords,
        zoom: 17
    });

    myMap.options.set('openBalloonOnClick', false);

    const myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map-pin.png',
        iconImageSize: [116, 106],
        iconImageOffset: [-58, -106]
    });

    myMap.geoObjects.add(myPlacemark);

    myMap.events.add('sizechange', function (e) {
        let currentMapCoords = myMap.getCenter();
        getMapCoords ();
        if ((currentMapCoords[0].toFixed(6) != mapCenterCoords[0])||(currentMapCoords[1].toFixed(6) != mapCenterCoords[1])) {
            myMap.setCenter(mapCenterCoords);
        };
    });
}

function getMapCoords () {
    const mapCenterCoordsDesk = [59.938437, 30.320629];
    const mapCenterCoordsMobile = [59.938635, 30.323118];

    mapCenterCoords = ( window.innerWidth > 768 ) ? mapCenterCoordsDesk : mapCenterCoordsMobile;
}