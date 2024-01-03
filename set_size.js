const img = new Image();
img.onload = function() {
  let imgWidth = this.width;
  let imgHeight = this.height;
  // console.log(imgWidth,imgHeight)
}

img.src = '/img/Сайт/reisen udongein inaba, houraisan kaguya, inaba tewi, and yagokoro eirin (touhou) drawn by otomeza_ryuseigun - a02a75152ec750da61541414416c6bd2.jpg'





const showClientWidth = function() {
  const clientWidth= document.body.clientWidth;
  const clientHeight = document.body.clientHeight
  const getInput = document.getElementById("text");
  getInput.value = `w: ${clientWidth}    h: ${clientHeight}`;
}

showClientWidth()


const imgHeight = function() {
  const aboutSiteImg = document.querySelector('.about_site-img')
  aboutSiteImg.style.height = aboutSiteImg.offsetWidth / img.width * img.height + 'px'
}

imgHeight()

const blogCardHeight = function(width) {
  const blogCardArr = document.querySelectorAll('.blog-card')
  blogCardArr.forEach((blogCard)=>{
    blogCard.style.width = width * .4 + 'vw'
    blogCard.style.height = width * .6 + 'vw'
  })
}

window.addEventListener('resize',(e) => {
  showClientWidth()
  imgHeight()
  blogCardHeight()
  // canvasHeight(input)
})


const setContainerWidth = function(width) {
  const containerArr = document.querySelectorAll('.container')
  containerArr.forEach((container)=>{
    container.style.width = width+'vw'
  })
}

const canvasHeight = function(width) {
  const canvasArr = document.querySelectorAll('.canvas')
  canvasArr.forEach((canvas)=>{
    let canvasWidth = visualViewport.width * width / 100
    let canvasHeight = canvasWidth / canvas.width * canvas.height
    canvas.width = canvasWidth
    canvas.height = canvasHeight
  })
}


const containerWidthInput = document.querySelector('.containerWidth_input')
const input = containerWidthInput.value || 90
setContainerWidth(input)
// canvasHeight(input)
imgHeight()
blogCardHeight(input)
containerWidthInput.onchange = function () {
  const input = containerWidthInput.value
  setContainerWidth(input)
  // canvasHeight(input)
  imgHeight()
  blogCardHeight(input)
}


// Object.defineProperties(Number.prototype,{
//
// })


// console.log(Number(2))


// Number.prototype. =  {
//   console.log(this)
// }

// console.log(Number.prototype)

