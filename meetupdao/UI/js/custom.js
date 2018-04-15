

 // -------------------- / --------------
 // partical js

 particlesJS.load('particles-js', 'js/particles.json', function() {
   console.log('callback - particles.js config loaded');
 });


 // navigation bar

 $(".button-collapse").sideNav();



// ==================== effects ======


$('.parallax').parallax();
$('.materialboxed').materialbox();


// pop up form

$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .7, // Opacity of modal background
    inDuration: 200, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '30%', // Ending top style attribute

  }
);
