        //aggiungere mappa di maps e dividere meglio le sezioni mantenendo roba
        // opzione per satellite su maps con cambio input in metri

        // `<iframe src="${getMapsEmbedLink()}" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>`

        //invece di mapsh si puo usare metri con quindi 10000m alla fine invece di 16z max 2815494m 12338189m z indica normale m satellite con metri

        // cambiare gli update con eventlisteners

        //GLOBAL VARS
        let OSMH=16;//profondità osm
        let MapsH=16;//profondità maps
        let MapsM=1000;//altezza in metri maps (per satellite ed embed)

        let latitude;//latitudine
        let longitude;//longitudin
        let date;//data ricevimento dati

        let maps;//oggetto con link maps
        let osm;//oggetto con link osm
        let mapse;//oggetto con embed maps
        let mapsl;//oggetto con label profondità maps
        let mapsml;//oggetto con label altezza maps
        let osml;//oggetto con label profondità osm
        const innerBox=getI("innerBox");//oggetto da riempire
        const titolo=getI("title");//oggetto con titolo

        let map;//mappa OSM

        let geo=navigator.geolocation;//variabile per geolocation
        if(geo){
            geo.getCurrentPosition(
                function(success) {//SUCCESS se la richiesta va a buon fine (nome anche della variabile con la response)
                    console.log("Posizione ottenuta con successo:", success);
                    latitude = success.coords.latitude;
                    longitude = success.coords.longitude;
                    date = new Date (success.timestamp);
                    
                    titolo.innerText="GeoData Extracted"
                    // getI("").innerHTML=``
                    getI("detailsBox").innerHTML=`
                    <p><strong>Data:</strong> ${date.toLocaleString()}</p>
                    <p><strong>Latitudine:</strong> ${latitude}</p>
                    <p><strong>Longitudine:</strong> ${longitude}</p>
                    `
                    getI("MapsBox").innerHTML=`<h2>Google Maps</h2>
                    <label for="mapsH" id="labgmaps">Profondità = 16</label>
                    <input type="range" min="3" max="21" id="MapsH" value="16" onchange="updateMapsH(this.value)">
                    <a href="${getMapsLink()}" target="_blank" id="gmaps">Visita sul sito</a>
                    
                    <hr sty>

                    <label for="mapsM" id="labm">Altezza (metri) = 1000</label>
                    <input type="range" min="49" max="950" id="MapsM" value="100" onchange="updateMapsM(this.value)">
                    <iframe src="${getMapsEmbedLink()}" width="750" height="450"  allowfullscreen id="mapse"></iframe>`
                    getI("OSMBox").innerHTML=`
                    <h2>OpenStreetMap</h2>
                    <a href="${getOSMLink()}" target="_blank" id="osm">Visita sul sito</a><br>
                    <label for="OSMH" id="labosm">Profondità = 16</label>
                    <input type="range" min="0" max="19" id="OSMH" value="16" onchange="updateOSMH(this.value)">
                    <div id="map" style="width: 100%; height: 400px;"></div>
                    `
                    /*innerBox.innerHTML=`
                    <p><strong>Data:</strong> ${date.toLocaleString()}</p>
                    <p><strong>Latitudine:</strong> ${latitude}</p>
                    <p><strong>Longitudine:</strong> ${longitude}</p>

                    <hr>
                    <div id="MapsBox">
                    <h2>Google Maps</h2>
                    <a href="${getMapsLink()}" target="_blank" id="gmaps">Visita sul sito</a><br>
                    <label for="mapsH" id="labgmaps">Profondità = 16</label>
                    <input type="range" min="3" max="21" id="MapsH" value="16" onchange="updateMapsH(this.value)">

                    <label for="mapsM" id="labm">Altezza (metri) = 1000</label>
                    <input type="range" min="49" max="950" id="MapsM" value="63" onchange="updateMapsM(this.value)">

                    <iframe src="${getMapsEmbedLink()}" width="750" height="450" frameborder="0" style="border:0" allowfullscreen id="mapse"></iframe>
                    </div>
                    <div id="OSMBox">
                    <h2>OpenStreetMap</h2>
                    <a href="${getOSMLink()}" target="_blank" id="osm">Visita sul sito</a><br>
                    <label for="OSMH" id="labosm">Profondità = 16</label>
                    <input type="range" min="0" max="19" id="OSMH" value="16" onchange="updateOSMH(this.value)">
                    <div id="map" style="width: 100%; height: 400px;"></div>
                    </div>
                    `*/
                    osm=getI("osm");
                    osml=getI("labosm");
                    maps=getI("gmaps");
                    mapse=getI("mapse")
                    mapsl=getI("labgmaps");
                    mapsml=getI("labm");
                    
                    // Inizializzo mappa
                    map = L.map('map').setView([latitude, longitude], OSMH); // Imposta la vista sulla posizione ottenuta

                    // Layer di street Map
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    // Marker sulle cordinate (con popup con la scritta 'La tua posizione')
                    L.marker([latitude, longitude]).addTo(map)
                        .bindPopup('La tua posizione')
                        .openPopup();
                },
                function(error) {
                    console.error("Errore nel recupero della posizione:", error);
                    alert("Errore nel recupero della tua posizione :(\nSe il problema persiste contatta un amministratore del sito")
                },
                {
                    enableHighAccuracy: true, // opzione per non forzare l'alta precisione (io la forzo)
                    timeout: 5000, // Tempo massimo di attesa in millisecondi (opzionale)
                    maximumAge: 0 // per fare in modo che non venga usata una posizione memorizzata in cache (opzionale)
                }
            )
        } else {
            alert("Come ti permetti a non autorizzarmi >:(")
        }

        function updateMapsH(height){
            MapsH=height;
            maps.href=getMapsLink();
            mapsl.innerText=`Profondità = ${MapsH}`;
        }

        function updateMapsM(height){
            console.log("entrata")
            function approssimaGrandezza(num){
                const ordineGrandezza = Math.floor(Math.log10(num));//ottengo l'ordine del numero per numeri tra 1 e 9 sarà 0, per numeri tra 10 e 99 sarà 1, per numeri tra 100 e 999 sarà 2 ecc...
                const fattore = Math.pow(10, ordineGrandezza-1);// una volta fatto elevo 10 a quel numero - 1 perchè voglio approssimare alla seconda cifra più...
                const arrotondato = Math.round(num / fattore) * fattore;
                return arrotondato;
            }
            MapsM=approssimaGrandezza(Math.pow(height,5)/10000000);//height alla terza diviso mille per rendere l'input range esponenziale
            // ho fatto prove con height alla seconda e dato che si arriva all'ordine dei milioni conviene usare alle quinta / 10 milioni msecondo i miei test
            // Calcola l'ordine di grandezza del numero
            mapse.src=getMapsEmbedLink();
            mapsml.innerText=`Altezza (metri) = ${MapsM}`;
        }

        function updateOSMH(height){
            OSMH=height;
            osm.href=getOSMLink();
            osml.innerText=`Profondità = ${OSMH}`;
            map.setView([latitude, longitude], OSMH);
        }

        function getMapsLink(){
            function convertToDMS(lat, lon) {//funzione perchè serve solo qui per comodità
                function toDMS(coord, isLatitude) { //funzione dentro per comodità e riutilizzo codice con isLatitude
                    const absolute = Math.abs(coord);
                    const degrees = Math.floor(absolute);
                    const minutesNotTruncated = (absolute - degrees) * 60;
                    const minutes = Math.floor(minutesNotTruncated);
                    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);

                    // Determina la direzione (N, S, E, W)
                    let direction;
                    if (isLatitude) {
                        direction = coord >= 0 ? 'N' : 'S';
                    } else {
                        direction = coord >= 0 ? 'E' : 'W';
                    }
                    return `${degrees}°${minutes}'${seconds}"${direction}`;
                }
                // Converto lat e lon
                const latDMS = toDMS(lat, true);
                const lonDMS = toDMS(lon, false);
                // Combina i risultati
                return `${latDMS}+${lonDMS}`;
            }
            
            return `https://www.google.com/maps/place/${encodeURIComponent(convertToDMS(latitude,longitude)).replace(/%2B/g, '+')}/@${latitude},${longitude},${MapsH}z`
            // dopo vari test ho capito che va encodato perchè viene messo come href e i link non possono avere alcuni caratteri.
            //invece il replace è perchè uri codifica il + in %2B e quindi con una regex faccio replace perchè invece l'url lo lascia normale.
        }
        function getMapsEmbedLink(){
            return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d${MapsM}!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sit!2sit`
        }

        function getOSMLink(){
            return `https://www.openstreetmap.org/#map=${OSMH}/${latitude}/${longitude}`
        }

        function getI(id){
            return document.getElementById(id);
        }