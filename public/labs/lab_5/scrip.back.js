const { map } = require("cypress/types/bluebird")

function mapInit() {
    //following leaflet tutorial

    const map = L.map('mapid').setView([38.9897, -76.9378], 13)

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamprLXNsaW0iLCJhIjoiY2ttNWI2N3JpMDA0bjJ4czljbnJ2ZXduMCJ9.O3oURce55SgioPx4vX4GVA'
    }).addTo(mymap);

    return map;
}

async function dataHandler(mapObjectFromFunction){
    //assignment 1 data handling code
    //targeting mapObjectFromFunction to attach markers
}

async function windowActions() {

    const map = mapInit();
    await dataHandler(map);

    const form = document.querySelector('search-form');
    const search = document.querySelector('#search');
    const targetList = document.querySelector('.target-list');
    const replyMessage = document.querySelector('reply-message');

    const request = await fetch('/api');
    const data = await request.json();

    form.addEventListener('submit', async (event)=>{
        
        event.preventDefault();
        console.log('form submitted');

        const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
        console.table('filtered');

        filtered.forEach((item) => {

            const longLat = item.geocoded_column_1.coordinates;
            console.log('markerLongLat', longLat[0], longLat[1]);
            const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromMapFunction);

            const appendItem = document.createElement('li');
            appendItem.classList.add('block');
            appendItem.classList.add('list-item');
            appendItem.innerHTML = `<div class="list-header is-size-5"> ${item.name}</div><address class="is-size-6"> ${item.address_line_1} </address>`;
            targetList.append(appendItem);
            
        });
    });

}

window.onload = windowActions;