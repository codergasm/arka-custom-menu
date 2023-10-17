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

    if(lottieImagePlaceholder) {
        showElement(lottieImagePlaceholder, currentZIndex);
    }

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

        removeFirstClickFromAllSubmenuElements(false);

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

const removeFirstClickFromAllSubmenuElements = (reset = true) => {
    hideAnimation(-1);

    mobileLoaders.forEach((item, menuIndex) => {
        item.forEach((item, elementIndex) => {
            if(menuIndex !== currentClickedSubmenu || elementIndex !== currentClickedSubmenuItem) {
                hideElement(item);
            }
        });
    });
    mobileImagesElements.forEach((item, menuIndex) => {
        item.forEach((item, elementIndex) => {
            if(menuIndex !== currentClickedSubmenu || elementIndex !== currentClickedSubmenuItem) {
                showElement(item);
            }
        });
    });

    if(reset) {
        currentClickedSubmenu = -1;
        currentClickedSubmenuItem = -1;
    }

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

        currentClickedSubmenu = -1;
        currentClickedSubmenuItem = -1;

        removeFirstClickFromAllSubmenuElements(true);
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
    './assets//wesele.mp4',
    './assets//fireworks2.mp4',
    './assets//fireworks3.mp4',
    './assets//fireworks4.mp4',
    './assets//oprawa-imprezy-muzycznej.mp4',
    './assets//airshow.mp4',
    './assets//strefa-kibica.mp4',
    './assets//fireworks2.mp4',
    './assets//fireworks3.mp4',
    './assets//fireworks4.mp4',
    './assets//fireworks5.mp4',
    './assets//fireworks6.mp4'
];

let carouselHoverTimer;
let eventsMenuType = parseInt(localStorage.getItem('eventsMenuType') || '0');
const listIcon = document.querySelector('.img--list');
const carouselIcon = document.querySelector('.img--carousel');
const eventsCarousel = document.querySelector('#carousel');
const eventsList = document.querySelector('.mobileMenu__list');
const mobileMenuItemIcon = document.querySelector('.mobileMenu__slide--3 .mobileMenu__item__icon');

let eventsMobileCarouselPosition = parseInt(localStorage.getItem('eventsMobileCarouselPosition') || '0');

const goToMobileMenuSlide = (n) => {
    mobileMenuSlides.forEach((item) => {
        slideOut(item);
    });

    setTimeout(() => {
        slideIn(mobileMenuSlides[n]);
    }, 300);

    if(n === 3) {
        checkFirstSoundMenuAnimationMobile();
    }

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
        const videoWrapperElement = document.createElement('div');
        const videoElement = document.createElement('video');

        videoWrapperElement.setAttribute('class', 'dropdownMenu__carousel__slick__item__videoWrapper');

        videoElement.setAttribute('src', carouselVideos[n]);
        videoElement.muted = true;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.setAttribute('class', 'dropdownMenu__carousel__slick__item__video');

        videoWrapperElement.appendChild(videoElement);

        item.appendChild(videoWrapperElement);

        if(images[index]) {
            images[index].style.opacity = '0';
        }

        videoWrapperElement.style.opacity = '1';
        videoElement.play();

        setTimeout(() => {
            videoWrapperElement.style.zIndex = '103';
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

        eventsCarousel.style.opacity = '0';
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

const carouselPrev = () => {
    mobileSlickCarousel.slick('slickPrev');
}

const carouselNext = () => {
    mobileSlickCarousel.slick('slickNext');
}

/* Glosnosc */
const framesRanges = [
    [0, 140],
    [141, 270],
    [271, 400],
    [401, 530],
    [531, 670],
    [671, 800],
    [801, 920],
    [921, 33214], // TODO: dokonczenie animacji
    [35321, 33128],
    [33219, 43213],
    [432134, 43217],
    [43213218, 103210]
];
const soundLevelsTitles = [
    'Bezdźwięczne',
    'Niemalże bezdźwięczne',
    'Niczym szelest liści',
    'Niczym szept',
    'Bardzo ciche',
    'Ciche',
    'Niczym szum suszarki',
    'Pękające i trzaskające fajerwerki',
    'Słabiej hukające fajerwerki',
    'Średnio hukające fajerwerki',
    'Mocno hukające fajerwerki',
    'Pizgające na maksa',
];
const soundLevelsDescriptions = [
    'Palący się papier',
    'Spalające się zimny ogień',
    'Spalający się nieco mocniejszy produkt',
    'Głośniejsze wulkany i fontanny',
    'Motylki z efektem typu rozprysk na niebie',
    'Ciche wyrzutnie z efektem opadającym',
    'Wyrzutnie z efektem opadającym',
    'Wyrzutnie z efektem krosety',
    'Wyrzutnie z klasycznymi efektami',
    'Wyrzutnie z efektem rozpryskowym powyżej 20mm',
    'Mocne petardy, wyrzutnie hukowe',
    'Bardzo mocne petardy (rasowe emitery)'
];
const categoriesLinks = [
    '/kategoria-1',
    '/kategoria-2',
    '/kategoria-3',
    '/kategoria-4',
    '/kategoria-5',
    '/kategoria-6',
    '/kategoria-7',
    '/kategoria-8',
    '/kategoria-9',
    '/kategoria-10',
    '/kategoria-11'
];

const lottieSoundAnimationElement = document.querySelector('.lottieSoundAnimation--desktop');
const rangeSliderElement = document.querySelector('.dropdownMenuSound__slider__range--desktop');
const soundLvlHeaderElement = document.querySelector('.dropdownMenuSound__right__header--desktop');
const soundLvlDescriptionElement = document.querySelector('.dropdownMenuSound__right__text--desktop');

let currentSoundLvl = 0;

const lottieSoundAnimation = lottie.loadAnimation({
    container: lottieSoundAnimationElement,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://ftp.codergasm.com/arka-menu-glosnosc/assets/skala-glosnosci.json'
});

const getCurrentSoundLvl = (val) => {
    return framesRanges.findIndex((item) => {
        return val >= item[0] && val <= item[1];
    });
}

let lvlDescriptionTimer;

const changeLvlDescription = (currentValue, force = false) => {
    const soundLvl = getCurrentSoundLvl(currentValue);

    if(soundLvl !== currentSoundLvl || force) {
        clearTimeout(lvlDescriptionTimer);
        currentSoundLvl = soundLvl;

        const translation = 'translateX(50px)';

        soundLvlHeaderElement.style.transform = translation;
        soundLvlDescriptionElement.style.transform = translation;

        soundLvlHeaderElement.style.opacity = '0';
        soundLvlDescriptionElement.style.opacity = '0';

        lvlDescriptionTimer = setTimeout(() => {
            soundLvlHeaderElement.textContent = soundLevelsTitles[soundLvl];
            soundLvlDescriptionElement.textContent = soundLevelsDescriptions[soundLvl];

            soundLvlHeaderElement.style.transform = 'none';
            soundLvlDescriptionElement.style.transform = 'none';

            soundLvlHeaderElement.style.opacity = '1';
            soundLvlDescriptionElement.style.opacity = '1';
        }, 410);
    }
}

let isAnimating = false;

rangeSliderElement.addEventListener('input', () => {
    const currentValue = rangeSliderElement.value;

    if(!isAnimating) {
        isAnimating = true;
        animateToFrame();
    }

    changeLvlDescription(currentValue);
});

function animateToFrame() {
    const targetFrame = Math.floor((rangeSliderElement.value / 1000) * lottieSoundAnimation.totalFrames);
    const currentFrame = lottieSoundAnimation.currentFrame;
    const frameDiff = targetFrame - currentFrame;
    const frameStep = frameDiff / 10; // 30 to liczba klatek na animację

    if (Math.abs(frameDiff) <= 1) {
        isAnimating = false;
        return;
    }

    lottieSoundAnimation.goToAndStop(currentFrame + frameStep, true);
    requestAnimationFrame(animateToFrame);
}

const changeSoundLvl = (force = false) => {
    const rangeValue = ((framesRanges[currentSoundLvl][0] + framesRanges[currentSoundLvl][1]) / 2).toFixed();

    rangeSliderElement.value = rangeValue;
    changeLvlDescription(rangeValue, force);

    if(!isAnimating) {
        isAnimating = true;
        animateToFrame();
    }
}

const prevSoundLvl = () => {
    currentSoundLvl = Math.max(currentSoundLvl-1, 0);
    changeSoundLvl(true);
}

const nextSoundLvl = () => {
    currentSoundLvl = Math.min(currentSoundLvl+1, 7);
    changeSoundLvl(true);
}

const mobileAnimationButton = document.querySelector('.btn--dropdownMenuSound');
let hoverTimer;

mobileAnimationButton.addEventListener('mouseenter', () => {
    hoverTimer = setTimeout(() => {
        goToCategory();
    }, 2000);
});

mobileAnimationButton.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimer);
});

const goToCategory = () => {
    window.location.href = `https://ftp.codergasm.com/arka-menu-glosnosc${categoriesLinks[currentSoundLvl]}`;
}

const goToCategoryMobile = () => {
    window.location.href = `https://ftp.codergasm.com/arka-menu-glosnosc${categoriesLinks[currentSoundLvlMobile]}`;
}

const checkFirstSoundMenuAnimation = () => {
    const cookie = localStorage.getItem('arka-sound-menu');

    if(cookie !== 'true') {
        localStorage.setItem('arka-sound-menu', 'true');

        const slider = rangeSliderElement;
        const targetValue = 500;
        const duration = 4000;
        const steps = 1000;

        const stepValue = targetValue / steps;
        let currentValue = 0;
        let stepCount = 0;

        const stepsValues = framesRanges.map((item) => (parseInt(item[1]) + 1));

        const interval = setInterval(() => {
            currentValue += stepValue;
            stepCount++;

            slider.value = currentValue;

            if(stepsValues.includes(currentValue)) {
                changeLvlDescription(parseInt(slider.value), true);
            }

            animateToFrame();

            if (stepCount >= steps) {
                clearInterval(interval); // Zatrzymaj animację po osiągnięciu docelowej wartości
            }
        }, duration / steps);


        setTimeout(() => {
            rangeSliderElement.disabled = false;
        }, 4000);
    }
    else {
        rangeSliderElement.disabled = false;
    }
}

/* Mobile */
const lottieSoundAnimationElementMobile = document.querySelector('.lottieSoundAnimation--mobile');
const rangeSliderElementMobile = document.querySelector('.dropdownMenuSound__slider__range--mobile');
const soundLvlHeaderElementMobile = document.querySelector('.dropdownMenuSound__right__header--mobile');
const soundLvlDescriptionElementMobile = document.querySelector('.dropdownMenuSound__right__text--mobile');

const mobileAnimationButtonMobile = document.querySelector('.btn--dropdownMenuSound--mobile');
const mobileAnimationButtonMobileText = document.querySelector('.btn--dropdownMenuSound--mobile>.text');
let currentSoundLvlMobile = 0;

const lottieSoundAnimationMobile = lottie.loadAnimation({
    container: lottieSoundAnimationElementMobile,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://ftp.codergasm.com/arka-menu-glosnosc/assets/skala-glosnosci.json'
});

const changeLvlDescriptionMobile = (currentValue, force = false) => {
    const soundLvl = getCurrentSoundLvl(currentValue);

    if(soundLvl !== currentSoundLvlMobile || force) {
        currentSoundLvlMobile = soundLvl;

        const translation = 'translateY(20px)';

        soundLvlHeaderElementMobile.style.transform = translation;
        soundLvlDescriptionElementMobile.style.transform = translation;

        soundLvlHeaderElementMobile.style.opacity = '0';
        soundLvlDescriptionElementMobile.style.opacity = '0';

        setTimeout(() => {
            soundLvlHeaderElementMobile.textContent = soundLevelsTitles[soundLvl];
            soundLvlDescriptionElementMobile.textContent = soundLevelsDescriptions[soundLvl];

            soundLvlHeaderElementMobile.style.transform = 'none';
            soundLvlDescriptionElementMobile.style.transform = 'none';

            soundLvlHeaderElementMobile.style.opacity = '1';
            soundLvlDescriptionElementMobile.style.opacity = '1';
        }, 410);
    }
}

let dragMobileSliderTime;
let animationTime;

rangeSliderElementMobile.addEventListener('input', () => {
    clearTimeout(dragMobileSliderTime);
    clearTimeout(animationTime);

    mobileAnimationButtonMobile.style.backgroundPosition = 'right bottom';
    mobileAnimationButtonMobile.style.transition = 'all 2s ease-out';

    animationTime = setTimeout(() => {
        mobileAnimationButtonMobileText.style.color = '#fff';
        mobileAnimationButtonMobile.style.backgroundPosition = 'left bottom';
    }, 500);

    dragMobileSliderTime = setTimeout(() => {
        goToCategoryMobile();
    }, 2000);
});

rangeSliderElementMobile.addEventListener('touchend', () => {
    clearTimeout(dragMobileSliderTime);
    clearTimeout(animationTime);

    mobileAnimationButtonMobileText.style.color = '#000';
    mobileAnimationButtonMobile.style.backgroundPosition = 'right bottom';
});

rangeSliderElementMobile.addEventListener('change', () => {
    clearTimeout(dragMobileSliderTime);
    clearTimeout(animationTime);

    mobileAnimationButtonMobileText.style.color = '#000';
    mobileAnimationButtonMobile.style.backgroundPosition = 'right bottom';
});

rangeSliderElementMobile.addEventListener('input', () => {
    const currentValue = rangeSliderElementMobile.value;

    if(!isAnimating) {
        isAnimating = true;
        animateToFrameMobile();
    }

    changeLvlDescriptionMobile(currentValue);
});

function animateToFrameMobile() {
    const targetFrame = Math.floor((rangeSliderElementMobile.value / 1000) * lottieSoundAnimationMobile.totalFrames);
    const currentFrame = lottieSoundAnimationMobile.currentFrame;
    const frameDiff = targetFrame - currentFrame;
    const frameStep = frameDiff / 10;

    if (Math.abs(frameDiff) <= 1) {
        isAnimating = false;
        return;
    }

    lottieSoundAnimationMobile.goToAndStop(currentFrame + frameStep, true);
    requestAnimationFrame(animateToFrameMobile);
}

const changeSoundLvlMobile = (force = false) => {
    const rangeValue = ((framesRanges[currentSoundLvlMobile][0] + framesRanges[currentSoundLvlMobile][1]) / 2).toFixed();

    rangeSliderElementMobile.value = rangeValue;
    changeLvlDescriptionMobile(rangeValue, force);

    if(!isAnimating) {
        isAnimating = true;
        animateToFrameMobile();
    }
}

const prevSoundLvlMobile = () => {
    currentSoundLvlMobile = Math.max(currentSoundLvlMobile-1, 0);
    changeSoundLvlMobile(true);
}

const nextSoundLvlMobile = () => {
    currentSoundLvlMobile = Math.min(currentSoundLvlMobile+1, 7);
    changeSoundLvlMobile(true);
}

const checkFirstSoundMenuAnimationMobile = () => {
    const cookie = localStorage.getItem('arka-sound-menu');

    if(cookie !== 'true') {
        localStorage.setItem('arka-sound-menu', 'true');

        const slider = rangeSliderElementMobile;
        const targetValue = 500;
        const duration = 4000;
        const steps = 1000;

        const stepValue = targetValue / steps;
        let currentValue = 0;
        let stepCount = 0;

        const stepsValues = framesRanges.map((item) => (parseInt(item[1]) + 1));

        const interval = setInterval(() => {
            currentValue += stepValue;
            stepCount++;

            slider.value = currentValue;

            if(stepsValues.includes(currentValue)) {
                changeLvlDescriptionMobile(parseInt(slider.value), true);
            }

            animateToFrameMobile();

            if (stepCount >= steps) {
                clearInterval(interval);
            }
        }, duration / steps);


        setTimeout(() => {
            rangeSliderElementMobile.disabled = false;
        }, 4000);
    }
    else {
        rangeSliderElementMobile.disabled = false;
    }
}
