import './sass/main.scss';
import fetchCountries from "./js/fetchCountries";
import getRefs from "./js/refs";
import countryTmp from './templates/countryTmp.hbs';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

const refs = getRefs()

refs.searchForm.addEventListener("input", debounce(onInputSearch, 500))

function onInputSearch(e) {
    refs.countriesContainer.innerHTML = "";
    refs.countryContainer.innerHTML = "";
    const inputValue = e.target.value.trim()
    if (!inputValue) {
        return
    }
    fetchCountries(inputValue).then(data => {
        if (data.length >= 2 && data.length < 10) {
            displayCountryList(data);
        }
        else if (data.length === 1) {
        displayCountry(data[0]);
      }
        else {
        error({ delay: 2500, text: 'Sorry, nothing was found. Please enter more specific data' });
        }
    })
    .catch(() => {
      error({ delay: 2500, text: 'Wops, something went wrong. Please try again later' });
    })
}

function displayCountry(countryData) {
  refs.countryContainer.innerHTML = countryTmp(countryData);
}

function displayCountryList(countriesData) {
  refs.countriesContainer.innerHTML = countriesData
    .map(country => `<li class="country">${country.name}</li>`)
    .join('');
  refs.countriesContainer.addEventListener('click', e => {
    displaySelectedCountry(e, countriesData);
  });
}

function displaySelectedCountry(e, countriesData) {
  countriesData.forEach(countryData => {
    if (countryData.name === e.target.textContent) {
      refs.searchForm.value = e.target.textContent;
      displayCountry(countryData);
      refs.countriesContainer.innerHTML = '';
    }
  });
}

refs.clearButton.addEventListener('click', () => {
  refs.countryContainer.innerHTML = '';
  refs.countriesContainer.innerHTML = '';
  refs.searchForm.value = '';
});