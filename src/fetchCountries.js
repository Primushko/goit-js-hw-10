const BASE_URL = `https://restcountries.com/v3.1`;
const FIELDS = `?fields=name,capital,population,flags.svg,languages`;


export default function fetchCountries(name) {
    const url = `${BASE_URL}/name/${name}${FIELDS}`;

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error fetching countries.');
        });    
}
