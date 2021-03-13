function mapInit() {
    //following leaflet tutorial

    const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamprLXNsaW0iLCJhIjoiY2ttNWI2N3JpMDA0bjJ4czljbnJ2ZXduMCJ9.O3oURce55SgioPx4vX4GVA'
    }).addTo(mymap);

    console.log('mymap', mymap);
    return mymap;
}

async function dataHandler(mapFromLeaflet) {
    // use your assignment 1 data handling code here
    // and target mapObjectFromFunction to attach markers
    //Get the json data then push it into the array
    //const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    //const empty = "";
    //const places = [];


    const form = document.querySelector('#search-form');
    const search = document.querySelector('#search');
    const targetList = document.querySelector('.target-list');
    const replyMessage = document.querySelector('.reply-message');


    const request = await fetch('/api'); //grapping stuff from restaurant apis
    const data = await request.json();// putting in array as json values
    
    // this code fires when your form submits
    //it filters our data list and returns it to the html
    form.addEventListener('submit', async (event)=>{

        targetList.innerText = '';

        event.preventDefault();
        console.log('form submited', search.value);

        // this code makes sure that each returned restaurant has value that can be plotted on the map
        const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
        const topFive = filtered.slice(0,5);

        if (topFive.length<1) {
            replyMessage.classList.add('box');
            replyMessage.innerText = 'No Matches Found';
        }
        else{
            console.table(topFive);
            topFive.forEach((item) => {

                const longLat = item.geocoded_column_1.coordinates;
                console.log('markerLongLat', longLat[0], longLat[1]);
                const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromLeaflet);
    
                const appendItem = document.createElement('li');
                appendItem.classList.add('block');
                appendItem.classList.add('list-item');
                appendItem.innerHTML = `<div class="list-header is-size-5"> ${item.name}</div><address class="is-size-6"> ${item.address_line_1} </address>`;
                targetList.append(appendItem);
                
            });


            const {coordinates} = topFive[0]?.geocoded_column_1;
            console.log('viewSet coords', coordinates);
            mapFromLeaflet.panTo(coordinates[1], coordinates[0],0);
        }
        
        search.addEventListener('input', (event) => {
            console.log(input.target.value);
        });
    });
    
}
  
async function windowActions() {
    const map = mapInit();
    await dataHandler(map);
  }
  
  window.onload = windowActions;


