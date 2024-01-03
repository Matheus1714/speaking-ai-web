const allDropdown = document.querySelectorAll('.dropdown')

document.addEventListener('click', (event) => {
    allDropdown.forEach(dropdown => {
        const buttonSelect = dropdown.querySelector('.btn-select')

        const isClickInsideDropdown = dropdown.contains(event.target) || buttonSelect.contains(event.target)

        if (!isClickInsideDropdown) {
            dropdown.classList.remove('active');
        }
    })
})

allDropdown.forEach(dropdown => {
    const buttonSelect = dropdown.querySelector('.btn-select')
    const options = dropdown.querySelectorAll('.option')


    buttonSelect.addEventListener('click', () => dropdown.classList.toggle('active'))
    options.forEach(option => {
        option.addEventListener('click', () => {
            let selectedOption = option.querySelector('.dropdown .option-text').innerText
            buttonSelect.innerText = selectedOption
            dropdown.classList.remove('active')
        })
    })
})