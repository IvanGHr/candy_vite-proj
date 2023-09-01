import '/src/sass/main.sass'
import '/src/sass/fonts.sass'
import mainSection from './modules/logo';
import nav from './modules/nav-menu';
import contactUs from './modules/modals';
import contact from './modules/contact';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    mainSection();
    nav();
    contactUs();
    contact();

});