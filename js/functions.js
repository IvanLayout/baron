$(() => {
	// Observer API
	const boxes = document.querySelectorAll('.lazyload')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
				entry.target.src = entry.target.getAttribute('data-src')

				entry.target.classList.add('loaded')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
	


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Мини всплывающие окна
	$('.mini-modal__btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.mini-modal')

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.mini-modal__modal').removeClass('_active')

			$('body').removeClass('_lock-mini')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini-modal__btn').removeClass('_active')
			$(this).addClass('_active')

			$('.mini-modal__modal').removeClass('_active')
			parent.find('.mini-modal__modal').addClass('_active')

			if( $(this).hasClass('mini-modal__btn_look') ) {
				$('body').addClass('_lock-mini')
			}
			

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ( !e.target.closest('.mini-modal') ) {
			$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
			$('body').removeClass('_lock-mini')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}

		if ( !e.target.closest('.header-search') && !e.target.closest('.open-search') ) {
			$('.header-search').removeClass('_show')
		}
	})

	$('body').on('click', '.mini-overlay, [data-mini-close]', function(e) {
		e.preventDefault()

		$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
		$('body').removeClass('_lock-mini')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})

	$('.open-search').click(function (e) {
		e.preventDefault()

		if( $('.header-search').hasClass('_show') ){
			$('.header-search').removeClass('_show')
		} else{
			$('.header-search').addClass('_show')
		}
	})

	$('body').on('click', '.header-catalog__btn', function(e) {
		e.preventDefault()

		if ( $(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.header-catalog__menu').removeClass('_show')
		} else {
			$(this).addClass('_active')
			$('.header-catalog__menu').addClass('_show')
		}
	})

	$('body').on('click', '.aside-catalog__menu-link._sub, .search-menu__link._sub', function(e) {
		e.preventDefault()

		if ( $(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$(this).next().removeClass('_show')
		} else {
			$(this).addClass('_active')
			$(this).next().addClass('_show')
		}
	})

	if ( $(window).width() < 1025 ){
		$('body').on('click', '.header-catalog__menu-link._sub', function(e) {
			e.preventDefault()
	
			if ( $(this).hasClass('_active')) {
				$(this).removeClass('_active')
				$(this).next().removeClass('_show')
			} else {
				$(this).addClass('_active')
				$(this).next().addClass('_show')
			}
		})
	}

	$('body').on('focus', '.header-search__input', function(e) {
		e.preventDefault()

		$('.header-search__wrap').addClass('_show')
		$('.header-search__overlay').addClass('_show')

		$('body').addClass('_lock')
	})

	$('body').on('click', '.header-search__overlay, .header-search__close', function(e) {
		e.preventDefault()

		$('.header-search__overlay').removeClass('_show')
		$('.header-search__wrap').removeClass('_show')
		$('.header-search__bord').removeClass('_show')
		$('.search-menu').removeClass('_hide')

		$('.header-search__input').val('')

		$('body').removeClass('_lock')
	})

	$('body').on('click', '.aside-cart__open-btn', function(e) {
		e.preventDefault()

		$('.aside-cart').addClass('_show')

		setTimeout( function(){
			if( $('.aside-cart__wrap').height() < $('.aside-cart').height() ){
				$('.aside-cart__fix').addClass('_hide')
			}
		}, 0)

		$('body').addClass('_lock-cart')
	})

	$('body').on('click', '.aside-cart__close', function(e) {
		e.preventDefault()

		$('.aside-cart').removeClass('_show')

		$('body').removeClass('_lock-cart')
	})
	

	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})

	$('.input-number').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})

	$('.form__input_pension').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})

	$('body').on('click', '.password-view', function(e) {
    	e.preventDefault()

    	if ($(this).hasClass('_active')) {
    		$(this).removeClass('_active')

			$(this).closest('.form__field').find('.form__input_pass').prop('type', 'password')
    	} else {
    		$(this).addClass('_active')

			$(this).closest('.form__field').find('.form__input_pass').prop('type', 'text')
    	}
    })


	$('.file-selection input[type=file]').change(function(){
		var val = $(this).val()

		var parent = $(this).closest('.file-selection')

		parent.find('.file-selection__path-name').text(val)

		parent.find('.file-selection__path').addClass('_active')

		if(parent.find('.file-selection__path-name').text() == '') {
			let defoultText = parent.find('.file-selection__path-name').data('text')
			
			parent.find('.file-selection__path-name').html(defoultText)

			parent.find('.file-selection__path').removeClass('_active')
		}
	})

	$('body').on('click', '.file-selection__clear', function (e) {
		e.preventDefault()

		var parent = $(this).closest('.file-selection')

		let defoultText = parent.find('.file-selection__path-name').data('text')
			
		parent.find('.file-selection__path-name').html(defoultText)

		parent.find('.file-selection__path').removeClass('_active')
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs__button', function(e) {
		e.preventDefault()

		if( !$(this).hasClass('active') ) {
			let parent = $(this).closest('.tabs-container')
			let activeTab = $(this).data('content')
			let level = $(this).data('level')

			parent.find('.tabs:first').find('.tabs__button').removeClass('active')
			parent.find('.tab-content.' + level).removeClass('active')

			$(this).addClass('active')
			$(activeTab).addClass('active')
		}
	})

	if( locationHash && $('.tabs-container').length ) {
		let activeTab = $('.tabs__button[data-content="'+ locationHash +'"]')
		let parent = activeTab.closest('.tabs-container')
		let level = activeTab.data('level')

		parent.find('.tabs:first').find('.tabs__button').removeClass('active')
		parent.find('.tab-content.' + level).removeClass('active')

		activeTab.addClass('active')
		$(locationHash).addClass('active')

		$('html, body').stop().animate({
			scrollTop: $(locationHash).offset().top
		}, 1000)
	}


	$('body').on('click', '.accordion__title', function (e) {
		e.preventDefault()

		if ($(this).closest('.accordion__item').hasClass('_active')) {
			$(this).closest('.accordion__item').removeClass('_active')
		} else {
			$(this).closest('.accordion__item').addClass('_active')
		}
	})

	$('body').on('click', '.info-order__open', function (e) {
		e.preventDefault()

		if ($(this).closest('.info-order__item').hasClass('_active')) {
			$(this).closest('.info-order__item').removeClass('_active')
		} else {
			$(this).closest('.info-order__item').addClass('_active')
		}
	})


	$('body').on('click', '.open-comment', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$(this).closest('.reviews__item').find('.comment').removeClass('_show')
		} else {
			$(this).addClass('_active')
			$(this).closest('.reviews__item').find('.comment').addClass('_show')
		}
	})


	$('body').on('click', '.cooking-recommendations__open', function (e) {
		e.preventDefault()

		if ($(this).closest('.cooking-recommendations__item').hasClass('_active')) {
			$(this).closest('.cooking-recommendations__item').removeClass('_active')
		} else {
			$(this).closest('.cooking-recommendations__item').addClass('_active')
		}
	})


	// Sorting
	$('body').on('click', '.sort-btns__btn', function (e) {
		e.preventDefault()

		if ( !$(this).hasClass('_active') ) {
			$(this).closest('.sort-btns').find('.sort-btns__btn').removeClass('_active')
			$(this).addClass('_active')
			let name = $(this).text()

			$(this).closest('.mini-modal_sort').find('.mini-modal__btn_sort span').text(name)

			$('.mini-modal__btn, .mini-modal__modal').removeClass('_active')
			$('body').removeClass('_lock-mini')
		}
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.trapFocus = false

	Fancybox.defaults.template = {
		closeButton: '<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 3L3 11M3 3L11 11" stroke-linecap="round"/></svg>',
	}

	// Всплывающие окна
	$('body').on('click', '.modal-btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}])
	})

	$('body').on('click', '.modal-btn2', function (e) {
		e.preventDefault()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}])
	})

	$('body').on('click', '.modal-close', function (e) {
		e.preventDefault()

		Fancybox.close()
		$('.fancybox__container').removeClass('_hidem')
	})


	// Увеличение картинки
	Fancybox.bind('.fancy-img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	$('.header-search__input').keydown(function() {
		let thisEl = $(this)
		setTimeout( function() {
			let value = thisEl.val()

			if ( value != '' ) {
				$('.header-search__bord').addClass('_show')
				$('.search-menu').addClass('_hide')
			} else {
				$('.header-search__bord').removeClass('_show')
				$('.search-menu').removeClass('_hide')
			}
		}, 10)
	})


	$('body').on('click', '.about-order__edit', function (e) {
		e.preventDefault()

		$(this).closest('.about-order__line_comment').addClass('_active')
	})

	$('body').on('submit', '#order-comment', function (e) {
		e.preventDefault()

		let valTextarea = $(this).find('textarea').val()
		$(this).closest('.about-order__line_comment').find('.about-order__val').text(valTextarea)

		$(this).closest('.about-order__line_comment').removeClass('_active')
	})

	$('body').on('click', '.checkbox-range__label_recipient', function () {
        let checkbox = $('#checkbox-recipient')

        setTimeout(() => {
            if (checkbox.prop("checked")) {
				$('.your-details__recipient').addClass("_show")
            } else {
                $('.your-details__recipient').removeClass("_show")
            }
        }, 10)
    })

	$('body').on('click', '.checkbox-range__label_house', function () {
        let checkbox = $(this).find('input[type="checkbox"]')

        setTimeout(() => {
            if (checkbox.prop("checked")) {
				$('.private-house').addClass("_hide")
            } else {
                $('.private-house').removeClass("_hide")
            }
        }, 10)
    })

	$('body').on('click', '.time-radio__label', function () {
		if( !$(this).hasClass('_click') ){
			$('.time-radio__label').addClass('_click')

			$(this).closest('form').find('.form__submit-btn').prop('disabled', false)
		}
    })

	$('body').on('click', '.info-obtaining .address-radio__label', function () {
		if( !$(this).hasClass('_click') ){
			$('.info-obtaining .address-radio__label').addClass('_click')

			$(this).closest('form').find('.form__submit-btn').prop('disabled', false)
		}
    })

	$('body').on('click', '.radio-obtaining__label', function () {
		const thisEl = $(this)
		setTimeout(() => {
			if ( !thisEl.hasClass('_active') ) {
				thisEl.closest('.radio-obtaining').find('.radio-obtaining__label').removeClass('_active')
				thisEl.addClass('_active')

				thisEl.closest('.info-obtaining').find('.info-obtaining__sector').removeClass('_show')

				let obtaining = thisEl.data('obtaining')
				$(obtaining).addClass('_show')

				$('.info-obtaining__colr').removeClass('_show')
				$('.modal-list').removeClass('_hide')
			}
		}, 10);
    })

	$('.form__input_adress').keydown(function() {
		let thisEl = $(this)
		setTimeout( function() {
			let value = thisEl.val()

			if ( value != '' ) {
				$('.dropdown-adresses').addClass('_show')
				$('.close-adresses').addClass('_show')
			} else {
				$('.dropdown-adresses').removeClass('_show')
				$('.close-adresses').removeClass('_show')
			}
		}, 0)
	})

	$('body').on('click', '.close-adresses', function (e) {
		e.preventDefault()
		$('.dropdown-adresses').removeClass('_show')
		$('.close-adresses').removeClass('_show')

		$('.form__input_adress').val('')
    })


	$('body').on('click', '.open-map', function (e) {
		e.preventDefault()
		$('.info-obtaining__colr').addClass('_show')
		$('.modal-list').addClass('_hide')
    })

	$('body').on('click', '.open-list', function (e) {
		e.preventDefault()
		$('.info-obtaining__colr').removeClass('_show')
		$('.modal-list').removeClass('_hide')
    })



	$('body').on('submit', '#form-login', function (e) {
		e.preventDefault()

		$('.login-sectors__sector').removeClass('_show')
		$('.login-sectors__sector_code').addClass('_show')
	})

	$('body').on('click', '.login-password', function (e) {
		e.preventDefault()

		$('.login-sectors__sector').removeClass('_show')
		$('.login-sectors__sector_password').addClass('_show')
    })

	$('body').on('click', '.open-nocode', function (e) {
		e.preventDefault()

		$('.login-sectors__sector').removeClass('_show')
		$('.login-sectors__sector_nocode').addClass('_show')
    })

	$('body').on('click', '.back-sector', function (e) {
		e.preventDefault()

		$('.login-sectors__sector').removeClass('_show')
		let code = $(this).data('sector')
		console.log(code)
		$('.'+code).addClass('_show')
    })

	$('body').on('click', '.cookie-fix__btn', function (e) {
		e.preventDefault()

		$('.cookie-fix').remove()
    })

	$('body').on('click', '.more-text', function (e) {
		let textWrap = $(this).closest('.spoiler-wrap')

        if ( textWrap.hasClass('full-text') ) {
			textWrap.removeClass('full-text')
            $(this).removeClass('_active')
        } else {
			textWrap.addClass('full-text')
            $(this).addClass('_active')


        }
    });
})

$(window).on('load', () => {
	if($('.aside-catalog__list').length){
		if ( $('.aside-catalog__list a.active') ) {
			$('.aside-catalog__list a.active').each( function() {
				let offset = $(this).offset().left,
					width = $(this).outerWidth()/2;

				let	scroll = (offset + width) - ($(window).width()/2);

				$(this).closest('.aside-catalog__list').scrollLeft(scroll);
			})
		}
	}

	if($('.header__info').length){
		if( $(window).scrollTop() > $('.header__info').offset().top ) {
			$('.header__info-wrap').addClass('_fixed')
			$('.header__top-wrap').addClass('_fix')
		} else {
			$('.header__info-wrap').removeClass('_fixed')
			$('.header__top-wrap').removeClass('_fix')
		}
	}

	if($('.aside-catalog_inner').length){
		if( $(window).scrollTop() > $('.aside-catalog_inner').offset().top - 54 ) {
			$('.aside-catalog__wrap').addClass('_fixed')
		} else {
			$('.aside-catalog__wrap').removeClass('_fixed')
		}
	}

	// if( $(window).scrollTop() > $('.header-search').offset().top - 10 ) {
	// 	$('.header-search__wrap').addClass('_fixed')
	// } else {
	// 	$('.header-search__wrap').removeClass('_fixed')
	// }


	$(window).on('scroll', () => {
		if($('.header__info').length){
			if( $(window).scrollTop() > $('.header__info').offset().top ) {
				$('.header__info-wrap').addClass('_fixed')
				$('.header__top-wrap').addClass('_fix')
			} else {
				$('.header__info-wrap').removeClass('_fixed')
				$('.header__top-wrap').removeClass('_fix')
			}
		}

		if($('.aside-catalog_inner').length){
			if( $(window).scrollTop() > $('.aside-catalog_inner').offset().top - 54 ) {
				$('.aside-catalog__wrap').addClass('_fixed')
			} else {
				$('.aside-catalog__wrap').removeClass('_fixed')
			}
		}

		// if( $(window).scrollTop() > $('.header-search').offset().top - 10 ) {
		// 	$('.header-search__wrap').addClass('_fixed')
		// } else {
		// 	$('.header-search__wrap').removeClass('_fixed')
		// }		
	})

	$('.aside-cart_full').on('scroll', () => {
		if( $('.aside-cart_full').scrollTop() > $('.aside-cart__bot').position().top - $(window).height() + $('.aside-cart__fix').innerHeight() ) {
			$('.aside-cart__fix').addClass('_hide')
		} else {
			$('.aside-cart__fix').removeClass('_hide')
		}
	})
})

// Вспомогательные функции
const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}

const is_touch_device = () => !!('ontouchstart' in window)