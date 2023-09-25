const lottieWrapper = document.querySelector('.dropdownMenu__lottie');
const lottieImagePlaceholder = document.querySelector('.lottieImagePlaceholder');
const lottieLoader = document.querySelector('.lottieLoader');

const placeholderDuration = 2;

let placeholderElement, videoElement;
let currentZIndex = 1000;
let canShowLoader = -1;
let canShowLoaderMenu = -1;
let canShowLoaderElement = -1;
let canLoadVideo = Array.from(Array(10000).keys()).map(() => (false));

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
    'https://ftp.codergasm.com/arka-custom-menu/assets/film.mp4'
];

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
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json'
];

// Desktop

const showAnimation = (n) => {
    placeholderElement = null;
    videoElement = null;
    canLoadVideo[n] = false;

    Array.from(document.querySelectorAll('.lottie')).forEach((item) => {
       item.remove();
    });

    canShowLoader = n;

    placeholderElement = document.querySelector(`.lottie--placeholder--${n}`);
    videoElement = document.querySelector(`.lottie--video--${n}`);

    if(!placeholderElement) {
        placeholderElement = document.createElement('lottie-player');

        placeholderElement.setAttribute('class', `lottie lottie--placeholder lottie--placeholder--${n}`);
        placeholderElement.setAttribute('onload', `loadPlaceholder(${n})`);
        placeholderElement.setAttribute('src', placeholders[n]);

        placeholderElement.addEventListener('complete', (el) => {
            hideElement(el.target);

            if(canShowLoader === n) {
                currentZIndex++;
                showElement(lottieLoader, currentZIndex);
            }
        });

        addStandardAttributesToLottieElements(placeholderElement);

        lottieWrapper.appendChild(placeholderElement);
    }
    else {
        currentZIndex++;
        showElement(placeholderElement, currentZIndex);
    }

    if(!videoElement) {
        videoElement = document.createElement('video');

        videoElement.setAttribute('class', `lottie lottie--video lottie--video--${n}`);
        videoElement.setAttribute('onloadeddata', `setCanLoadVideo(${n})`);
        videoElement.setAttribute('src', videos[n]);
        videoElement.setAttribute('loop', 'true');

        addStandardAttributesToLottieElements(videoElement);

        lottieWrapper.appendChild(videoElement);
    }
    else {
        currentZIndex++;
        showElement(videoElement, currentZIndex, true);
    }
}

const setCanLoadVideo = (n) => {
    canLoadVideo[n] = true;
}

const hideAnimation = () => {
    currentZIndex++;
    canShowLoader = -1;
    canShowLoaderMenu = -1;
    canShowLoaderElement = -1;

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
    el.style.opacity = '0';

    setTimeout(() => {
        el.style.visibility = 'hidden';
        el.style.zIndex = '-100';
    }, 200);

    if(stopVideo) {
        el.pause();
    }
}

const showElement = (el, index = 100, startVideo) => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    el.style.zIndex = index.toString();

    if(startVideo) {
        try {
            el.play();
        }
        catch(e) {
            throw new Error('Error');
        }
    }
}

const loadPlaceholder = (n) => {
    currentZIndex++;

    if(currentClickedSubmenu >= 0 && currentClickedSubmenuItem >= 0) {
        subcategoriesItemsImages[currentClickedSubmenu][currentClickedSubmenuItem].style.opacity = '0';
    }

    hideElement(lottieImagePlaceholder);
    showElement(placeholderElement, currentZIndex);

    setTimeout(() => {
        loadVideo(n);
    }, placeholderDuration * 1000);
}

const loadVideo = (n) => {
    if(canLoadVideo[n]) {
        videoElement.currentTime = 0;

        currentZIndex++;
        canShowLoader = -1;

        showElement(videoElement, currentZIndex, true);
        hideElement(placeholderElement);
        hideElement(lottieLoader);

        canLoadVideo[n] = false;
    }
}

const loadVideoMobile = () => {
    canShowLoaderMenu = -1;
    canShowLoaderElement = -1;
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

const mobilePlaceholders = [
    [
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
    ],
    [
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

const goToMobileMenuSlide = (n) => {
    mobileMenuSlides.forEach((item) => {
        slideOut(item);
    });

    setTimeout(() => {
        slideIn(mobileMenuSlides[n]);
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
        removeFirstClickFromAllSubmenuElements(menu, element);

        setTimeout(() => {
            currentClickedSubmenu = menu;
            currentClickedSubmenuItem = element;

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
        }, 200);
    }
}

const showMobileAnimation = (menu, element) => {
    placeholderElement = null;
    videoElement = null;

    canShowLoaderMenu = menu;
    canShowLoaderElement = element;

    placeholderElement = document.querySelector(`.lottie--placeholder--${menu}--${element}`);
    videoElement = document.querySelector(`.lottie--video--${menu}--${element}`);

    if(!placeholderElement) {
        placeholderElement = document.createElement('lottie-player');

        placeholderElement.setAttribute('class', `lottie lottie--placeholder lottie--placeholder--${menu}--${element}`);
        placeholderElement.setAttribute('onload', `loadPlaceholder(${100 * (menu+1) + element})`);
        placeholderElement.setAttribute('src', mobilePlaceholders[menu][element]);

        placeholderElement.addEventListener('complete', (el) => {
            hideElement(el.target);

            if(canShowLoaderMenu === menu && canShowLoaderElement === element) {
                currentZIndex++;
                showElement(lottieLoader, currentZIndex);
            }
        });

        addStandardAttributesToLottieElements(placeholderElement);

        subcategoriesItemsButtons[menu][element].appendChild(placeholderElement);
    }
    else {
        currentZIndex++;
        showElement(placeholderElement, currentZIndex);
    }

    if(!videoElement) {
        videoElement = document.createElement('video');

        videoElement.setAttribute('class', `lottie lottie--video lottie--video--${menu}--${element}`);
        videoElement.setAttribute('onloadeddata', `setCanLoadVideo(${100 * (menu+1) + element})`);
        videoElement.setAttribute('src', mobileVideos[menu][element]);
        videoElement.setAttribute('loop', 'true');
        videoElement.setAttribute('playsinline', 'true');

        addStandardAttributesToLottieElements(videoElement);

        subcategoriesItemsButtons[menu][element].appendChild(videoElement);
    }
    else {
        currentZIndex++;
        showElement(videoElement, currentZIndex, true);
    }
}

const removeFirstClickFromAllSubmenuElements = () => {
    hideAnimation();

    currentClickedSubmenu = -1;
    currentClickedSubmenuItem = -1;

    subcategoriesItemsImages.forEach((item) => {
        item.forEach((item) => {
            item.style.opacity = '1';
        });
    });

    subcategoriesItemsNamesElements.forEach((item, menuIndex) => {
        item.forEach((item, elementIndex) => {
            if(item.textContent === 'Wejdź') {
                subcategoriesItems[menuIndex][elementIndex].style.border = 'none';
                item.textContent = subcategoriesItemsNames[menuIndex][elementIndex];
            }
        });
    });
}

// Detect click outside subcategories menu item
$(document).click(function(event) {
    const $target = $(event.target);
    if(!$target.closest('.mobileMenu__subcategories__item').length &&
        $('.mobileMenu__subcategories__item').is(":visible")) {

        removeFirstClickFromAllSubmenuElements();
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
