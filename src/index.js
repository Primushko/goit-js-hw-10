import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('#country-list');
const countryInfo = document.querySelector('#country-info');

searchBox.addEventListener('input', debounce(onSearch, 300));
//  `https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages`
function onSearch() {
    const name = searchBox.value.trim();
    if (name === '') {
    clearResults();
    return;
    }
    fetchCountries(name)
    .then(countries => {
        if (countries.length > 10) {
        Notiflix.Notify.info(
            'Too many matches. Please enter a more specific query!'
        );
        } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountriesList(countries);
        } else if (countries.length === 1) {
        renderCountryCard(countries[0]);
        } else {
        Notiflix.Notify.failure(
            'Oops, no country found! Please enter a valid name.'
        );
        }
    })
    .catch(error => {
        Notiflix.Notify.failure(
        'Oops, something went wrong! Please try again later.'
        );
        console.log(error);
    });
}

function renderCountriesList(countries) {
    const markup = countries
    .map(country => {
        return `
        <li class="country-item">
        <img class="country-flag" src="${country.flags.svg}" alt="${
        country.name.official
        } flag">
        <h3 class="country-name">${country.name.official}</h3>
        <p class="country-population">Population: ${country.population.toLocaleString()}</p>
        <p class="country-capital">Capital: ${country.capital[0]}</p>
        </li>
    `;
    })
    .join('');
    countryList.innerHTML = markup;
}

function renderCountryCard(country) {
    const languages = Object.values(country.languages)
    .map(lang => lang.name)
    .join(', ');
    const markup = `
    <div class="country-card">
        <img class="country-flag" src="${country.flags.svg}" alt="${
    country.name.official
    } flag">
        <div class="country-info">
        <h2 class="country-name">${country.name.official}</h2>
        <p class="country-population">Population: ${country.population.toLocaleString()}</p>
        <p class="country-capital">Capital: ${country.capital[0]}</p>
        <p class="country-languages">Languages: ${languages}</p>
        </div>
    </div>
    `;
    countryInfo.innerHTML = markup;
}

function clearResults() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}





