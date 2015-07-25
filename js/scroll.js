$(document).ready(function() {

  //Configurable variables
  var blocks = 4;                       //Total number of blocks
  var $mainBlock = $('.main-block');    //Wrapper element of all blocks
  var $block = $('.main-block .block'); //Blocks
  var lastBlockOn = true;               //Keep last block highlighted

  //Other variables used for functionality
  var windowHeight = $(window).height();
  var blockHeight = windowHeight / blocks;
  var currentBlock = 0;
  var checkPoint = blockHeight;

  //Keep last block highlighted or not?
  if (lastBlockOn) { blocks--; }

  //Initial Setup for height and positioning etc.
  $mainBlock.css({'position': 'fixed'});
  $block.height(windowHeight);
  $('body').css({'padding-top': windowHeight * 2});
  $block.first().addClass('active');

  //Functionality on page scroll
  $(window).on("scroll", function() {
    var scrollPos = $(this).scrollTop();

    /* Check if we have scrolled equal to browser height,
       and then remove positioning to make page behave normally. */
    if (scrollPos >= windowHeight) {
      $mainBlock.css({'position': 'static'});
      $('body').css({'padding-top': '0px'}).scrollTop(0);
    }

    // Reverse animation
    /* Check if we have reached at top, and we have not already changed position
       Then change position of mainBlock to be fixed and add other settings */
    if (scrollPos == 0 && currentBlock > 0) {
      if( $mainBlock.css('position').toLowerCase() == 'static') {
        $mainBlock.css({'position': 'fixed'});
        $('body').css({'padding-top': windowHeight * 2}).scrollTop(windowHeight);
      }
    }

    //Check scroll position, and activate blocks accordingly
    if(scrollPos >= checkPoint && currentBlock < blocks) {
      currentBlock++;
      checkPoint = blockHeight * (currentBlock + 1);
      $block.removeClass('active');
      $block.eq(currentBlock).addClass('active');
    } /*else if(scrollPos <= checkPoint && currentBlock >= 0) {
      currentBlock--;
      checkPoint = blockHeight * (currentBlock + 1);
      $block.removeClass('active');
      $block.eq(currentBlock).addClass('active');
    }*/

  });//end of scroll event function

});
