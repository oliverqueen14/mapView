async function getFile(filePath) {
	const response = await fetch(filePath);
	const data = await response.text();
	return data;
}

async function main() {
	const urlParams = new URLSearchParams(window.location.search);
	const arg1 = urlParams.get('arg1');
	const arg2 = urlParams.get('arg2');
	const arg3 = urlParams.get('arg3');
	const arg4 = urlParams.get('arg4');
	const text = arg3;
	const x = arg1;
	const y = arg2;

	
	const firstThreeCharacters = arg4.substring(0, 3);
	console.log('Les 3 premiers caractères du fichier sont :', firstThreeCharacters);

	const numberX = parseFloat(y);
	const numberY = parseFloat(x);
	console.log('Les nombres contenus dans les fichiers x.txt et y.txt sont :', numberX, numberY);

	const map = L.map('map').setView([numberX, numberY], 3);
	console.log('Les coordonnées du centre de la carte sont :', numberX, numberY);
	// Définir les styles des frontières des pays
	function countryStyle(feature) {
		return {
			fillColor: 'gray',
			weight: 1,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.7
		};
	}

	// Charger les données GeoJSON des frontières des pays
	fetch('countries.geo.json')
		.then(response => response.json())
		.then(data => {
			L.geoJSON(data, {
				style: countryStyle
			}).addTo(map);
		});

	// Définir les styles spécifiques pour les États-Unis
	const usaStyle = {
		fillColor: 'blue',
		weight: 2,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7
	};

	// Charger les données GeoJSON des frontières des États-Unis
	fetch('countries/' + firstThreeCharacters + '.geo.json')
		.then(response => response.json())
		.then(data => {
			L.geoJSON(data, {
				style: usaStyle
			}).addTo(map);
		});
	L.marker([numberX, numberY]).addTo(map) // Coordonnées du centre de la France
		.bindPopup(arg3)
		.openPopup();
		//add a tile layer
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
		}).addTo(map);
}

main();