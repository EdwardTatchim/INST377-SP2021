/* Put your javascript in here */
const btnPrev = document.querySelector('button.arrow#prev');
    const btnNext = document.querySelector('button.arrow#next');
    const ul = document.querySelector('div.galery > ul');
    const liWidth = document.querySelector('div.galery#pics > ul >li').clientWidth;
    const limit = ul.querySelectorAll('ul img').length * liWidth; 
    
    const count = 3;
    let position = 0;
    
    console.log(ul); 
    
    const scrollFn = (isNext) => {
      const off = position + (count * (isNext ? liWidth : -(liWidth)));
      console.log(off);
      if(off < 0 || off > limit) {
        return;
      }
      
      position = off;
      ul.style.transform = `translateX(${-(position)}px)`;
    };
    
    btnPrev.onclick = () => scrollFn(false);
    btnNext.onclick = () => scrollFn(true);