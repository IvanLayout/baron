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

		$('body').addClass('_lock')
	})

	$('body').on('click', '.aside-cart__close', function(e) {
		e.preventDefault()

		$('.aside-cart').removeClass('_show')

		$('body').removeClass('_lock')
	})
	

	// Маска ввода
	$('input[type=tel]').each(function(){
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

		var parent = $(this).parents('.file-selection')

		parent.find('.file-selection__path-name').text(val)

		if(parent.find('.file-selection__path-name').text() == '') {
			parent.find('.file-selection__path-name').text('Прикрепить фото документа')
		}
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


	$('body').on('click', '.open-comment', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$(this).closest('.revirews__item').find('.comment').removeClass('_show')
		} else {
			$(this).addClass('_active')
			$(this).closest('.revirews__item').find('.comment').addClass('_show')
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

	Fancybox.defaults.template = {
		closeButton: '<svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.6385 24.6392C24.0783 25.1994 23.1701 25.1994 22.61 24.6392L2.35996 4.38921C1.7998 3.82905 1.7998 2.92085 2.35996 2.36069C2.92012 1.80054 3.82832 1.80054 4.38848 2.36069L24.6385 22.6107C25.1986 23.1709 25.1986 24.079 24.6385 24.6392Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.35996 24.6392C1.7998 24.079 1.7998 23.1709 2.35996 22.6107L22.61 2.36069C23.1701 1.80054 24.0783 1.80054 24.6385 2.36069C25.1986 2.92085 25.1986 3.82905 24.6385 4.38921L4.38847 24.6392C3.82831 25.1994 2.92012 25.1994 2.35996 24.6392Z"/></svg>',
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

	$('body').on('click', '.modal-close', function (e) {
		e.preventDefault()

		Fancybox.close()
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
		}, 0)
	})
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