const contactUs = () => {
	const scroll = removeJumping();
	let isModal = false;

	function bindModal(triggerSelector, modalSelector, closeSelector) {
		const trigger = document.querySelectorAll(triggerSelector),
			  modal = document.querySelector(modalSelector),
			  closeModal = document.querySelectorAll(closeSelector);

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault()
				}

				modal.classList.add('animate-modal');
                modal.classList.remove('cancel-animate');
				document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;

				isModal = true;
			});
		});

		closeModal.forEach(item => {
			item.addEventListener('click', () => {
				modal.classList.add('cancel-animate');
				modal.classList.remove('animate-modal');
				document.body.style.overflow = '';
				document.body.style.marginRight = `${0}px`;

				isModal = false;
			})
		})

		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				modal.classList.add('cancel-animate');
				modal.classList.remove('animate-modal');
				document.body.style.overflow = '';
                document.body.style.marginRight = `${0}px`;

				isModal = false;
			}
		});
	};

    function showModalByTime(selector, animateClass, time) {
		setTimeout(function () {
			if (isModal === false) {
				document.querySelector(selector).classList.add(animateClass)
				document.body.style.marginRight = `${scroll}px`
				document.body.style.overflow = 'hidden'
			}
		}, time)
	};

    function removeJumping() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

	bindModal('.modal-open', '#popup__callback', '.popup__close')
	bindModal('.delivery__more-info', '#popup__learn-more', '.popup__close')
	showModalByTime('#popup__callback', 'animate-modal', 6000);
};

export default contactUs;