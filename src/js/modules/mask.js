const mask = (selector) => {
    const phoneInputs = document.querySelectorAll(selector);

    let onlyNumbersInput = function(event) {
        return event.value.replace(/\D/g, '');
    };

    const onPhoneKeyDown = function(e) {
        const input = e.target
        if (e.keyCode == 8 && onlyNumbersInput(input).length == 2) {
            input.value = '';
        }
    }

    const onPhonePaste = function (e) {
        const input = e.target,
              inputNumbersValue = onlyNumbersInput(input);
        let pasted = e.clipboardData || window.clipboardData;
        
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    const onPhoneInput = function(e) {
        let input = e.target,
            inputValue = onlyNumbersInput(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";
            
        if (!inputValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputValue;
            }
            return;
        }

        if (["4", "5"].indexOf(inputValue[0]) > -1) {
            let firstSymbol = "+45";
            formattedInputValue = firstSymbol + " ";
            if (inputValue.length > 2) {
                formattedInputValue += "- " + inputValue.substring(2, 4);
            }
            if (inputValue.length > 4) {
                formattedInputValue += "-" + inputValue.substring(4, 6);
            }
            if (inputValue.length > 6) {
                formattedInputValue += "-" + inputValue.substring(6, 8);
            }
            if (inputValue.length > 8) {
                formattedInputValue += "-" + inputValue.substring(8, 10);
            }
            
        } else {
            formattedInputValue = inputValue.substring(0, 16);
        }

        input.value = formattedInputValue;
    };

    phoneInputs.forEach(input => {
        input.addEventListener('keydown', onPhoneKeyDown);
        input.addEventListener('input', onPhoneInput, false);
        input.addEventListener('paste', onPhonePaste, false);
    });
};

export default mask;