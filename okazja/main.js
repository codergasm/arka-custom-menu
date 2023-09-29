const lottieWrapper = document.querySelector('.dropdownMenu__lottie');
const lottieImagePlaceholder = document.querySelector('.lottieImagePlaceholder');
const lottieLoader = document.querySelector('.lottieLoader');

let timeoutId = Array.from(Array(1000).keys()).map(() => null);
let hideTimeout;

let placeholderElement, videoElement;
let currentZIndex = 1000;
let canShowLoader = -1;
let canShowLoaderMenu = -1;
let canShowLoaderElement = -1;
let canLoadVideo = Array.from(Array(10000).keys()).map(() => false);
let videoHidden = Array.from(Array(10000).keys()).map(() => false);

const videos = [
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film1.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film2.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film3.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film4.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4'
];

const videosRawBlobs = videos.map(() => null);
const videosBlobs = videosRawBlobs.map(() => null);
const videosBlobsAvailable = videosBlobs.map((item) => (!!item));

const placeholders = [
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json'
];

// Desktop

const showAnimation = async (n) => {
    clearTimeout(hideTimeout);

    hideElement(lottieImagePlaceholder);
    showElement(lottieLoader);

    timeoutId[n] = setTimeout(() => {
        videoElement = null;

        videosBlobsAvailable[n] = videosBlobs[n];
        videoHidden[n] = false;

        Array.from(document.querySelectorAll('.lottie')).forEach((item) => {
            item.remove();
        });

        canShowLoader = n;

        videoElement = document.querySelector(`.lottie--video--${n}`);

        if(!videoElement) {
            videoElement = document.createElement('video');

            if(!videosBlobs[n]) {
                fetch(videos[n])
                    .then(async r => {
                        const URL = this.window.URL || this.window.webkitURL;
                        const blob = await r.blob();

                        videosBlobs[n] = URL.createObjectURL(blob);
                    });

                videoElement.setAttribute('src', videos[n]);
            }
            else {
                videoElement.setAttribute('src', videosBlobs[n]);
            }

            videoElement.setAttribute('class', `lottie lottie--video lottie--video--${n}`);
            videoElement.setAttribute('onloadeddata', `loadVideo()`);
            videoElement.setAttribute('loop', 'true');

            addStandardAttributesToLottieElements(videoElement);

            lottieWrapper.appendChild(videoElement);
        }
        else {
            currentZIndex++;
            showElement(videoElement, currentZIndex, true);
        }
    }, 100);
}

const hideAnimation = (n) => {
    if(n >= 0 && timeoutId[n]) {
        clearTimeout(timeoutId[n]);
    }
    else {
        timeoutId.forEach((item) => {
            clearTimeout(item);
        });
    }

    currentZIndex++;
    canShowLoader = -1;
    canShowLoaderMenu = -1;
    canShowLoaderElement = -1;
    canLoadVideo[n] = false;
    // videoHidden[n] = true;

    hideElement(lottieLoader);
    showElement(lottieImagePlaceholder, currentZIndex);

    Array.from(document.querySelectorAll('.lottie')).forEach((item) => {
        hideElement(item, Array.from(item.classList).includes('lottie--video'));
    });
}

const addStandardAttributesToLottieElements = (el) => {
    el.setAttribute('background', '#fff');
    el.setAttribute('speed', '1');
    el.setAttribute('autoplay', 'true');
    el.muted = true;
}

const hideElement = (el, stopVideo = false) => {
    if(el) {
        el.style.opacity = '0';

        setTimeout(() => {
            el.style.visibility = 'hidden';
            el.style.zIndex = '-100';
        }, 200);
    }

    if(stopVideo) {
        el.pause();
    }
}

const showElement = (el, index = 100, startVideo = false) => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    el.style.zIndex = index.toString();

    if(startVideo) {
        try {
            el.play();
        }
        catch(e) {
            console.log('ERROR');
        }
    }
}

const loadVideo = () => {
    videoElement.currentTime = 0;

    currentZIndex++;
    canShowLoader = -1;

    showElement(videoElement, currentZIndex, true);
    hideElement(placeholderElement);
    hideElement(lottieLoader);
}

// Mobile
const numberOfCategories = 2;

const mobileMenu = document.querySelector('.mobileMenu');
const mobileMenuSlides = Array.from(document.querySelectorAll('.mobileMenu__slide'));
const mobileMenuChildren = Array.from(document.querySelectorAll('.mobileMenu>*'));
const subcategoriesItems = Array.from(Array(numberOfCategories).keys()).map((item) => {
    return Array.from(document.querySelectorAll(`.mobileMenu__slide--${item+2} .mobileMenu__subcategories__item`));
});
const subcategoriesItemsImages = Array.from(Array(numberOfCategories).keys()).map((item) => {
    return Array.from(document.querySelectorAll(`.mobileMenu__slide--${item+2} .mobileMenu__subcategories__item .img`));
});
const subcategoriesItemsNames = Array.from(Array(numberOfCategories).keys()).map((item) => {
    return Array.from(document.querySelectorAll(`.mobileMenu__slide--${item+2} .mobileMenu__subcategories__item .img`))
        .map((item) => (''));
});
const subcategoriesItemsNamesElements = Array.from(Array(numberOfCategories).keys()).map((item) => {
    return Array.from(document.querySelectorAll(`.mobileMenu__slide--${item+2} .mobileMenu__subcategories__item__link`));
});
const subcategoriesItemsLinks = Array.from(Array(numberOfCategories).keys()).map((item) => {
    return Array.from(document.querySelectorAll(`.mobileMenu__slide--${item+2} .mobileMenu__subcategories__item__link`))
        .map((item) => {
            return item.getAttribute('href');
        });
});
const subcategoriesItemsButtons = Array.from(Array(numberOfCategories).keys()).map((item) => {
    return Array.from(document.querySelectorAll(`.mobileMenu__slide--${item+2} .mobileMenu__subcategories__item__animation`));
});
const mobileLoaders = Array.from(Array(numberOfCategories).keys()).map((item) => {
   return Array.from(document.querySelectorAll(`.mobileMenu__slide--${item+2} .mobileLoader`));
});
const mobileImagesElements = Array.from(Array(numberOfCategories).keys()).map((item) => {
    return Array.from(document.querySelectorAll(`.mobileMenu__slide--${item+2} .mobileMenu__subcategories__item__animation .img`));
});

let currentClickedSubmenu = -1;
let currentClickedSubmenuItem = -1;

const mobileImages = [
    [
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp'
    ],
    [
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp',
        'https://img.ltwebstatic.com/images3_abc/2023/09/15/0b/1694779171e27516175a4cf682de0a48b3c5dc8052.webp'
    ]
];

const mobileVideos = [
    [
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film1.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film2.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film3.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film4.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4'
    ],
    [
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film1.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film2.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film3.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film4.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4',
        'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4'
    ]
];

subcategoriesItemsImages.forEach((item, menuIndex) => {
    item.forEach((item, elementIndex) => {
        item.setAttribute('src', mobileImages[menuIndex][elementIndex]);
    });
});

const openMobileMenu = () => {
    mobileMenu.style.transform = 'scaleX(1)';

    setTimeout(() => {
        mobileMenuChildren.forEach((item) => {
            item.style.opacity = '1';
        });
    }, 300);
}

const hideMobileMenu = () => {
    mobileMenuChildren.forEach((item) => {
        item.style.opacity = '0';
    });

    setTimeout(() => {
        mobileMenu.style.transform = 'scaleX(0)';
    }, 300);
}

const slideOut = (el) => {
    el.style.transform = 'translateX(-120%)';
}

const slideIn = (el) => {
    el.style.transform = 'translateX(0)';
}

const isCurrentElementClicked = (menu, element) => {
    return currentClickedSubmenu === menu && currentClickedSubmenuItem === element;
}

const showSubcategoriesAnimation = (menu, element) => {
    if(isCurrentElementClicked(menu, element)) {
        window.location.href = subcategoriesItemsLinks[menu][element];
    }
    else {
        hideElement(mobileImagesElements[menu][element]);
        showElement(mobileLoaders[menu][element]);

        currentClickedSubmenu = menu;
        currentClickedSubmenuItem = element;

        setTimeout(() => {
            subcategoriesItems.forEach((item, index) => {
                if(index === menu) {
                    item.forEach((item, index) => {
                        if(index === element) {
                            item.style.border = '1px dashed #dedede';
                        }
                        else {
                            item.style.border = '1px solid transparent';
                        }
                    });
                }
                else {
                    item.forEach((item) => {
                        item.style.border = 'none';
                    });
                }
            });

            subcategoriesItemsNames[menu][element] = subcategoriesItemsNamesElements[menu][element].textContent;
            subcategoriesItemsNamesElements[menu][element].textContent = 'Wejdź';

            showMobileAnimation(menu, element);
        }, 50);
    }
}

const showMobileAnimation = (menu, element) => {
    videoElement = null;

    canShowLoaderMenu = menu;
    canShowLoaderElement = element;

    videoElement = document.querySelector(`.lottie--video--${menu}--${element}`);

    if(!videoElement) {
        videoElement = document.createElement('video');

        videoElement.setAttribute('class', `lottie lottie--video lottie--video--${menu}--${element}`);
        videoElement.setAttribute('onloadeddata', `loadVideo()`);
        videoElement.setAttribute('src', mobileVideos[menu][element]);
        videoElement.setAttribute('loop', 'true');
        videoElement.setAttribute('playsinline', 'true');

        addStandardAttributesToLottieElements(videoElement);

        subcategoriesItemsButtons[menu][element].appendChild(videoElement);
    }
    else {
        currentZIndex++;
        setTimeout(() => {
            showElement(videoElement, currentZIndex, true);
        }, 200);
    }
}

// Detect click outside subcategories menu item
$(document).click(function(event) {
    const $target = $(event.target);
    if(!$target.closest('.mobileMenu__subcategories__item').length &&
        $('.mobileMenu__subcategories__item').is(":visible")) {

        currentClickedSubmenu = -1;
        currentClickedSubmenuItem = -1;

    }
});

// Detect click outside mobile menu
$(document).click(function(event) {
    const $target = $(event.target);
    if((!$target.closest('.mobileMenu').length &&
        $('.mobileMenu').is(":visible")) && (!$target.closest('.btn--menuMobile').length &&
        $('.btn--menuMobile').is(":visible"))) {

        hideMobileMenu();
    }
});

/* Okazje */
const carouselVideos = [
    './assets//fireworks.mp4',
    './assets//fireworks.mp4',
    './assets//fireworks.mp4',
    './assets//fireworks.mp4',
    './assets//fireworks.mp4',
    './assets//fireworks.mp4',
    './assets//fireworks.mp4',
    './assets//fireworks.mp4',
    './assets//fireworks.mp4',
    './assets//fireworks.mp4',
    './assets//fireworks.mp4',
    './assets//fireworks.mp4'
];

let carouselHoverTimer;
let eventsMenuType = parseInt(localStorage.getItem('eventsMenuType') || '0');
const listIcon = document.querySelector('.img--list');
const carouselIcon = document.querySelector('.img--carousel');
const eventsCarousel = document.querySelector('.mobileMenu__carousel');
const eventsList = document.querySelector('.mobileMenu__list');

let eventsMobileCarouselPosition = parseInt(localStorage.getItem('eventsMobileCarouselPosition') || '0');

const goToMobileMenuSlide = (n) => {
    mobileMenuSlides.forEach((item) => {
        slideOut(item);
    });

    setTimeout(() => {
        slideIn(mobileMenuSlides[n]);
    }, 300);

    // if(n === 2) {
    //     setTimeout(() => {
    //         const videos = Array.from(document.querySelectorAll(`.mobileMenu__subcategories__carousel__item--${eventsMobileCarouselPosition} video`));
    //
    //         videos.forEach((item) => {
    //             item.style.zIndex = '110';
    //             item.play();
    //
    //             setTimeout(() => {
    //                 item.style.opacity = '1';
    //             }, 300);
    //         });
    //     }, 200);
    // }
}

const slickCarousel = $('.dropdownMenu__carousel__slick').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false
});

slickCarousel.on('wheel', (function(e) {
    e.preventDefault();

    if (e.originalEvent.deltaY < 0) {
        $(this).slick('slickPrev');
    } else {
        $(this).slick('slickNext');
    }
}));

const playCarouselVideo = (n) => {
    const slickItems = Array.from(document.querySelectorAll(`.dropdownMenu__carousel__slick__item--${n}`));
    const images = Array.from(document.querySelectorAll(`.dropdownMenu__carousel__slick__item--${n} .dropdownMenu__carousel__slick__item__image`));

    slickItems.forEach((item, index) => {
        const videoElement = document.createElement('video');

        videoElement.setAttribute('src', carouselVideos[n]);
        videoElement.muted = true;
        videoElement.autoplay = true;
        videoElement.setAttribute('class', 'dropdownMenu__carousel__slick__item__video');

        item.appendChild(videoElement);

        if(images[index]) {
            images[index].style.opacity = '0';
        }

        videoElement.style.opacity = '1';
        videoElement.play();

        setTimeout(() => {
            videoElement.style.zIndex = '103';
        }, 200);
    });
}

const pauseCarouselVideo = (n) => {
    const videosItems = Array.from(document.querySelectorAll(`.dropdownMenu__carousel__slick__item--${n} video`));
    const images = Array.from(document.querySelectorAll(`.dropdownMenu__carousel__slick__item--${n} .dropdownMenu__carousel__slick__item__image`));

    videosItems.forEach((item, index) => {
        item.style.opacity = '0';

        setTimeout(() => {
            if(images[index]) {
                images[index].style.opacity = '1';
            }

            setTimeout(() => {
                item.style.zIndex = '-100';
                item.pause();
                item.remove();
            }, 100);
        }, 100);
    });
}

const showCarouselAnimation = (n) => {
    carouselHoverTimer = setTimeout(() => {
        slickCarousel.slick('slickGoTo', n-1);

        playCarouselVideo(n);
    }, 200);
}

const hideCarouselAnimation = (n) => {
    clearTimeout(carouselHoverTimer);
    pauseCarouselVideo(n);
}

const mobileSlickCarousel = $('.mobileMenu__subcategories__carousel').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
});

mobileSlickCarousel.slick('slickGoTo', eventsMobileCarouselPosition);

mobileSlickCarousel.on('wheel', (function(e) {
    e.preventDefault();

    if (e.originalEvent.deltaY < 0) {
        $(this).slick('slickPrev');
    } else {
        $(this).slick('slickNext');
    }
}));

mobileSlickCarousel.on('afterChange', function(event, slick, currentSlide) {
    // Stop all videos
    const allVideos = Array.from(document.querySelectorAll(`.mobileMenu__subcategories__carousel__item video`));

    allVideos.forEach((item) => {
        item.pause();
        item.style.opacity = '0';
        item.style.zIndex = '-100';
    });

    setTimeout(() => {
        const videos = Array.from(document.querySelectorAll(`.mobileMenu__subcategories__carousel__item--${currentSlide} video`));

        videos.forEach((item) => {
            item.style.zIndex = '110';
            item.play();

            setTimeout(() => {
                item.style.opacity = '1';
            }, 300);
        });
    }, 200);

    localStorage.setItem('eventsMobileCarouselPosition', currentSlide.toString());
});

const toggleMenuType = (e) => {
    if(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    if(eventsMenuType === 0) {
        eventsMenuType = 1;

        hideElement(listIcon);
        showElement(carouselIcon);

        hideElement(eventsCarousel);
        showElement(eventsList);
    }
    else {
        eventsMenuType = 0;

        hideElement(carouselIcon);
        showElement(listIcon);

        hideElement(eventsList);
        showElement(eventsCarousel);
    }

    localStorage.setItem('eventsMenuType', eventsMenuType.toString());
}

if(eventsMenuType === 1) {
    eventsMenuType = 0;
    toggleMenuType()
}

mobileSlickCarousel.slick('slickGoTo', eventsMobileCarouselPosition+1);
setTimeout(() => {
    mobileSlickCarousel.slick('slickGoTo', eventsMobileCarouselPosition);
}, 5000);
