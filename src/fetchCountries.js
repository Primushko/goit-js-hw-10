
// function fetchCountries(name) {
//     const baseUrl = `https://restcountries.com/v3.1/all`;
//     const url = `${baseUrl}?fields= name.official,capital,population,flags.svg,languages`;
//     return fetch(url)
//     .then(response => {
//         if (response.ok) {
//         return response.json();
//         }
//         throw new Error('Error fetching countries.');
//     })
//     .catch(error => console.log(error));
// }

// fetch(
//     `https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages`
// ).then(response => {
//     console.log(response.json());
//     response.json().then()
//     return response.json();
// });