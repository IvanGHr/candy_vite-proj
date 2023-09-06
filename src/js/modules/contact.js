const contact = (checkPhone, checkEmail, url) => {
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('.popup__input'),
          phoneInputs = document.querySelectorAll('input[name="phone"]'),
          modals = document.querySelectorAll('.popup');


    const message = {
        trying: 'Sending...',
        done: 'I`ll contact you',
        empty: 'Give any information to contact',
        fail: 'Something wos wrong, try again later'
    };

    const clearInputs = () => {
        inputs.forEach(input => {
            input.value = '';
        });
    };

    const postData = async (url, data) => {
        document.querySelector('.status-post').textContent = message.trying;
        let result = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await result.text();
    };

    phoneInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/, '')
        });
    });
    
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let messageStatus = document.createElement('div'),
                lastChild = form.lastElementChild;

            messageStatus.classList.add('status-post');
            form.insertBefore(messageStatus, lastChild);

            const formData = new FormData(form);

            if (!formData.get('e-mail') && !formData.get('phone')) {
                const email = form.querySelector(checkEmail),
                      phone = form.querySelector(checkPhone);
                      
                email.classList.add('red');
                phone.classList.add('red');
                email.classList.remove('default');
                phone.classList.remove('default');
                messageStatus.style.color = 'red';
                messageStatus.textContent = message.empty;
                setTimeout(() => {
                    email.classList.add('default');
                    phone.classList.add('default');
                    email.classList.remove('red');
                    phone.classList.remove('red');
                    messageStatus.remove();
                }, 2000);
            } else {
                postData(url, formData)
                    .then(result => {
                        console.log(result);
                        messageStatus.textContent = message.done;
                        setTimeout(() => {
                            modals.forEach(modal => {
                                modal.classList.add('cancel-animate');
                                modal.classList.remove('animate-modal');
                                document.body.style.overflow = '';
                                document.body.style.marginRight = `${0}px`;
                            });
                        }, 3000);
                    })
                    .catch(() => {
                        messageStatus.textContent = message.fail;
                        messageStatus.style.color = 'red';
                    })
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            messageStatus.remove();
                        }, 3000);
                    });
                };
        });
    });
};

export default contact;