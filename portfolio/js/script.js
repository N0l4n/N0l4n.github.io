//Open menu btn and page routing
(function () {
    const btn = document.querySelector('.menu-btn');
    const line = document.querySelector('.line');
    const links = document.querySelectorAll('.navbar a');
    const ul = document.querySelector('ul');
    const startBtn = document.querySelector('.down-btn a');

    //Open menu
    btn.addEventListener('click', () => {
        line.classList.toggle('active');
        if (line.classList.contains('active')) {
            ul.classList.add('menuopen');
            btn.classList.add('animated', 'flip');
        } else {
            ul.classList.remove('menuopen');
            btn.classList.remove('animated', 'flip');
        }
    })

    //Page routing
    links.forEach(link => link.addEventListener('click', route))

    function route(e) {
        e.preventDefault();
        scrollDown(e);
        line.classList.remove('active');
        ul.classList.remove('menuopen');
    };
    startBtn.addEventListener('click', route);


    function scrollDown(e) {
        const targetId = e.currentTarget.getAttribute('href')
        window.scrollTo({
            top: document.querySelector(targetId).offsetTop,
            behavior: 'smooth'
        })
    }
}());

//Add scroll to the top btn and some animations
window.onload = function () {

    //Back to the top btn
    const scrollBtn = document.querySelector('.to-top__btn');
    scrollBtn.addEventListener('click', scrollTopBtn)

    function scrollTopBtn() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -document.body.scrollHeight / 250);
            setTimeout(scrollTopBtn, 0);
        }
    }

    //Add btn on down scroll 
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > header.offsetHeight - 900) {
            scrollBtn.style.opacity = '1';
            scrollBtn.classList.add('animated', 'slideInRight');
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.classList.remove('animated', 'slideInRight');
        }
    });
    //Add animations on elements
    const animateHTML = (elem, anim) => {
        const elems = document.querySelectorAll(elem);
        const windowHeight = window.innerHeight;

        const init = () => {
            addEventHandlers();
        }

        const addEventHandlers = () => {
            window.addEventListener("scroll", checkPosition);
            window.addEventListener("resize", init)
        }
        const checkPosition = () => {
            for (let i = 0; i < elems.length; i++) {
                const posFromTop = elems[i].getBoundingClientRect().top;
                if (posFromTop - windowHeight <= 0) {
                    elems[i].classList.add('animated', anim);
                }
            }
        }

        return {
            init: init
        }
    }

    animateHTML('.animRight', 'zoomInRight').init();
    animateHTML('.animLeft', 'zoomInLeft').init();
    animateHTML('.header-anim', 'zoomIn').init();
};