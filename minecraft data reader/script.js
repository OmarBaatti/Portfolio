const connectInput = document.getElementById('input-list');
const refreshButton = document.getElementById('refresh-button');
const dataContainer = document.getElementById('data-container');

connectInput.addEventListener('change', readData);
refreshButton.addEventListener('click', readData);


const baselink = "https://api.mcstatus.io/v2/status/java/";
let link = baselink+"play.coralmc.it";


async function readData() {
    const connect = connectInput.value.trim(); //raccolgo connect
    if (!connect) {
        alert("Inserisci un connect valido!");
        return;
    } // controllo se esiste connect e non è vuoto

    try {
        const response = await fetch(baselink + connect); // richiesta a fivem
        if (!response.ok) {
            throw new Error("Errore nel recupero dei dati");
        } // controllo che il testo ci sia
        const data = await response.json(); // prendo la risposta json
        dataContainer.innerHTML = ''; // pulisco il div da output in modo da non sovrapporre risultati 
        displayData(data); // chiamata alla funzione che scrive i dati
    } catch (error) {
        console.error("Errore:", error); // se c'è un errore ri scrive in console
        alert("Errore nel recupero dei dati. Controlla il connect e riprova."); // e avvisa con alert
    }
}
function displayData(response) {
    console.log(response);
    const generalInfo = `
        <div class="data-section">
            <h2>Dati estratti</h2>
            <p><strong>MOTD:</strong> ${response.motd.html}</p>
            <p><strong>Version:</strong> ${response.version.name_html} (protocol = ${response.version.protocol})</p>
            <p><strong>Icona:</strong><br><img src="${response.icon}" alt="Server Icon"></p>
            <p><strong>Players:</strong> ${response.players.online}/${response.players.max}</p>
            <p><strong>Retrieved at:</strong> ${new Date(response.retrieved_at).toLocaleString()}</p>
            <p><strong>Expires at:</strong> ${new Date(response.expires_at).toLocaleString()}</p>

            <p><strong>Altre info:</strong></p>
            <ul>
                <li><p><strong>Host:</strong> ${response.host}</p></li>
                <li><p><strong>IP Address:</strong> ${response.ip_address}</p></li>
                <li><p><strong>Porta:</strong> ${response.port}</p></li>
                <li><p><strong>Software:</strong> ${response.software}</p></li>
                <li><p><strong>srv record:</strong> ${response.srv_record?`${response.srv_record.host}:${response.srv_record.port}`:response.srv_record}</p></li>
                <li><p><strong>Online:</strong> ${response.online}</p></li>
                <li><p><strong>EULA Blocked:</strong> ${response.eula_blocked}</p></li>
            </ul>
        </div>
    `;
    dataContainer.innerHTML += generalInfo;
    //players.list plugins mods
}