const contact = (checkPhone, checkEmail, url) => {
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('.popup__input'),
          phoneInputs = document.querySelectorAll('input[name="phone"]');


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
                form.querySelector(checkEmail).style.border = '1px solid red'
                form.querySelector(checkPhone).style.border = '1px solid red'
                messageStatus.textContent = message.empty;
                setTimeout(() => {
                    form.querySelector(checkEmail).style.border = 'none'
                    form.querySelector(checkPhone).style.border = 'none'
                    messageStatus.remove();
                }, 3000);
            } else {
                postData(url, formData)
                    .then(result => {
                        console.log(result);
                        messageStatus.textContent = message.done;
                    })
                    .catch(() => messageStatus.textContent = message.fail)
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