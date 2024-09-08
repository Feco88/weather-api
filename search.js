function searchWeather() {
    const searchInput = document.getElementById('search');
    const city = searchInput.value //az input mezőbe bevitt értéket eltároljuk

    // Ellenőrizzük, hogy a beírt város nem üres érték -e?
    if (city === '') {
        alert('Kérem adjon meg egy várost!');
        return;
    }

    // Axios konfiguráció az API kéréshez
    const options = {
        method: 'GET',
        url: `https://visual-crossing-weather.p.rapidapi.com/forecast?location=${city}&aggregateHours=24&contentType=json&unitGroup=metric`, //az aktuálisan beírt város nevét írja be az URL-be
        headers: {
            'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
            'X-RapidAPI-Key': '74b8338749msh5234e2bc43dbd57p1748bcjsnb5352012027a'
        }
    };

    // Kérés elküldés az API-hoz axios-szal
    axios(options)
    .then(response => {
        // A response objektumból kinyerjük az időjárási adatokat
        const currentConditions = response.data.locations[city].currentConditions;
        
        // Ellenőrizzük, hogy az adatok megfelelően vannak-e formázva és elérhetőek-e
        if (currentConditions && 'temp' in currentConditions && 'humidity' in currentConditions) {
            // Frissítjük a DOM elemeket a kinyert adatokkal
            document.getElementById('location').textContent = city;
            document.getElementById('temperature').textContent = currentConditions.temp;
            document.getElementById('humidity').textContent = currentConditions.humidity;
        } else {
            // Ha az adatok hiányosak vagy nem találhatók, akkor hibát iratunk ki
            alert('Az időjárási adatok hiányosak vagy nem találhatók.');
        }
    })
        //hibakeresés
    .catch(err => {
        console.error('Hiba az időjárási adatok lekérése közben:', err);
        alert('Hiba az időjárási adatok lekérése közben. Kérjük, próbálja újra később.');
    });
}