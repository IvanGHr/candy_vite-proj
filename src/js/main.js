import '/src/sass/main.sass'
import '/src/sass/fonts.sass'
import mainSection from './modules/logo';
import nav from './modules/nav-menu';
import contactUs from './modules/modals';
import contact from './modules/contact';
import timer from './modules/timer';
import mask from './modules/mask';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let deadLine = '2024-01-01';

    mainSection();
    nav();
    contactUs();
    contact('input[name="phone"]', 'input[name="e-mail"]');
    timer('.timer-box__timers', deadLine);
});