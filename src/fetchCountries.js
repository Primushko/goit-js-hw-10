
export default function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags,languages`;
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error fetching countries.');
        });    
    }
