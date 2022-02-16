import axios from "axios";

async function getDataCountries (country) {
    const countries = document.getElementById('countriesData');
    const errorMessage = document.getElementById('error-message');
    try {
        errorMessage.innerHTML = '';
        const result = await axios.get('https://restcountries.com/v2/name/'+ country);


        console.log(result.data);


        countries.innerHTML = `
              <div>
              <img src="${result.data[0].flag}"/>
              <h3>${result.data[0].name}</h3>
              </div>
              <hr></hr>
              <p>${result.data[0].name} is situated in ${result.data[0].subregion} and has a population of ${result.data[0].population}</p>
              <p>The capital is ${result.data[0].capital} ${getCurrencies(result.data[0].currencies)}</p>
              <p>${getLanguages(result.data[0].languages)}</p>
            `;
        countries.style.visibility = 'visible';

  } catch (e) {
        countries.innerHTML = '';
        countries.style.visibility = 'hidden';
        errorMessage.innerHTML = 'Wat je heeft geschreven is geen land';
        console.error(e);
  }
}

document.getElementById('searchButton').addEventListener('click', () => {
    getDataCountries(document.getElementById('searchInput').value);
});

document.getElementById('searchInput').addEventListener('keyup', () => {
 getDataCountries(document.getElementById('searchInput').value);

});




// getDataCountries()

function getCurrencies(currency) {
    if (currency.length === 2) {
        return `and you can pay with ${currency[0].name} and ${currency[1].name}`
    }
    else {
        return `and you can pay with ${currency[0].name}`
    }
}

function getLanguages(language) {
    if (language.length === 1) {
        return `They speak ${language[0].name}`
    } else {
      let messageLang = 'They speak ';
        for (let i = 0; i < language.length; i++) {
            if (i === 0) {
                messageLang += language[i].name;
            }else if (i>0 && i< (language.length - 1)) {
                messageLang += ', ' + language[i].name;
            } else {
                messageLang += ' and ' + language[i].name;
            }

        }
        return messageLang;
    }
}

//They speak [language], [language] and [language]