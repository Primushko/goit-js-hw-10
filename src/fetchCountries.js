const URL = `https://restcountries.com/v3.1/name`;
// експортуєм функцію fetchCountries яка приймає параметр з назвою країни
//  і повертає Promise у форматі JSON.які містять: країна, столиця, населення, прапор та мови.
export function fetchCountries(name) {
    return fetch(
        `${URL}/${name}?fields=name,capital,population,flags,languages`
    ).then(response => {
        if (!response.ok) {
          // Якщо відповідь API не успішна, функція викидає помилку з повідомленням "Data fail!".
          // Це робиться за допомогою виклику throw new Error().
            throw new Error(`Data fail!`);
        }
        return response.json();
    });
}

