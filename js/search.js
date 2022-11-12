'use strict';

const search = () => {
    const $input = document.querySelector('.search-block > input');
    const $searchBtn = document.querySelector('.search-block > button');

    // $input.addEventListener('input', event => {
    //     const ct = event.currentTarget;
    //     const t = event.target;
    //     console.log('event.target.value: ', t.value);
    // });

    $searchBtn.addEventListener('click', event => {
        console.log('$input.value: ', $input.value);
    });
};

search();
