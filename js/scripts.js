// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 375) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
}

$(() => {
	$('body').on('click', '.mob-menu-btn', function (e) {
		e.preventDefault()

		if ($('.mob-menu-btn').hasClass('_active')) {
			$('.mob-menu-btn').removeClass('_active')
			$('.header__top-wrap').removeClass('_show')

			$('body').removeClass('_lock-menu')
		} else {
			$('.mob-menu-btn').addClass('_active')
			$('.header__top-wrap').addClass('_show')

			$('body').addClass('_lock-menu')
		}
	})


	if ( $(window).width() < 1025 && !$('.header-catalog__menu').hasClass('mob') ) {
		$('.header-catalog__menu').removeClass('pc')
		$('.header-catalog__menu').addClass('mob')

		$('.header-catalog__menu').insertBefore('.heade__menu')
	}

	if ( $(window).width() > 1024 && !$('.header-catalog__menu').hasClass('pc') ) {
		$('.header-catalog__menu').removeClass('mob')
		$('.header-catalog__menu').addClass('pc')

		$('.header-catalog__menu').appendTo('.header__top-wrapheader-catalog')
	}


	$('body').on('click', '.product__buy', function (e) {
		e.preventDefault()

		$(this).addClass('_hide')
		$(this).closest('.product').find('.product__amount').addClass('_show')
	})


	//
	if ($('.main-slider').length) {
		new Swiper('.main-slider', {
			loop: true,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 0,
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			}
		})
	}


	if ($('.section-cats.swiper').length) {
		new Swiper('.section-cats.swiper', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 8,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			breakpoints: {
				'320': {
					spaceBetween: 8,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 8,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 12,
					slidesPerView: 6
				},
				'1025': {
					spaceBetween: 12,
					slidesPerView: 6
				},
				'120': {
					spaceBetween: 12,
					slidesPerView: 5
				},
				'1400': {
					spaceBetween: 12,
					slidesPerView: 6
				}
			}
		})
	}


	if ($('.recipes__slider').length) {
		new Swiper('.recipes__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 8,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			breakpoints: {
				'320': {
					spaceBetween: 8,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 8,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 10,
					slidesPerView: 3
				},
				'1025': {
					spaceBetween: 12,
					slidesPerView: 3
				}
			}
		})
	}


	if ($('.products__slider').length) {
		new Swiper('.products__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 8,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			scrollbar: {
				el: ".slider-scrollbar",
			},
			breakpoints: {
				'320': {
					spaceBetween: 8,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 8,
					slidesPerView: 3
				},
				'768': {
					spaceBetween: 12,
					slidesPerView: 4
				},
				'1025': {
					spaceBetween: 12,
					slidesPerView: 4
				}
			}
		})
	}

	if ($('.products__slider2').length) {
		new Swiper('.products__slider2', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 8,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			scrollbar: {
				el: ".slider-scrollbar",
			},
			breakpoints: {
				'320': {
					spaceBetween: 8,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 8,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 12,
					slidesPerView: 5
				},
				'1025': {
					spaceBetween: 12,
					slidesPerView: 5
				}
			}
		})
	}

	if ($('.products-small__slider').length) {
		new Swiper('.products-small__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			breakpoints: {
				'320': {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				'1025': {
					spaceBetween: 12,
					slidesPerView: 3
				}
			}
		})
	}


	if ($('.product-info__slider').length) {
		productPhotoSlider = new Swiper(".product-info__slider", {
			loop: false,
			spaceBetween: 10,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			on: {
				slideChange: function (swiper) {
					$(swiper.$el).closest('.product-info').find('.product-info__thumbs-item').removeClass('_active')

					$(swiper.$el).closest('.product-info').find(`.product-info__thumbs-item:eq(${swiper.realIndex})`).addClass('_active')
				}
			}
		})

		$('body').on('click', '.product-info__thumbs-item', function(e) {
			e.preventDefault()

			let numberSlide = $(this).data('index-slide');
			productPhotoSlider.slideTo(numberSlide);
		})
	}


	if ($('.revirew-photo__slider').length) {
		new Swiper('.revirew-photo__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			breakpoints: {
				'320': {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				'1025': {
					spaceBetween: 12,
					slidesPerView: 11
				}
			}
		})
	}

	if ($('.categories__slider').length) {
		new Swiper('.categories__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			scrollbar: {
				el: ".slider-scrollbar",
			}
		})
	}


	// Изменение количества товара
	$('body').on('click', '.amount__btn_minus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')
			input = parent.find('input')
			inputVal = parseFloat(input.val())
			inputText = input.data('text')
			minimum = parseFloat(input.data('minimum'))
			step = parseFloat(input.data('step'));

		if (inputVal > minimum) {
			input.val(inputVal - step)
		}

		if (inputVal-step == minimum) {
			$(this).prop("disabled", true)
		}

		if(inputText){
			input.val(inputVal - step + inputText)
		}
	})

	$('body').on('click', '.amount__btn_plus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')
			input = parent.find('input')
			inputVal = parseFloat(input.val())
			inputText = input.data('text')
			maximum = parseFloat(input.data('maximum'))
			step = parseFloat(input.data('step'))

		if (inputVal < maximum) {
			input.val(inputVal + step)

			parent.find('.amount__btn_minus').prop("disabled", false)
		}

		if(inputText){
			input.val(inputVal + step + inputText)
		}
	})

	// Звездочки отзыва
	if ($('.rating-js').length){
		$('input.wow').rating()
	}

	if( $('.spoiler-wrap').length ){
		checkTextLength($('.spoiler-wrap'))
	}
});


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}

		if( $('.spoiler-wrap').length ){
			checkTextLength($('.spoiler-wrap'))
		}
	}

	if ( $(window).width() < 1025 && !$('.header-catalog__menu').hasClass('mob') ) {
		$('.header-catalog__menu').removeClass('pc')
		$('.header-catalog__menu').addClass('mob')

		$('.header-catalog__menu').insertBefore('.heade__menu')
	}

	if ( $(window).width() > 1024 && !$('.header-catalog__menu').hasClass('pc') ) {
		$('.header-catalog__menu').removeClass('mob')
		$('.header-catalog__menu').addClass('pc')

		$('.header-catalog__menu').appendTo('.header-catalog')
	}
})

function checkTextLength(className) {
	className.each( function(index, el){
		let text = $(el).find('.spoiler-text'),
		button = $(el).find('.more-text')

		let textHeight = text[0].scrollHeight,
			containerHeight = text.height()

		$(el).removeClass('full-text')
		button.removeClass('_active')

		if (textHeight > containerHeight) {
			button.addClass('_show')
		} else {
			button.removeClass('_show')
		}
	})
}