$(document).ready(function(){
    $('.hamburger').click(function(){
        $(this).toggleClass('open');
        $('.menu-overlay').toggleClass('open');
    });
});
