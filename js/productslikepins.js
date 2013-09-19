var ecwid_array_of_image = [];
var ecwid_array_of_link = [];
var ecwid_array_of_price = [];
var ecwid_array_of_name=[];
var ecwid_array_of_createddate=[];
var profile=[];
var ecwid_array_of_description=[];
var ecwid_count_of_image_onscroll=30;
var index=0;
var length=0;
var ecwid_end_of_items=false;
var count_image=0;
var ecwid_storeId="941110";
//тестовые магазины
//2315608  941110  872028  1666041  1579017  1372094 1066046 1435181  715239 143858  152680     photo 146294
var ecwid_currency_prefix="";
var ecwid_currency_suffix="";

function ecwid_get_currency()
{
  jQuery.getJSON("http://app.ecwid.com/api/v1/"+ecwid_storeId+"/profile?&callback=?", function(data)
  {
   $.each(data, function(key, value)
   { 
    profile.push(value);
    if (key=="currencySuffix")
    {
     ecwid_currency_suffix=value;             
    }
    if(key=="currencyPrefix")
    {
      ecwid_currency_prefix=value;
    }                       
   });                                     
  });
}
ecwid_get_currency();

function ecwid_get_information_about_product()
{
  jQuery.getJSON("http://app.ecwid.com/api/v1/"+ecwid_storeId+"/products?&callback=?", function(data)
  { 
   for( var i = 0; i < data.length; i++)  
   {            
    ecwid_array_of_image.push((data[i].imageUrl).substr(5));
    ecwid_array_of_createddate.push((data[i].created).substr(0,10));
    ecwid_array_of_link.push((data[i].url).substr(5));
    ecwid_array_of_name.push(data[i].name);
    ecwid_array_of_price.push(data[i].price);         
    ecwid_array_of_description.push((data[i].description).replace(/<\/?[^>]+>/gi, "").substr(0,150));
   }
   count_image=data.length;  
  });
}
ecwid_get_information_about_product();
function ecwid_generate_htmlpage()
{  
  if(count_image<=ecwid_count_of_image_onscroll+index)
  {
   for( var i = index; i<count_image; i++)  
   {
    index++;
    if(index==count_image)
    {
     $('#loaderCircle').hide(); 
     $('#loader').append($('<p>'+'no more products to load'+'</p>')); 
     ecwid_end_of_items=true;
    }
    else
    {
      $boxes = $('<div class="masonryImage">'
      +'<div class="brick-inner">'
      +'<div class="image">'
      +'<a href="'+ecwid_array_of_image[i]+'" rel="rr" onclick="return jsiBoxOpen(this)" title="'+ecwid_array_of_name[i]+'"><img src="'+ ecwid_array_of_image[i]+'" class="thumb"/></a>'
      +'<a href="'+ecwid_array_of_link[i]+'" class="cart"><span>IconBayEcwid</span></a>'
      +'</div>'
      +'<a href="'+ecwid_array_of_link[i]+'"><p>'+ecwid_array_of_name[i]+'</p></a>'
      +'<p class="enable">created: '+ecwid_array_of_createddate[i]+'</p>'
      +'<div class="line">'+"_________________"+'</div>'
      +'<p class="description">'+ecwid_array_of_description[i]+"..."+'</p>'
      +'</div>'
      +'<div class="post-price"><span>'+ecwid_currency_prefix+ecwid_array_of_price[i]+ecwid_currency_suffix+'</span></div></div>');
      $('#container').append($boxes);                  
    }      
   }
  }
    if(count_image>=ecwid_count_of_image_onscroll+index)
    {
      for( var i = index; i <index+ecwid_count_of_image_onscroll; i++)  
      {
        length++;            
        $boxes = $('<div class="masonryImage">'
        +'<div class="brick-inner">'
        +'<div class="image">'
        +'<a href="'+ecwid_array_of_image[i]+'" rel="rr" onclick="return jsiBoxOpen(this)" title="'+ecwid_array_of_name[i]+'"><img src="'+ ecwid_array_of_image[i]+ '" class="thumb"/></a>'
        +'<a href="'+ecwid_array_of_link[i]+'" class="cart"><span>IconBayEcwid</span></a>'
        +'</div>'
        +'<a href="'+ecwid_array_of_link[i]+'"><p>'+ecwid_array_of_name[i]+'</p></a>'
        +'<p class="enable">created: '+ecwid_array_of_createddate[i]+'</p>'
        +'<div class="line">'+"_________________"+'</div>'
        +'<p class="description">'+ecwid_array_of_description[i]+"..."+'</p>'
        +'</div>'
        +'<div class="post-price"><span>'+ecwid_currency_prefix+ecwid_array_of_price[i]+ecwid_currency_suffix+'</span></div></div>');
        $('#container').append($boxes);               
      }
      index=length;
    }   
}
jQuery(window).load(function()   
{
  ecwid_generate_htmlpage();
});
function ecwid_apply_masonry()
{
  var $container = $('#container').masonry({columnHeight:3});
  $container.imagesLoaded( function()
  {
    $container.masonry(
    {    
      itemSelector : '.masonryImage',
      isAnimated: true,                    
    });         
  });     
  $('#container').masonry('reload'); 
}
jQuery(window).load(function()   
{ 
  $('#container').show();
  ecwid_apply_masonry(); 
});

function ecwid_scroll_items()
{  
  window.onscroll = function () 
  {        
    if(ecwid_end_of_items==false)
    {
      if (document.body.scrollHeight == (document.body.scrollTop + document.body.clientHeight))
      { 
        setTimeout(function(){ecwid_generate_htmlpage();
        ecwid_apply_masonry();              
        ecwid_hover_image()},3000);                                                
      }
    }
  }
}
jQuery(window).load(function()    
{ 
  ecwid_scroll_items();
});
function ecwid_hover_image()
{
  $('div.image').hover( 
  function(){$('a.cart',this).fadeIn(100);},
  function(){$('a.cart',this).fadeOut(100);}      
  );
}
jQuery(window).load(function()
{ 
  ecwid_hover_image();
}); 
    //для кнопки вверх
jQuery(document).ready(function()
{
  $(window).scroll(function () {if ($(this).scrollTop() > 0) {$('#scroller').fadeIn();} else {$('#scroller').fadeOut();}});
  $('#scroller').click(function () {$('body,html').animate({scrollTop: 0}, 400); return false;});
});