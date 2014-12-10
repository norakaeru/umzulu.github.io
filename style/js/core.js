(function($){
  
   $(function(){

     $("#umzulu").rotate({ 
       bind: 
       { 
         mouseover : function() { 
           $(this).rotate({animateTo:180});
         },
         mouseout : function() { 
           $(this).rotate({animateTo:0});
         }
       } 
     });
     
     $("#back-top").hide();
     $(window).scroll(function () {
       if ($(this).scrollTop() > 100) {
         $('#back-top').fadeIn();
       } else {
         $('#back-top').fadeOut();
       }
     });
     $('#back-top a').click(function () {
       $('body,html').animate({
         scrollTop: 0
       }, 200);
       return false;
     });

   });
  
  })(jQuery);
