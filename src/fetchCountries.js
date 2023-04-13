const URL = `https://restcountries.com/v3.1/name`;
export function fetchCountries(name) {
    return fetch(
        `${URL}/${name}?fields=name,capital,population,flags,languages`
    ).then(response => {
        if (!response.ok) {
            throw new Error(`Data fail!`);
        }
        return response.json();
    });
}

// export default function fetchCountries(name) {
//     const url = `https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags,languages`;
//     return fetch(url)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error('Error fetching countries.');
//         });    
//     }
