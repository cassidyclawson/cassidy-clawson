$(document).ready(function() {

  //Define variables
  var windowHeight = $(window).height();
  var blockHeight = windowHeight / 4;
  var $mainBlock = $('.main-block');
  var $block = $('.main-block .block');
  var currentBlock = 0;
  var checkPoint = blockHeight;

  //Initial Setup for height and positioning etc.
  $mainBlock.css({'position': 'fixed'});
  $block.height(windowHeight);
  $('body').css({'padding-top': windowHeight * 2});
  $block.first().addClass('active');

  //Functionality on page scroll
  $(document).on("scroll", function() {
    var scrollPos = $(window).scrollTop();

    /* Check if we have scrolled equal to browser height,
       and then remove positioning to make page behave normally. */
    if (scrollPos >= windowHeight) {
      $mainBlock.css({'position': 'static'});
      $('body').css({'padding-top': '0px'}).scrollTop(0);
    }

    //Check scroll position, and activate blocks accordingly
    if(scrollPos >= checkPoint && currentBlock < 3) {
      currentBlock++;
      checkPoint = blockHeight * (currentBlock + 1);
      $block.removeClass('active');
      $block.eq(currentBlock).addClass('active');
    }

  });//end of scroll event function

});
