WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Product page
	if ($('.product_info .slider').length) {
		const productSliderThumbs = new Swiper('.product_info .slider .thumbs .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 10,
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: 4
				},
				768: {
					spaceBetween: 10
				}
			}
		})

		new Swiper('.product_info .slider .big .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			thumbs: {
				swiper: productSliderThumbs
			}
		})
	}


	// Article page
	if ($('.article_info .slider').length) {
		const articleSliderThumbs = new Swiper('.article_info .slider .thumbs .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 10,
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: 4
				},
				768: {
					spaceBetween: 10
				}
			}
		})

		new Swiper('.article_info .slider .big .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			thumbs: {
				swiper: articleSliderThumbs
			}
		})
	}


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Mob. menu
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('header .menu').toggleClass('show')
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)')

	if (selects) {
		selects.forEach(el => {
			NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})

			el.addEventListener('change', () => el.classList.add('selected'))
		})
	}


	// Submit form
	$('.contacts_info form').submit(function(e) {
		e.preventDefault()

		// Show success modal
		Fancybox.show([{
			src: '#success_modal',
			type: 'inline'
		}])
	})


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Menu
	$('header .menu_item > a.sub_link').click(function(e) {
		e.preventDefault()

		if ($(this).hasClass('selected')) {
			$('body').removeClass('menu_selected')

			$(this).removeClass('selected').next().fadeOut(300)
		} else {
			$('header .menu_item > a.sub_link').removeClass('selected')
			$('header .menu .sub_menu').removeClass('show')

			$(this).addClass('selected').next().addClass('show')

			$('body').addClass('menu_selected')
		}
	})


	$('header .menu .sub_menu a.next_level_link').click(function(e) {
		e.preventDefault()

		let parentLevel = $(this).closest('.level')

		parentLevel.find('.links a').removeClass('active')
		$(this).addClass('active')

		parentLevel.next().find('.links').removeClass('show')
		parentLevel.next().find('.' + $(this).data('links')).addClass('show')
	})


	$('header .menu_item .sub_menu > .mob_head .back .btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.sub_menu')

		$('header .menu_item > a.sub_link').removeClass('selected')
		parent.removeClass('show')

		$('body').removeClass('menu_selected')
	})


	$('header .menu_item .sub_menu .links .mob_head .back .btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.level')

		if (parent.prev().length) {
			parent.find('.links').removeClass('show')
			parent.prev().find('.links a').removeClass('active')
		} else {
			parent.closest('.sub_menu').find('.tabs .btn').removeClass('active')
			parent.closest('.sub_menu').find('.tab_content').removeClass('active')
		}
	})


	$('header .menu_item .sub_menu .tab_content > .mob_head .back .btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.sub_menu')

		parent.find('.tabs .btn').removeClass('active')
		parent.find('.tab_content').removeClass('active')
	})


	$('header .menu_item .sub_menu .close_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.menu_item')

		parent.find('a.sub_link').removeClass('selected')
		parent.find('.sub_menu').removeClass('show')
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 360) document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})