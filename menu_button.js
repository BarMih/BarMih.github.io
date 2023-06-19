document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('menu_btn').addEventListener('click', (event) => {
        document.getElementById('menu').classList.toggle('menu_button_clicked')
        document.getElementById('menu_btn').classList.toggle('menu_btn_clicked')

    })

    function closeMenu() {
        document.getElementById('menu').classList.remove('menu_button_clicked')
        document.getElementById('menu_btn').classList.remove('menu_btn_clicked')
    }

    let timer = setTimeout(closeMenu, 1000)

    document.getElementById('menu_btn').addEventListener('mouseleave', (event) => {
        timer = setTimeout(closeMenu, 2000)
    })
    document.getElementById('menu_btn').addEventListener('mouseenter', (event) => {
        clearTimeout(timer)
    })

    document.getElementById('menu').addEventListener('mouseleave', (event) => {
        timer = setTimeout(closeMenu, 2000)
    })
    document.getElementById('menu').addEventListener('mouseenter', (event) => {
        clearTimeout(timer)
    })


    document.getElementById('menu-list-button-4').addEventListener('click', (event) => {
        document.body.classList.toggle('black')
        document.getElementById('menu_btn').classList.toggle('menu_btn_clicked')
        
    })

})
