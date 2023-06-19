document.addEventListener('DOMContentLoaded', (event) => {

    let game = {
        health: 1,
        damage: 1,
        souls: 0
    }

    let k = 0
    let n = 0
    const colorArr = [ 'green', 'azure', 'yellow', 'orange', 'red', 'black' ]

    let skills_open = document.getElementById('skills_open')
    let skills_menu = document.getElementById('skills_menu')
    let skill_1 = document.getElementById('skill_1')
    let skills_close = document.getElementById('skills_close')


    document.getElementById('skills_open').addEventListener('click', (event) => {
        skills_open.classList.add('skills_open_remove')
        skills_menu.classList.add('skills_menu_open')
        skill_1.classList.add('skill_1_add')
        skills_close.classList.add('skills_close_add')
    })

    document.getElementById('skills_close').addEventListener('click', (event) => {
        skills_open.classList.remove('skills_open_remove')
        skills_menu.classList.remove('skills_menu_open')
        skill_1.classList.remove('skill_1_add')
        skills_close.classList.remove('skills_close_add')
    })




    let healthEl = document.getElementById('health')
    let damageEl = document.getElementById('damage')
    let soulsEl = document.getElementById('souls')

    let healthBlock = document.getElementById('click_block')
    let damageBlock = document.getElementById('skill_1')
    let soulsBlock = document.getElementById('souls')

    healthEl.textContent = game.health
    damageEl.textContent = game.damage
    soulsEl.textContent = game.souls
    healthBlock.classList.add(colorArr[0])



    healthBlock.addEventListener('click', (event) => {
        game.health = game.health - game.damage
        if (game.health > 0) {
            healthEl.textContent = game.health
        }
        else {
            if (n < 5) {
                healthBlock.classList.replace(colorArr[n], colorArr[n+1])
            }
            else {
                healthBlock.classList.replace(colorArr[n], colorArr[n-5])
                n -= 6
            }
            k++
            n++
            game.health = 1 + k
            healthEl.textContent = game.health
            game.souls++
            soulsEl.textContent = game.souls
        }
        let currentHealth = healthEl.textContent
    })


    
    damageBlock.addEventListener('click', (event) => {
        if (game.souls >= game.damage) {
            game.souls -= game.damage
            game.damage ++
            damageEl.textContent = game.damage
            soulsEl.textContent = game.souls
        }
        else {
            return
        }

        
    })

})
