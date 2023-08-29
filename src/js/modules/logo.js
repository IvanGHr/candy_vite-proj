const mainSection = () => {
    const logo = document.querySelector('#logo');

    logo.addEventListener('click', (event) => {
        event.preventDefault();

        location.reload();
    })
};

export default mainSection;