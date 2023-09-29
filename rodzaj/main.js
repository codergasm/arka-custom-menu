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
