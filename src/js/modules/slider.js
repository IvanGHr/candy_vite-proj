const slider = (selector, interval) => {
    const imgs = document.querySelectorAll(selector);
    let current = 0;

    function changeImage() {
        imgs[current].classList.remove('active');
        current = (current + 1) % imgs.length;
        imgs[current].classList.add('active');
    }

    imgs[current].classList.add('active');

    setInterval(changeImage, interval);
};

export default slider;