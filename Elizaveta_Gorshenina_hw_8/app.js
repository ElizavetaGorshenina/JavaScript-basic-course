'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

/* ---------------------my code---------------------*/

const cartIconWrapEl = document.querySelector(".cartIconWrap");
const cartIconEl = cartIconWrapEl.querySelector(".cartIcon");
const cartItemsNumEl = cartIconWrapEl.querySelector("span");
cartItemsNumEl.textContent = '0';
const cartPopupEl = document.querySelector('table');
cartIconEl.addEventListener('click', () => {
    cartPopupEl.classList.toggle('hidden');
});

const featuredItemEls = document.querySelectorAll(".featuredItem");
let cartObj = {};
featuredItemEls.forEach(el => el.addEventListener('click', event => {
    const theTarget = event.target.parentNode.parentNode.parentNode;
    if (event.target.tagName === 'BUTTON') {
        cartItemsNumEl.textContent = Number(cartItemsNumEl.textContent) + 1;

        const prodName = theTarget.querySelector(".featuredName").textContent;
        if (!Object.hasOwn(cartObj, prodName)) {
            cartObj[prodName] = {};
            cartObj[prodName].prodNum = 1;
            const prodPrice = theTarget.querySelector(".featuredPrice").textContent;
            cartObj[prodName].prodPrice = prodPrice;
        } else {
            cartObj[prodName].prodNum += 1;
        };
        
        if (document.querySelector('table').rows.length > 0) {
            for (let rowNum = document.querySelector('table').rows.length - 1; rowNum > 0; rowNum--) {
                cartPopupEl.deleteRow(rowNum);
            };
        };

        let totalSum = 0;
        for (let key in cartObj) {
            let newRow = cartPopupEl.insertRow(-1);
            let firstCell = newRow.insertCell(0);
            firstCell.appendChild(document.createTextNode(key));
            let secondCell = newRow.insertCell(1);
            secondCell.appendChild(document.createTextNode(`${cartObj[key].prodNum} шт.`));
            let thirdCell = newRow.insertCell(2);
            thirdCell.appendChild(document.createTextNode(cartObj[key].prodPrice));
            let forthCell = newRow.insertCell(3);
            let totalProdSum = Number(cartObj[key].prodNum) 
            * Number(cartObj[key].prodPrice.trim().slice(1,));
            forthCell.appendChild(document.createTextNode(`$${totalProdSum}.00`));
            totalSum += totalProdSum;
        }

        const totalRow = cartPopupEl.insertRow(-1);
        const oneCell = totalRow.insertCell(0);
        oneCell.appendChild(document.createTextNode(`Товаров в корзине на сумму: $${totalSum}.00`));
        const totalSumEl = cartPopupEl.querySelector('tbody').lastChild.lastChild;
        totalSumEl.classList.add('totalSum');
        totalSumEl.setAttribute("colspan", "4");
    }
}));