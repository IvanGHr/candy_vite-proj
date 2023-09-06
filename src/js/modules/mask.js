const mask = (selector) => {
    let setCursorPos = (position, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(position, position)
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', position)
            range.moveStart('character', position)
            range.select();
        }
    };

    function addMask(event) {
        let matrix = '+45-__-__-__-__',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            value = this.value.replace(/\D/g, '');

        if (def.length >= value.length) {
            value = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPos(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', addMask);
        input.addEventListener('focus', addMask);
        input.addEventListener('blur', addMask);
    });
};

export default mask;