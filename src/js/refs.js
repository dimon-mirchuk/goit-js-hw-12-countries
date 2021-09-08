export default function getRefs() {
    return {
      countriesContainer: document.querySelector('.countries-list'),
      countryContainer: document.querySelector('.country-container'),
      searchForm: document.querySelector('.country-input'),
      clearButton: document.querySelector('.country-clear-button'),
    };
  }