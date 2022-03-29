//click button next prev
var slides = document.querySelector('.slider-item').children;
var nextSlide = document.querySelector('.right-slide');
var prevSlide = document.querySelector('.left-slide');
var totalSlides = slides.length;
var index = 0;

//navigation
var items = document.querySelectorAll('.item');
var manualBtns = document.querySelectorAll('.manual-btn');
let currentSlide = 1;

console.log(items);
console.log(manualBtns);

var manualNav = function(manual){
    items.forEach((item) => {
        item.classList.remove('active');
        manualBtns.forEach((btn) => {
            btn.classList.remove('active');
        })
    })

    items[manual].classList.add('active');
    manualBtns[manual].classList.add('active');
}

setInterval(() =>{
    manualNav(index);
    currentSlide = index;
    index++;
    console.log(index);
    if(index > 4){
        index = 0;
    }
}, 5000)

manualBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        manualNav(index);
        currentSlide = index;
    })
})

function next(direction) {
    if(direction == "next"){
        index++;
        if(index == totalSlides) {
            index = 0;
        }
    }else {
        if(index == 0){
            index = totalSlides -1;
        }else{
            index--;
        }
    }
    for(i = 0 ; i < slides.length; i++){
        slides[i].classList.remove("active");
    }
    manualNav(index);
    slides[index].classList.add("active");
}

nextSlide.onclick = function () {
    next("next");
}

prevSlide.onclick = function () {
    next("prev")
}