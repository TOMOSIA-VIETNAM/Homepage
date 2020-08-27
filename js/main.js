$(document).ready(function () {

  jQuery.validator.addMethod("laxEmail", function(value, element) {
    // allow any non-whitespace characters as the host part
    return this.optional( element ) || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( value );
  }, 'Please enter a valid email address.');

  var contactForm = $('#contact-form')

  $.get('https://blog.tomosia.com/feed-1.json', function (data) {
    var blogItems = data.items
    var length = blogItems.length
    if (length > 5) length = 5
    var html = ''
    for (var i = 0; i < length; i++) {
      html +=
        '<li>' +
        '<a href="' + blogItems[i].url + '" target="_blank" title="' + blogItems[i].title + '">' +
        '<span class="date"> - ' + blogItems[i].date_published + '</span>' +
        '<span class="title">' + blogItems[i].title.trim() + '</span>' +
        '</a>' +
        '</li>';
    }
    $('.blogs ul').html(html)
  })

  var validator = contactForm.validate({
    onfocusout: false,
    onkeyup: false,
    onclick: false,
    rules: {
      "entry.1785710538": {
        required: true
      },
      "entry.896262367": {
        required: true,
        laxEmail: true
      },
      "entry.422070178": {
        required: true
      }
    }
  })

  contactForm.submit(function () {
    if (validator.valid()) {
      validator.resetForm()
      contactForm[0].reset()
      contactForm.html('' +
        '<p class="text-center">' +
        'お問い合わせいただきありがとうございます。\n' +
        '数日中に返事いたしますので少々お待ちください。\n' +
        '</p>')
    }
  })

  var options = {
    loop: true,
    margin: 20,
    nav: true,
    responsive: {
      0: {items: 1},
      600: {items: 2},
      1000: {items: 2}
    }
  }
  $('.customer-reviews').owlCarousel(options)
  $('.examples').owlCarousel(options)

  $('.members-list').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    responsive: {
      0: {items: 1},
      600: {items: 2},
      1000: {items: 3},
      1200: {items: 4},
    }
  })

  $('#sp-menu-button').click(function () {
    $('.page-header .page-menus').toggleClass('show')
  })

  $('.page-header .page-menus li a').click(function () {
    $('.page-header .page-menus').removeClass('show')
  })

  $(document).mouseup(function (e) {
    var container = $('.page-header')
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.page-header .page-menus').removeClass('show')
    }
  })

  $('#page-top-button').click(function () {
    scrollTo('#top')
  })
  $('.page-menus li a').click(function () {
    scrollTo($(this).data('scroll-to'))
  })

  function scrollTo(to) {
    var windowWidth = ($(window).width());
    var scrollTop = $(to).offset().top;
    if (windowWidth < 992) scrollTop -= 50;
    $('html, body').animate({scrollTop: scrollTop}, 'slow');
  }
})
