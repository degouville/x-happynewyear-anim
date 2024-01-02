import './style.styl'

const heart = document.querySelector('.heart')
const stars = document.querySelectorAll('.star')
const points = document.querySelectorAll('.point')
const firework = document.querySelector('.explosion')

const rand = (min = 0, max = 1, multiplier = 1) => 
  (~~(Math.random() * (max - min + 1)) + min) * multiplier

const runMicroAnims = a => {
  a.forEach(e => {
    const shrinkTimeout = setTimeout(() => e.classList.add('is-shrinking'), 100)
    const blinkTimeout = setTimeout(() => {
        e.style.animationDuration = `${ rand(100, 800) }ms`
        if(rand() < .5) e.classList.add('is-blinking')          
      }, rand(10, 400)
    )

    e.setAttribute('data-shrink-timeout', shrinkTimeout)
    e.setAttribute('data-blink-timeout', blinkTimeout)
  })
}

const reset = n => {
  Array.from(n).forEach(e => {
    e.classList.remove('is-blinking')
    e.classList.remove('is-shrinking')

    clearTimeout(e.getAttribute('data-shrink-timeout'))
    clearTimeout(e.getAttribute('data-blink-timeout'))
  })
}

const animate = () => {
  heart.classList.remove('is-beating')
  firework.classList.add('is-exploding')

  setTimeout(() => {
    runMicroAnims(stars) 
    runMicroAnims(points) 

    setTimeout(() => heart.classList.add('is-beating'), 400)
  }, 800)

  setTimeout(() => {
    firework.classList.remove('is-exploding')

    reset(stars)
    reset(points)
  }, 1900)
}

const animationInterval = setInterval(() => animate(), 2000)

const stopAnimations = () => {
  clearInterval(animationInterval)
  reset(stars)
  reset(points)
}

window.onload = animate
window.onbeforeunload = stopAnimations