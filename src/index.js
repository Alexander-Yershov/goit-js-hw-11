import './css/styles.css';
import debounce from "lodash.debounce";
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchPixabay from './moduleJS/fetchPixabay.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const DEBOUNCE_DELAY = 300;

const inpuSearchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inpuSearchBox.addEventListener('input', debounce(activeInput,DEBOUNCE_DELAY,{ leading: false }));
function activeInput(e){
    e.preventDefault();
const name = inpuSearchBox.value.trim();
fetchCountries(name);
if (name.length >= 1) {
    fetchCountries(name)
      .then((res) => {
        
        if (res.length > 10) {
          countryList.innerHTML = "";
          countryInfo.innerHTML = "";
          return Notify.info("Too many matches found. Please enter a more specific name.");
        }

        updateIfo(res,countryList,countryInfo);
      })
      .catch((error) => {
        Notify.failure("Oops, there is no country with that name");
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
      });
  }
};


function updateIfo(countries, countryList, countryInfo) {
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
  
  
    if (countries.length < 1) {
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
      return;
    }
  
    if (countries.length === 1) {
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
       const countryBlock =
        countries.map(
            ({ name, flags, capital, population, languages }) =>
            
      `<img class="country__flag" src="${flags.svg}" alt="Flag of ${name}">
      <p class="country__name">${name}</p>
      <p class="country__capital">Capital: ${capital}</p>
      <p class="country__population">Population: ${population}</p>
      <p class="country__languages">Languages:
      ${languages.map((e) => e.name).join(", ")}</p>`)
          .join("");
       countryInfo.insertAdjacentHTML("beforeend",countryBlock);
      return;
    }
  
    const countriesMarkup = countries
      .map(({ name, flags }) =>
      `<li>
            <img class="country__item--flag" src="${flags.svg}" alt="Flag of${name}">
            <span class="country__item--name">${name}</span>
       </li>`
      )
      .join("");
  
      countryList.insertAdjacentHTML("beforeend", countriesMarkup);
  }
  
  
 

