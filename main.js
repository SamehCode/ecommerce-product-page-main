let productImgs = Array.from(document.querySelector('.all-products').children);
let minusBtn = document.querySelector('.count .minus');
let plusBtn = document.querySelector('.count .plus');
let counterSpan = document.getElementById('counter');
let prevImg = document.querySelector('.products .preview img')
let counter = 0;
let cart = document.getElementById('cart');
let checkOut = document.getElementById('checkout');
let name = document.querySelector('.info .title'),
    discount = document.querySelector('.discount'),
    desc = document.querySelector('.info .desc'),
    price = document.getElementById('total'),
    cover = document.querySelector('.landing .preview img'),
    quantity = document.querySelector('.price .quantity'),
    total = document.querySelector('.price .total'),
    deleteBtn = document.querySelector('.delBtn');

// handling product cart
let addCart = document.querySelector('.add-cart');
let cartTitle = document.getElementById('title'),
    cardImg = document.getElementById('cover'),
    cartDiscount = document.getElementById('discount'),
    cartQuantity = document.querySelector('.price .quantity'),
    cartPrice = document.querySelector('.product .price .total');

let left = document.getElementById('left'),
    right = document.getElementById('right');
let toggle = document.getElementById('toggle');

toggle.onclick = function() {
    document.querySelector('ul.links').classList.toggle('show');
}
let index = 0;
left.onclick = function() {
    index--
    console.log(index)
    if(index < 0) {
        index = productImgs.length - 1
    }
    productImgs.forEach(product => product.classList.remove('active'))
    productImgs[index].classList.add('active')
    console.log(productImgs)
}
right.onclick = function() {
    console.log(productImgs)
    index++ 
    if(index == productImgs.length) {
        index = 0
    }
    productImgs.forEach(product => product.classList.remove('active'))
    productImgs[index].classList.add('active')
}
console.log(productImgs)
productImgs.forEach((product, idx)=> {
    product.addEventListener('click', e => {
        productImgs.forEach((product, idx) => product.classList.remove('active'))
        e.target.parentElement.classList.add('active')
        prevImg.src = `./images/image-product-${idx + 1}-thumbnail.jpg`;
        fetch('./products.json')
        .then(respone => {
            let data = respone.json()
            return data
        })
        .then(data => {
            data = data.products;
            name.innerHTML = data[idx].name;
            desc.innerHTML = data[idx].text;
            discount.innerHTML = '$' + (data[idx].discount);
            price.innerHTML = '$' + (data[idx].price);
            
            console.log(data)
        })
    })
})

minusBtn.onclick = function() {
    counter--
    if(counter < 0) {
        counter = 0
    }
    counterSpan.innerHTML = counter
}
plusBtn.onclick = function() {
    counter++
    counterSpan.innerHTML = counter
}

cart.onclick = function() {
    checkOut.classList.toggle('show')

};

addCart.addEventListener('click', function() {
    checkOut.classList.add('show');
    document.querySelector('.product').querySelector('button').classList.add('show')
    cardImg.src = document.querySelector('.product.active').querySelector('img').src
    cartTitle.innerHTML = name.innerHTML;
    deleteBtn.classList.add('icon-trashcan')
    document.querySelector('.contain .empty').innerHTML = '';
    cartDiscount.innerHTML = discount.innerHTML;
    cartQuantity.innerHTML = 'x' + counter;
    total.innerHTML = `$${parseFloat(discount.innerHTML.slice(1) * counter).toFixed(2)}`;
    document.querySelector('#cart .count').innerHTML = counter
})

// fetch('./products.json')
// .then(respone => {
//     let data = respone.json()
//     return data
// })
// .then(data => {
//     console.log(data.products)
// })


deleteBtn.addEventListener('click', e => {
    document.querySelector('.product').querySelector('button').classList.remove('show')
    cardImg.src = ''
    cartTitle.innerHTML = '';
    deleteBtn.classList.remove('icon-trashcan')
    document.querySelector('.contain .empty').innerHTML = 'Your cart is empty';
    cartDiscount.innerHTML = '';
    cartQuantity.innerHTML = '';
    total.innerHTML = ``;
})

let allLinks = Array.from(document.querySelector('ul.links').children);

allLinks.forEach(li => {

    
    li.addEventListener('click', function(e) {
        allLinks.forEach(li => li.classList.remove('active'));
        e.target.classList.add('active')
    })

})
