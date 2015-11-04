$(document).ready(function() {

  // dropcap
  var $dropquotes = $('.dropquote');
  $dropquotes.each(function() {
    window.Dropcap.layout(this, 3);
  });



  //Configurable variables
  var $mainBlock = $('.main-block');    //Wrapper element of all blocks
  var $block = $('.main-block .block'); //Blocks
  var blocks = $block.length;           //Total number of blocks
  // var lastBlockOn = true;             //Keep last block highlighted
  var mobileBreakpoint = 800;           //Remove effect below this breakpoint

  //Other variables used for functionality
  var windowHeight = $(window).height();
  var blockHeight = windowHeight / blocks;
  var currentBlock = 0;

  //Progress bar variables
  var $progressBarContainer = $('.progress-bar-container');
  var $progressBar = $('.progress-bar');
  var $arrow = $('.arrow');

  //Initial Setup for height and positioning etc.
  if ($(window).width() > mobileBreakpoint) {
    $mainBlock.css({'position': 'fixed'});
    $block.height(windowHeight);
    $progressBarContainer.css( { bottom: "0px"} );
    $('body').css({'padding-top': windowHeight * 2});
    $block.first().addClass('active');
    $progressBarContainer.width( $(window).width() )
  } else {
    $arrow.hide();
  }

  //Functionality on page scroll
  $(window).on("scroll", function() {
    // console.log($(window).width());
    if ($(window).width() <= mobileBreakpoint) {
      return;
    }
    var scrollPos = $(this).scrollTop();

    /* Check if we have scrolled equal to browser height,
       and then remove positioning to make page behave normally. */
    if (scrollPos >= windowHeight) {
      console.log("normal");
      $progressBar.hide(400);
      $arrow.hide(400)
      if( $mainBlock.css('position') == 'fixed') {
        $mainBlock.css({'position': 'static'});
        $('body').css({'padding-top': '0px'}).scrollTop(0);
        $('.block').each(function() {
          $(this).addClass('active');
        })
      }
    }

    // Reverse animation
    /* Check if we have reached at top, and we have not already changed position
       Then change position of mainBlock to be fixed and add other settings */
    // if (scrollPos == 0 && currentBlock > 0) {
    //   console.log("Reverse!");
    //   if( $mainBlock.css('position') == 'static') {
    //     $mainBlock.css({'position': 'fixed'});
    //     $('body').css({'padding-top': windowHeight * 2}).scrollTop(windowHeight);
    //   }
    // }

    //Check scroll position, and activate blocks accordingly
    if( $mainBlock.css('position') == 'fixed') {
      //Find which block should be active based on scroll position

      var progressPercent = scrollPos / $(window).height();
      var scrollRatio = (scrollPos / blockHeight);

      if (progressPercent < 0.26) {
        currentBlock = $('#about');
        if ($progressBar.css("background-color") != "rgb(68, 220, 196)") {
          $progressBar.animate( { backgroundColor: "#44DCC4" }, 300);
          $arrow.css( { left: "13%" } )
        }
      } else if (progressPercent >= 0.26 && progressPercent < 0.63) {
        currentBlock = $('#design');
        if ($progressBar.css("background-color") != "rgb(243, 98, 77)") {
          $progressBar.animate( { backgroundColor: "#F3624D" }, 300);
          $arrow.css( { left: "44.5%" } )
        }
      } else if (progressPercent >= 0.63) {
        currentBlock = $('#code');
        if ($progressBar.css("background-color") != "rgb(65, 68, 68)") {
          $progressBar.animate( { backgroundColor: "#414444" }, 300);
          $arrow.css( { left: "81.5%" } )
        }
      }
      //remove active class from all blocks
      $block.removeClass('active');

      //Add it to the current block
      currentBlock.addClass('active');

      // Update progress bar
      $progressBar.width( progressPercent * $(window).width() );
    }

    // console.log(scrollPos);
    // console.log($mainBlock.css('position'));


  });//end of scroll event function

});
