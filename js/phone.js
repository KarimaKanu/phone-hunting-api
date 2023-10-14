
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll );
}

const displayPhones = (phones, isShowAll) =>{
    phoneContainer = document.getElementById('phone-container');
    //clear previous content
    phoneContainer.textContent='';
     const showAllContainer = document.getElementById('show-all-container');
    
    if(phones.length>9 && !isShowAll)
    {
        showAllContainer.classList.remove('hidden');
    }
    else
    {
        showAllContainer.classList.add('hidden');
    }
     //shows only first 9 phones
if(!isShowAll)
{
    phones=phones.slice(0,9);
}

    phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure>
            <img
              src="${phone.image}"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
            </div>
          </div>
    `
    //append child
    phoneContainer.appendChild(phoneCard);
    

})
loadingSpinner.classList.add('hidden');
}

const handleSearch = (isShowAll) => {
    loadingSpinner.classList.remove('hidden');
    const searchField1 = document.getElementById('search-field');
const searchField = searchField1.value;
    loadPhone(searchField, isShowAll);
    //console.log(searchField);
}
    const loadingSpinner = document.getElementById('loading-spinner');
    const handleShowAll = () => {
        handleSearch(true);
    }
    
const handleShowDetails = async (id) =>
{
    //console.log("clicked", id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    //console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);

}
const showPhoneDetails = (phone) =>
{
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;
    const showModalContainer = document.getElementById('show-modal-container');
    showModalContainer.innerHTML =`
    <img src="${phone.image}" />
    <p>Storage <span>${phone?.mainFeatures?.storage}</span></p>
    `
    console.log(phone);
    show_details_modal.showModal();
}

    

