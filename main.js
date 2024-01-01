import './style.styl'

const heart = document.querySelector('.heart')
const stars = document.querySelectorAll('.star')
const points = document.querySelectorAll('.point')
const firework = document.querySelector('.explosion')

const rand = (min = 0, max = 1, multiplier = 1) => 
  (~~(Math.random() * (max - min + 1)) + min) * multiplier

const genRandomBlink = a =>
  a.forEach(e => {
    setTimeout(() => e.classList.add('is-shrinking'), 100)
    setTimeout(
      () => {
        if (rand() < .5) {
          const duration = rand(100, 800)
          e.style.animationDuration = `${ duration }ms`
          e.classList.add('is-blinking')          
        }
      },
      rand(10, 400)
    )
  })

const resetBlink = n =>
  Array.from(n).forEach(e => {
    e.classList.remove('is-blinking')
    e.classList.remove('is-shrinking')
  })

setInterval(() => {
  heart.classList.remove('is-beating')
  firework.classList.add('is-exploding')

  setTimeout(() => {
    genRandomBlink(stars) 
    genRandomBlink(points) 

    setTimeout(() => {
      heart.classList.add('is-beating')
    }, 400)
  }, 800)

  setTimeout(() => {
    firework.classList.remove('is-exploding')

    resetBlink(stars)
    resetBlink(points)
  }, 1900)
}, 2000)