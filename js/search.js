'use strict';

const search = () => {
    const $input = document.querySelector('.search-block > input');
    const $searchBtn = document.querySelector('.search-block > button');

    const renderGoods = (goods = null) => {
        goods ??= localStorage.getItem('goods')
            ? JSON.parse(localStorage.getItem('goods'))
            : [];

        const $goodContainer = document.querySelector('.long-goods-list');
        $goodContainer.innerHTML = '';

        goods.forEach(good => {
            const $goodBlock = document.createElement('div');
            $goodBlock.classList.add('col-lg-3');
            $goodBlock.classList.add('col-sm-6');

            $goodBlock.innerHTML = `
                <div class="goods-card">
                    <span class="label ${good.label ? '' : 'd-none'}">${good.label}</span>
                    <img src="db/${good.img}"
                            alt="${good.name}"
                            class="goods-image">
                    <h3 class="goods-title">${good.name}</h3>
                    <p class="goods-description">${good.description}</p>
                    <button class="button goods-card-btn add-to-cart"
                            data-id="${good.id}">
                        <span class="button-price">$${good.price}</span>
                    </button>
                </div>
            `;

            $goodContainer.append($goodBlock);
        });
    };

    const getData = () => {
        // fetch('../db/db.json')
        return fetch('https://militer-glo-wildberries-default-rtdb.asia-southeast1.firebasedatabase.app/db.json')
            .then(response => response.json())
            .catch(error => console.error(error));
    };

    $searchBtn.addEventListener('click', event => {

        getData().then(data => {
            const searchValue = $input.value;
            const filteredData = data.filter(good => good.name.toLowerCase().includes(searchValue.toLowerCase()));
            if (!window.location.href.endsWith('/goods.html')) {
                localStorage.setItem('goods', JSON.stringify(filteredData));
                // window.location.href = 'goods.html';
                window.location.assign('goods.html');
            } else {
                renderGoods(filteredData);
            }
        });
    });
};

search();
