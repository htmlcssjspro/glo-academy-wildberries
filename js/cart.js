'use strict';

const cart = () => {
    const $cart = document.getElementById('modal-cart');
    const $cartCloseBtn = $cart.querySelector('.modal-close');
    const $cartBtn = document.querySelector('.button-cart');

    $cartBtn.addEventListener('click', () => {
        $cart.style.display = 'flex';

        $cartCloseBtn.addEventListener('click', () => {
            $cart.style.display = '';
        }, {once: true});

    });
};

cart();
