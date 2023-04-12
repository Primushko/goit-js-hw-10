import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

fetch(
    `https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages`
).then(response => {
    return response.json();
})
    .then(name => {
        console.log(name);
    })
    .catch(error => {
        console.log(error);
    });

// const searchBox = document.querySelector('#search-box');
// const countryList = document.querySelector('#country-list');
// const countryInfo = document.querySelector('#country-info');

// searchBox.addEventListener('input', debounce(onSearch, 300));

// function onSearch() {
//     const name = searchBox.value.trim();
//     if (name === '') {
//     clearCountryContainer();
//     return;
//     }
//     fetchCountries(name)
//     .then(countries => {
//         if (countries.length > 10) {
//         Notiflix.Notify.info(
//             'Too many matches Please enter a more specific query!'
//         );
//         } else if (countries.length >= 2 && countries.length <= 10) {
//         renderCountriesList(countries);
//         } else if (countries.length === 1) {
//         renderCountryCard(countries[0]);
//         } else {
//         Notiflix.Notify.failure(
//             'Oops, no country found! Please enter a valid name.'
//         );
//         }
//     })
//     .catch(error => {
//         Notiflix.Notify.failure(
//         'Oops, something went wrong! Please try again later.'
//         );
//         console.log(error);
//     });
// }
// function renderCountriesList(countries) {
//     const markup = countriesListTpl(countries);
//     countryList.innerHTML = markup;
// }

// function countriesListTpl(countries) {
//     return countries
//     .map(
//         country => `
//         <li class="country">
//         <div class="country__wrapper">
//             <h2 class="country__name">${country.name.official}</h2>
//             <img class="country__flag" src="${country.flags.svg}" alt="${country.name.official} flag">
//         </div>
//         </li>
//     `
//     )
//     .join('');
// }

// function renderCountryCard(country) {
//     const markup = countryCardTpl(country);
//     countryInfo.innerHTML = markup;
// }

// function clearCountryContainer() {
//     countryList.innerHTML = ``;
// }

