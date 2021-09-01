const inputField = document.getElementById('searchInput')
const searchBtn = document.getElementById('search-btn')
const countryContainer = document.getElementById('country-container')
const errorId = document.getElementById('error')
const countyDetails = document.getElementById('country-details')


const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle
}

searchBtn.addEventListener('click',function () {
    const inputText = inputField.value;
    
    //condition
    if (inputText === '') {
        errorId.textContent = 'your search input is empty'
        return;
    }
    toggleSpinner('block')
    // clear input field
    countryContainer.textContent = '';
    countyDetails.textContent = '';
    // console.log(inputText,'ami kaj pair'); 
    const url = `https://restcountries.eu/rest/v2/name/${inputText}`;
    // spinner.classList.remove('block')
    fetch(url)
    .then(res => res.json())
    .then(data => displayCountry(data))
    .finally(() => inputField.value = '');
    // inputField.value = '';
});
function displayCountry(countryArray) {
    
        if (countryArray.status == 404){
            errorId.innerText = 'NO Result Found',toggleSpinner('none');
        }else{
            errorId.innerText = '';
        }
        // console.log(data);

        countryArray.forEach(item => {
            // console.log(item.flag);
            
            const div = document.createElement('div');
            div.classList.add('col-md-3');
            div.innerHTML = `
            <div class="rounded overflow-hidden border p-2">
            <img
              src="${item.flag}"
              class="w-100"
              alt=""
            />
          </div>

          <div
            class="
              py-2
              d-flex
              justify-content-between
              align-items-center
              d-md-block
              text-md-center
            "
          >
            <h1>${item.name}</h1>
            <button onclick="loadDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
          </div>
            `
            countryContainer.appendChild(div)
        });
        toggleSpinner('none')
    
}
function loadDetails(alpha3Code) {
    fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
    .then(res => res.json())
    .then(data => {
        countyDetails.classList.add('flag')
        countyDetails.innerHTML =`
        <div class="col-md-12 text-center">
        <img src=" ${data.flag}" class="img-fluid img-thumbnail" alt="...">
        <h4>Country:${data.name} </h4>
        <p>Capital: <span class="fw-bold">${data.capital}</span></p>
        <p>Language: <span class="fw-bold">${data.languages[0].nativeName}</span></p>
        <p>Money-Call: <span class="fw-bold">${data.currencies[0].name}</span></p>
        <p>Money-Symbol: <span class="fw-bold">${data.currencies[0].symbol}</span></p>
        </div>
        `
    })

}
// function dispalyDetails(array){
//     console.log('work');
// }