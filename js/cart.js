'use strict';

const cart = () => {
    const $cart = document.getElementById('modal-cart');
    const $cartCloseBtn = $cart.querySelector('.modal-close');
    const $modalForm = $cart.querySelector('.modal-form');
    const $cartBtn = document.querySelector('.button-cart');
    const $goodContainer = document.querySelector('.long-goods-list');
    const $cartTable = document.querySelector('.cart-table__goods');

    const deleteCartItem = id => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const plusCartItem = id => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = cart.map(item => {
            item.id === id && item.count++;
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const minusCartItem = id => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = cart.map(item => {
            item.id === id && item.count > 0 && item.count--;
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const addToCart = id => {
        const goods = JSON.parse(localStorage.getItem('goods'));
        const good = goods.find(item => item.id === id);

        const cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')) : [];

        if (cart.some(item => item.id === good.id)) {
            cart.map(item => {
                item.id === good.id && item.count++;
                return item;
            });
        } else {
            good.count = 1;
            cart.push(good);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const renderCartGoods = () => {
        const cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')) : [];

        $cartTable.innerHTML = '';

        cart.forEach(item => {
            const $tr = document.createElement('tr');
            $tr.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td><button class="cart-btn-minus"">-</button></td>
                <td>${item.count}</td>
                <td><button class="cart-btn-plus"">+</button></td>
                <td>$${item.price * item.count}</td>
                <td><button class="cart-btn-delete"">x</button></td>
            `;
            $cartTable.append($tr);

            $tr.addEventListener('click', event => {
                event.preventDefault();
                const t = event.target;
                if (t.classList.contains('cart-btn-minus')) {
                    minusCartItem(item.id);
                    renderCartGoods();
                } else if (t.classList.contains('cart-btn-plus')) {
                    plusCartItem(item.id);
                    renderCartGoods();
                } else if (t.classList.contains('cart-btn-delete')) {
                    deleteCartItem(item.id);
                    renderCartGoods();
                }
            });
        });
    };

    const sendForm = () => {

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body:   JSON.stringify({
                cart: localStorage.getItem('cart')
                    ? JSON.parse(localStorage.getItem('cart')) : [],
                name:  $modalForm.elements.nameCustomer.value,
                phone: $modalForm.elements.phoneCustomer.value,
            })
        })
            .then(() => {
                $modalForm.reset();
                localStorage.removeItem('cart');
            })
            .catch(error => console.error(error));
    };

    $modalForm.addEventListener('submit', event => {
        event.preventDefault();
        sendForm();
        $cart.style.display = '';
    });


    $cartBtn.addEventListener('click', () => {
        renderCartGoods();
        $cart.style.display = 'flex';

        const hideCart = () => {
            $cart.style.display = '';

            $cartCloseBtn.removeEventListener('click', hideCart, false);
            $cart.removeEventListener('click', overlayHandler, false);
            window.removeEventListener('keydown', escHandler, false);
        };

        const overlayHandler = event => {
            event.target === event.currentTarget && hideCart();
        };

        const escHandler = event => {
            event.key === 'Escape' && hideCart();
        };

        $cartCloseBtn.addEventListener('click', hideCart, false);
        $cart.addEventListener('click', overlayHandler, false);
        window.addEventListener('keydown', escHandler, false);
    });

    $goodContainer && $goodContainer.addEventListener('click', event => {
        const $addToCartBtn = event.target.closest('.add-to-cart');
        $addToCartBtn && addToCart($addToCartBtn.dataset.id);
    });
};

cart();
