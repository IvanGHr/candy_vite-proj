const nav = () => {
    let links = document.querySelectorAll('[href^="#"]'),
		speed = 0.15

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault()

            let widthTop = Math.round(document.documentElement.scrollTop),
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null

            requestAnimationFrame(step)

            function step(time) {
                if (start === null) {
                    start = time
                }

                let progress = time - start,
                    r =
                        toBlock < 0
                            ? Math.max(widthTop - progress / speed, widthTop + toBlock)
                            : Math.min(widthTop + progress / speed, widthTop + toBlock)
                document.documentElement.scrollTo(0, r)

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash
                }
            };
        });
    });
};


export default nav;