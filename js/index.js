$(document).ready(function () {
    const slider = $(".slider__wrapper"),
        container = $(".slider__wrapper, .slider__indicators, .slider__arrow"),
        prev = $(".prev"),
        next = $('.next'),
        sliderList = $('.slide'),
        slideCount = sliderList.length,
        sliderTransition = $(slider).css("transition"),
        width = slider.width();

    let slideNow = 1,
        widthNow = width - width,
        i = 1;

    let timeDelay = sliderTransition.match(/(\d+|0\.\d+)s/)[0];
    timeDelay = timeDelay.replace("s", "");
    timeDelay = timeDelay * 1000;

    // Текст и цвет -------------------------------------------------------------------------------

    $.each(sliderList, function () {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        $(this).css("backgroundColor", randomColor);

        $(this).children().text(i);
        i++;
    })

    // Next & prev -------------------------------------------------------------------------------

    function nextSlide() {
        if (slideNow == slideCount || slideNow > slideCount) {
            // indicatorEmpty();

            // $(next).css("pointer-events", "none")
            // setTimeout(function () {
            //     $(next).css("pointer-events", "auto")
            // }, timeDelay + 20)

            // slider.css("transform", "translateX(0px)");
            // slideNow = 1;
            // widthNow = 0;

            // indicatorFull();
            
            return
        } else {
            indicatorEmpty();

            $(next).css("pointer-events", "none")
            setTimeout(function () {
                $(next).css("pointer-events", "auto")
            }, timeDelay + 20)

            widthNow -= width;
            slider.css("transform", `translateX(${widthNow}px)`);
            slideNow++;

            indicatorFull();
        };
    };

    function prevSlide() {
        if (slideNow == 1) {
            return
        } else {
            indicatorEmpty();

            $(prev).css("pointer-events", "none")
            setTimeout(function () {
                $(prev).css("pointer-events", "auto")
            }, timeDelay + 20)

            widthNow += width;
            slider.css("transform", `translateX(${widthNow}px)`);
            slideNow--;

            indicatorFull();
        };
    };

    prev.click(prevSlide);
    next.click(nextSlide);

    // AutoSlider ----------------------------------------------------------------------------------

    let indicatorBackTransition = $(".slider__indicator_back").css("transition").match(/(\d+|0\.\d+)s/)[0];
    indicatorBackTransition = indicatorBackTransition.replace("s", "");

    // let slideInterval = 2000,
    //     switchInterval = setInterval(nextSlide, slideInterval);

    // container.hover(function () {
    //     clearInterval(switchInterval);
    //     let indicatorWidthNow = $(indicatorBackList[slideNow - 1]).width();
    //     $(indicatorBackList[slideNow - 1]).css("width", indicatorWidthNow);

    //     let indicatorTransition = (indicatorBackTransition - (indicatorWidthNow / 50));
    //     $(indicatorBackList[slideNow - 1]).css('transition', `all ${indicatorTransition}s linear`)
    // }, function () {
    //     switchInterval = setInterval(nextSlide, slideInterval);
    //     indicatorFull();
    // });

    // Indicators ------------------------------------------------------------

    let indicatorBackList = $('.slider__indicator_back');
    let indicatorList = $('.slider__indicator');
    indicatorFull();

    indicatorList.click(function () {
        let indicatorIndex = $(this).index() + 1;
        if (indicatorIndex == slideNow) {
            return;
        } else {
            indicatorEmpty();

            widthNow += (slideNow - indicatorIndex) * width;
            slider.css("transform", `translateX(${widthNow}px)`);
            slideNow = indicatorIndex;

            indicatorFull();
        };
    });

    function indicatorFull() {
        $(indicatorBackList[slideNow - 1]).show();
        $(indicatorBackList[slideNow - 1]).css({ "width": "100%" });
    };

    function indicatorEmpty() {
        $(indicatorBackList[slideNow - 1]).hide();
        $(indicatorBackList[slideNow - 1]).css({ "width": "0%" });

        $(indicatorBackList[slideNow - 1]).css('transition', `all ${indicatorBackTransition}s linear`)
    }
    // -------------------------------------------------------------------------
}); 