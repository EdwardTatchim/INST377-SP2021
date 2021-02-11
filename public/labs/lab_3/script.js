/* Put your javascript in here */

const leftButton = document.querySelector('button.arrow.left');
const rightButton = document.querySelector('button.arrow.right');
const ul = document.querySelector('div.images > ul');
const liWidth = document.querySelector('div.galery > ul > li').clientWidth;
const limit = ul.querySelectorAll('img').length*liWidth;

const count=3;

let location = 0;

console.log(ul);

const scrollFn = (isNext) => {

    const gone = location + (count * (isNext ? liWidth : -(liWidth)));
    console.log(gone)
    if (gone < 0 || gone > limit){
        return;
    }

    location = gone;
    ul.style.transform = `translateX(${-(position)}px)`;
};

leftButton.onClick = () => scrollFn(false);
rightButton.onClick = () => scrollFn(true);