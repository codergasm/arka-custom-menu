const lottieWrapper = document.querySelector('.dropdownMenu__lottie');
const lottieImagePlaceholder = document.querySelector('.lottieImagePlaceholder');

let placeholderElement, videoElement;

const videos = [
    'https://lottie.host/2bd3f81c-2b1c-4d94-b032-05a56632a8c3/PiQW30QYP0.json',
    'https://lottie.host/2bd3f81c-2b1c-4d94-b032-05a56632a8c3/PiQW30QYP0.json',
    'https://lottie.host/2bd3f81c-2b1c-4d94-b032-05a56632a8c3/PiQW30QYP0.json'
];

const placeholders = [
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json',
    'https://lottie.host/79930045-44eb-46cd-b3db-7609540b55df/K6LJT7P8Qo.json'
]

const showAnimation = (n) => {
    console.log('show animation');

    if(placeholderElement) {
        lottieWrapper.removeChild(placeholderElement);
    }
    if(videoElement) {
        lottieWrapper.removeChild(videoElement);
    }

    placeholderElement = document.createElement('lottie-player');
    videoElement = document.createElement('lottie-player');

    placeholderElement.setAttribute('class', 'lottie lottie--placeholder');
    videoElement.setAttribute('class', 'lottie lottie--video');

    placeholderElement.setAttribute('onload', `loadPlaceholder()`);
    videoElement.setAttribute('onload', `loadVideo()`);

    placeholderElement.setAttribute('src', placeholders[n]);
    videoElement.setAttribute('src', videos[n]);

    addStandardAttributesToLottieElements(placeholderElement);
    addStandardAttributesToLottieElements(videoElement);

    lottieWrapper.appendChild(placeholderElement);
    lottieWrapper.appendChild(videoElement);
}

const hideAnimation = () => {
    showElement(lottieImagePlaceholder);

    if(placeholderElement) {
        hideElement(placeholderElement);
    }
    if(videoElement) {
        hideElement(videoElement);
    }
}

const addStandardAttributesToLottieElements = (el) => {
    el.setAttribute('background', 'transparent');
    el.setAttribute('speed', '1');
    el.setAttribute('loop', 'true');
    el.setAttribute('autoplay', 'true');
}

const hideElement = (el) => {
    el.style.opacity = '0';

    setTimeout(() => {
        el.style.visibility = 'hidden';
        el.style.zIndex = '-100';
    }, 200);
}

const showElement = (el) => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    el.style.zIndex = '100';
}

const loadPlaceholder = () => {
    console.log('placeholder loaded');

    hideElement(lottieImagePlaceholder);
    showElement(placeholderElement);
}

const loadVideo = () => {
    console.log('video loaded');

    hideElement(placeholderElement);
    showElement(videoElement);
}
