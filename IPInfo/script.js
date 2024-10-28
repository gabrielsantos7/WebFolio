const getIPButtonElement = document.querySelector("#getIPButton");
const mainElement = document.querySelector("main");

const apiUrl = 'https://ipapi.co/json'

const getIPAddress = async function () {
  const fetchResponse = await fetch(apiUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!fetchResponse.ok) {
    throw new Error("Erro ao buscar IP. Tente novamente mais tarde.");
  }

  return await fetchResponse.json();
};

document.addEventListener("DOMContentLoaded", async function () {
    try {
      const ipData = await getIPAddress();
      const { ip, version, org, latitude, longitude, city, region, country_name } = ipData;
      mainElement.innerHTML = `
        <div id="ip-info">
          <div>
            <h2>Seu endereço IP (${version}):</h2>
            <p>${ip}</p>
            <button id="copy">Copiar</button>
            <h2>Provedor:</h2>
            <p>${org}</p>
            <h2>Localização:</h2>
            <p>${city}, ${region}, ${country_name}</p>
          </div>
          <div id="map"></div>
        </div>
      `;

      document.querySelector('#copy').addEventListener('click', function() {
        navigator.clipboard.writeText(ip);
        document.querySelector('#copy').textContent = 'IP copiado!';

        setTimeout(() => {
          document.querySelector('#copy').textContent = 'Copiar';
        }, 2000);
      })

      new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(),
          }),
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([longitude, latitude]),
          zoom: 16,
        }),
      })
    } catch (error) {
      mainElement.innerHTML += `<p class="error">${error.message}</p>`;
    }
});
