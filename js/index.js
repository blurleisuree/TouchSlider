$(document).ready(function () {
    const slider = $(".slider__wrapper"),
        container = $(".slider__wrapper, .slider__indicators, .slider__arrow"),
        prev = $(".prev"),
        next = $('.next'),
        sliderList = $('.slide'),
        slideCount = sliderList.length,
        width = slider.width();

    let slideIndex = 0,
        i = 1,
        sliderTransition = 0.5;

    // let timeDelay = sliderTransition.match(/(\d+|0\.\d+)s/)[0];
    // timeDelay = timeDelay.replace("s", "");
    // timeDelay = timeDelay * 1000;
    let timeDelay = sliderTransition * 1000;

    // Текст и цвет -------------------------------------------------------------------------------

    $.each(sliderList, function () {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        $(this).css("backgroundColor", randomColor);

        $(this).children().text(i);
        i++;
    })

    // Next & prev -------------------------------------------------------------------------------

    // function nextSlide() {
    //     if (slideNow == slideCount || slideNow > slideCount) {
    //         // indicatorEmpty();

    //         // $(next).css("pointer-events", "none")
    //         // setTimeout(function () {
    //         //     $(next).css("pointer-events", "auto")
    //         // }, timeDelay + 20)

    //         // slider.css("transform", "translateX(0px)");
    //         // slideNow = 1;
    //         // widthNow = 0;

    //         // indicatorFull();

    //         return
    //     } else {
    //         indicatorEmpty();

    //         $(next).css("pointer-events", "none")
    //         setTimeout(function () {
    //             $(next).css("pointer-events", "auto")
    //         }, timeDelay + 20)

    //         widthNow -= width;
    //         slider.css("transform", `translateX(${widthNow}px)`);
    //         slideNow++;

    //         indicatorFull();
    //     };
    // };

    // function prevSlide() {
    //     if (slideNow == 1) {
    //         return
    //     } else {
    //         indicatorEmpty();

    //         $(prev).css("pointer-events", "none")
    //         setTimeout(function () {
    //             $(prev).css("pointer-events", "auto")
    //         }, timeDelay + 20)

    //         widthNow += width;
    //         slider.css("transform", `translateX(${widthNow}px)`);
    //         slideNow--;

    //         indicatorFull();
    //     };
    // };

    // prev.click(prevSlide);
    // next.click(nextSlide);

    let slide = () => {
        slider.css("transition", `all ${sliderTransition}s ease-out`);
        slider.css("transform", `translateX(-${slideIndex * width}px)`);
    }

    prev.click(function () {
        if (slideIndex == 0) {
            return
        }
        $(prev).css("pointer-events", "none")
        setTimeout(function () {
            $(prev).css("pointer-events", "auto")
        }, timeDelay + 20)

        slideIndex--;
        slide();
    })
    next.click(function () {
        if (slideIndex == sliderList.length - 1) {
            return
        }
        $(next).css("pointer-events", "none")
        setTimeout(function () {
            $(next).css("pointer-events", "auto")
        }, timeDelay + 20);

        slideIndex++;
        slide();
    })

    // points-events не будет работать

    // Indicators ------------------------------------------------------------

    // let indicatorBackList = $('.slider__indicator_back');
    // let indicatorList = $('.slider__indicator');
    // indicatorFull();

    // indicatorList.click(function () {
    //     let indicatorIndex = $(this).index() + 1;
    //     if (indicatorIndex == slideNow) {
    //         return;
    //     } else {
    //         indicatorEmpty();

    //         widthNow += (slideNow - indicatorIndex) * width;
    //         slider.css("transform", `translateX(${widthNow}px)`);
    //         slideNow = indicatorIndex;

    //         indicatorFull();
    //     };
    // });

    // function indicatorFull() {
    //     $(indicatorBackList[slideNow - 1]).show();
    //     $(indicatorBackList[slideNow - 1]).css({ "width": "100%" });
    // };

    // function indicatorEmpty() {
    //     $(indicatorBackList[slideNow - 1]).hide();
    //     $(indicatorBackList[slideNow - 1]).css({ "width": "0%" });

    //     $(indicatorBackList[slideNow - 1]).css('transition', `all ${indicatorBackTransition}s linear`)
    // }
    // Touch -------------------------------------------------------------------------

    let posX1 = 0,
        posX2 = 0,
        posFinal = 0,
        posInit = 0,
        posThreshold = width * .35,
        trfRegExp = /[-0-9.]+/g; // Regexp для считывания transform

    slider.css("transform", "translateX(0)"); // Для того чтобы на первом слайде можно было считывать transform

    let swipeStart = (event) => {
        posInit = posX1 = event.clientX;

        slider.css('transition', '');

        $(document).on("mousemove", swipeAction);
        $(document).on("mouseup", swipeEnd);

        slider.addClass("grabbing")
        slider.removeClass("grab")
    };

    let swipeAction = (event) => {
        let styleTransform = slider.css("transform"),
            transform = +styleTransform.match(trfRegExp)[4];

        posX2 = posX1 - event.clientX;
        posX1 = event.clientX;

        slider.css("transform", `translateX(${transform - posX2}px)`);
    }

    let swipeEnd = (event) => {
        posFinal = posInit - posX1;

        $(document).off("mousemove", swipeAction);
        $(document).off("mouseup", swipeEnd);

        slider.addClass('grab');
        slider.removeClass('grabbing');

        if (Math.abs(posFinal) > posThreshold) {
            if (posInit < posX1) {
                slideIndex--
            } else if (posInit > posX1) {
                slideIndex++
            };
        };

        if (posInit !== posX1) {
            slide();
        };
    }
    
    slider.addClass("grab")
    slider.mousedown(swipeStart)
}); 