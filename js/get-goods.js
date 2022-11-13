'use strict';


const getGoods = () => {

    const $links = document.querySelectorAll('.navigation-link');


    const getData = () => {
        // fetch('../db/db.json')
        return fetch('https://militer-glo-wildberries-default-rtdb.asia-southeast1.firebasedatabase.app/db.json')
            .then(response => response.json())
            .then(data => {
                const goodsItemName = 'goods';
                const local = localStorage.getItem(goodsItemName);
                if(local) {
                    return JSON.parse(local);
                } else {
                    localStorage.setItem(goodsItemName, JSON.stringify(data));
                    return data;
                }
            })
            .catch(error => console.error(error));
    };


    $links.forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();
            const ct = event.currentTarget;

            getData()
                .then(data => {
                    console.log(ct.textContent, 'data: ', data);
                });
        });
    });
};

getGoods();
