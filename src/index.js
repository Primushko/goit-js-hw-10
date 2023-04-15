import './css/styles.css';       
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
// імпортує функцію debounce з пакету lodash.debounce. 
// дозволяє затримати виконання функції onSearchCountry на 300 мілісекунд
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
// константа, яка визначає затримку для функції debounce.
const refs = {
    input: document.getElementById(`search-box`),
    countryList: document.querySelector(`.country-list`),
    countryInfo: document.querySelector(`.country-info`),
};
// посилання на елементи сторінки, що використовуються для відображення результатів пошуку.

refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));
// функція додає подію вводу на текстове поле з пошуковим запитом. 
//onSearchCountry викликається зі затримкою 300 мілісекунд, використовуючи функцію debounce.

function onSearchCountry(e) {
    e.preventDefault();
  // функція викликається при введенні запиту в поле пошуку. Вона викликає функцію fetchCountries,
  //  щоб отримати інформацію про країни та відображати їх на сторінці.
    const inputValue = e.target.value.trim();
    if (!inputValue) {
    resetMarkup(refs.countryList);
    resetMarkup(refs.countryInfo);
    return;
    }
    fetchCountries(inputValue)
    .then(dataCountry => {
        if (dataCountry.length > 10) {
        Notiflix.Notify.info(
            'Знайдено занадто багато збігів. Будь ласка, введіть більш конкретну назву'
        );
        } else if (dataCountry.length >= 2) {
        resetMarkup(refs.countryList);
        createMarkupCountryList(dataCountry);
        resetMarkup(refs.countryInfo);
        } else {
        resetMarkup(refs.countryInfo);
        createMarkupCountryInfo(dataCountry);
        resetMarkup(refs.countryList);
        }
    })
    .catch(() => {
        resetMarkup(refs.countryList);
        resetMarkup(refs.countryInfo);
        Notiflix.Notify.failure('На жаль, країни з такою назвою не існує');
    });
}


// createMarkupCountryList()-приймає масив країн та створює HTML-розмітку списку країн. 
// Для кожної країни в списку створюється елемент списку (li) з прапором та назвою країни.
function createMarkupCountryList(dataCountry) {
    const markup = dataCountry
    .map(({ name, flags }) => {
        return `<li class="country-list__item">
        <img class="country-list__img" src="${flags.svg}" alt="flag" />
        <p class="country-list__text">${name.official}</p>
        </li>`;
    })
    .join('');
    return refs.countryList.insertAdjacentHTML('beforeend', markup);
}


// createMarkupCountryInfo()-приймає масив країн та створює HTML-розмітку інформації про країну.
// для кожної країни в масиві створюється новий елемент
function createMarkupCountryInfo(dataCountry) {
    const markup = dataCountry
    .map(({ name, capital, population, flags, languages }) => {
        return `
    <div class="country__flag">
    <img class="country__img" src="${flags.svg}" alt="flag">
    <p class="country__name">${name.official}</p>
    </div>
    <ul class="country__info">
        <li class="country__item"> <b>Capital</b>:
    <span class="country__span">${capital}</span>
        </li>
        <li class="country__item"> <b>Population</b>:
    <span class="country__span">${population}</span>
        </li>
        <li class="country__item"> <b>Languages</b>:
    <span class="country__span">${Object.values(languages).join(', ')}</span>
        </li>
    </ul>`;
    })
    .join('');

    return refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function resetMarkup(el) {
    el.innerHTML = '';
}
// У функції resetMarkup() використовується властивість innerHTML,  
// яка дозволяє отримати або змінити HTML-вміст елемента.
// приймає елемент el і встановлює його HTML-вміст в порожній рядок, що очищає вміст. 
// очищає список країн та блок







