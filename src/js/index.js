document.addEventListener("DOMContentLoaded", function() {
  function showContent() {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');
  }

  if (document.readyState === 'complete') {
    showContent();
  } else {
    window.addEventListener('load', showContent);
  }
});

function menu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('show');
  
    if (menu.classList.contains('show')) {
        menu.style.top = '4.3rem';
    } else {
        menu.style.top = '-100%';
    }
  }

  // Sidebar
$(document).ready(function() {
    $("#toggle-sidebar").click(function() {
        $("#sidebar").toggleClass("translate-x-full");
    });
  
    $("#close-sidebar").click(function() {
        $("#sidebar").addClass("translate-x-full");
    });
  
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#sidebar').length && !$(e.target).closest('#toggle-sidebar').length) {
            $("#sidebar").addClass("translate-x-full");
        }
    });
  });
  function HandleDelete(button) {
    let productCard = button.parentElement.parentElement;
    let CartProduct = button.parentElement.parentElement.querySelector('.cp_name').textContent;
    productCard.remove();
    itemCount--;
    updateItemCountDisplay()
    updateTotalPrice();
    // Updating Disabled Product
    const Products = document.querySelectorAll('.p_name');
    Products.forEach(Product => {
      if(Product.textContent == CartProduct && Product.parentElement.parentElement.querySelector(".add_btn").classList.contains('bg-gray-500')){
        let button = Product.parentElement.parentElement.querySelector(".add_btn");
        button.textContent = 'Add to Cart';
        button.disabled = false;
        button.classList.add('bg-prime');
        button.classList.remove('bg-gray-500');
        button.classList.add('hover:bg-red-600');
        button.classList.remove('hover:bg-gray-600');
      }
    });
  }

  // Function to decrease quantity
  function decreaseQuantity(button) {
    let EachPriceElement = button.parentElement.parentElement.querySelector('.EachPrice');
    let SinglePriceElement = button.parentElement.parentElement.querySelector('.SinglePrice');
    let EachPrice = parseInt(EachPriceElement.textContent);
    let SinglePrice = parseInt(SinglePriceElement.textContent);
    let input = button.nextElementSibling;
    let value = parseInt(input.value);
    if (value > 1) {
      input.value = value - 1;
      let quantity = input.value
      updateSinglePrices(quantity, EachPrice, SinglePrice, SinglePriceElement)
    }
    updateTotalPrice();
  }

  // Function to increase quantity
  function increaseQuantity(button) {
    let EachPriceElement = button.parentElement.parentElement.querySelector('.EachPrice');
    let SinglePriceElement = button.parentElement.parentElement.querySelector('.SinglePrice');
    let EachPrice = parseInt(EachPriceElement.textContent);
    let SinglePrice = parseInt(SinglePriceElement.textContent);
    let input = button.previousElementSibling;
    let value = parseInt(input.value);
    input.value = value + 1;
    let quantity = input.value
    updateSinglePrices(quantity, EachPrice, SinglePrice, SinglePriceElement)
    updateTotalPrice();
  }
  function updateSinglePrices(quantity, EachPrice, SinglePrice, SinglePriceElement) {
    let Quantity = parseInt(quantity)
    SinglePriceElement.textContent = EachPrice * Quantity
    console.log( SinglePrice * Quantity);
  }


  function updateTotalPrice() {
    const singlePrices = document.querySelectorAll('.SinglePrice');
    let totalPrice = 0;
            
    singlePrices.forEach((price) => {
      totalPrice += parseInt(price.textContent);
    });
            
    const totalPriceDisplay = document.querySelector('.TotalPrice');
    totalPriceDisplay.textContent = totalPrice;
  }



  // Add to cart Functionality
  let itemCount = 0; 
  const productTemplate =
  `
    <div class="border-2 rounded-lg p-2 mb-4 flex items-center m-3 relative h-40 md:h-auto">
      <!-- Image -->
      <img class="w-16 h-24 object-cover object-center rounded cp_image" src="" alt="Product Image">

      <!-- Details -->
      <div class="ml-4 flex-1">
        <h2 class="text-sm font-semibold cp_name">Chicken Fajitas</h2>
        <p class="text-[.6rem] "> <span class="EachPrice">25</span>$/each</p>
        <!-- Counter to increase or decrease quantity -->
        <div class="flex items-center mt-2">
          <button class="bg-gray-200 px-2 py-1 rounded-l text-gray-600 btn" onclick="decreaseQuantity(this)">-</button>
          <input type="number" class="w-10 text-center border-t border-b border-gray-200 text-gray-600 appearance-none quantity" value="1">
          <button class="bg-gray-200 px-2 py-1 rounded-r text-gray-600 btn" onclick="increaseQuantity(this)">+</button>
        </div>
        <!-- Price -->
        <div class="absolute bottom-0 right-1  text-md font-semibold"> 
          <span class="SinglePrice">25</span>$
        </div>
      </div>


      <!-- Delete button -->
      <div class="absolute -top-2 -right-1 bg-white text-prime px-2 py-1 rounded-md text-xs"><button class="" onclick="HandleDelete(this)"><i class="fa-solid fa-trash"></i></button></div>       
    </div>
  `;

// Add event listener to the "Add to Order" buttons
const addToOrderButtons = document.querySelectorAll('.add_btn');
addToOrderButtons.forEach(button => {
button.addEventListener('click', addToCart);
});

function addToCart() {
  if($("#sidebar").hasClass("translate-x-full")){
    $("#sidebar").toggleClass("translate-x-full");
  }
  
  let ProductName = this.parentElement.parentElement.querySelector('.p_name').textContent;
  let ProductPrice = this.parentElement.parentElement.querySelector('.p_price').textContent;
  let productImage = this.parentElement.parentElement.querySelector('.p_img').getAttribute('src');

  const productCardTemplate = document.createElement('div');
  productCardTemplate.innerHTML = productTemplate;

  productCardTemplate.querySelector('.cp_name').textContent = ProductName;
  productCardTemplate.querySelector('.EachPrice').textContent = ProductPrice;
  productCardTemplate.querySelector('.SinglePrice').textContent = ProductPrice;
  productCardTemplate.querySelector('.cp_image').src = productImage;

  const cart = document.querySelector('.cart');
  cart.appendChild(productCardTemplate);
  this.textContent = 'Added to Cart';
  this.disabled = true;
  this.classList.remove('bg-prime');
  this.classList.add('bg-gray-500');
  this.classList.remove('hover:bg-red-600');
  this.classList.add('hover:bg-gray-600');
  itemCount++;
  updateItemCountDisplay()
  updateTotalPrice();
}
function updateItemCountDisplay() {
  const itemCountDisplay = document.querySelectorAll('.itemCount');
  itemCountDisplay.forEach(SingleItemCountDisplay => {
    SingleItemCountDisplay.textContent = itemCount;
    });
  
}
// FAQ
$(document).ready(function() {
  $('.faq-item').click(function() {
      $('.answer').not($(this).find('.answer')).slideUp();
      $(this).find('.answer').slideToggle();
  });
});

// Buttons 
const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const images = document.getElementById("images")
const cards = document.getElementById("cards")
const btn1Clicked= ()=>{
  console.log('clicked');
  btn1.classList.add("bg-second", "px-4", "rounded-md")
  btn2.classList.remove("bg-second", "px-4", "rounded-md")
  images.classList.remove("hidden")
  cards.classList.add("hidden")
}
const btn2Clicked= ()=>{
  console.log('clicked');
  btn1.classList.remove("bg-second", "px-4", "rounded-md")
  btn2.classList.add("bg-second", "px-4", "rounded-md")
  images.classList.add("hidden")
  cards.classList.remove("hidden")
}

//Dropdown for Mobile
$('.mobile_drop').click(function(){
  $('.mobile_drop ul').not($(this).find('ul')).hide('slow')
  $(this).find('ul').toggle('slow');
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".loader-wrapper").style.display = "none";
});
document.addEventListener("DOMContentLoaded", function() {
  const photos = document.querySelectorAll('.clickable-photo');

  photos.forEach(photo => {
      photo.addEventListener('click', function() {
          // Create a new full screen element
          const fullscreenImage = document.createElement('div');
          fullscreenImage.classList.add('fixed', 'inset-0', 'z-[100]', 'bg-black', 'bg-opacity-75', 'flex', 'justify-center', 'items-center');

          // Create an image element inside the full screen element
          const image = document.createElement('img');
          image.src = this.src;
          image.classList.add('max-h-full', 'max-w-full');

          // Append the image to the full screen element
          fullscreenImage.appendChild(image);

          // Append the full screen element to the body
          document.body.appendChild(fullscreenImage);

          // Add an event listener to close the full screen when clicking outside the image
          fullscreenImage.addEventListener('click', function() {
              document.body.removeChild(fullscreenImage);
          });
      });
  });
});