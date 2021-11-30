(function () {
  'use strict'
  document.querySelector('[data-bs-toggle="offcanvas"]').addEventListener('click', function () {
    document.querySelector('.offcanvas-collapse').classList.toggle('open')
  })
})()

let song = new Array();
let tt = true;

let begin = function($){
    $('#search').click(function(e){
        $('#toggle').click();
        console.log('fk,k,d')
        $('#player').addClass('play-on')
        $('#player').removeClass('play-off')
        $('#audio').attr('src', '#');
        let name = $('#name').val();
        if(name !== null){
            let url = "https://itunes.apple.com/search?limit=10000&term=" + name;
            $("#interior").replaceWith('<div class="row" id="interior"></div>');
            $('#interior').append('<progress align="center"> />')
            //ajax request to find all artists and song whose match with the enter name
            $.ajax({
                url : url,
                type : 'GET',
                data : 'term=' + name,
                dataType : 'JSON',
                success : function(results){ /*callback fonction*/updateview(results)}
             });
        }
    })
}

let updateview = function(result){
  console.log(result)
  $("#interior").replaceWith('<div class="row" id="interior"></div>');
  let i = 0;
  if(result['results'].length === 0)$('#interior').append('<h2>No Result Found</h2>')
  result['results'].forEach(mus => {
      if(mus['wrapperType'] === "track" && mus['kind'] !== undefined ){
        if(mus['kind'] === "song"){
          let music = new Music(i ,mus['artistId'] ,mus['artworkUrl100'] ,mus['previewUrl'] , mus['trackViewUrl'] ,mus['artistName'] ,mus['trackName']);
          song[i] = music;
          $('#interior').append(''
          + '<div id="music&' + music.getId() + '" class="d-flex music col-sm-6 text-muted pt-3">'
          + '<img class="me-3" id="songe&' + music.getId() + '" src="https://icons.getbootstrap.com/icons/file-earmark-music-fill.svg" focusable="false" alt="" width="32" height="32">'
          + '<p class="pb-3 mb-0 small lh-sm border-bottom">'
          + '<strong class="d-block text-gray-dark">@' + music.getSingername() + '</strong>'
          + music.getMusicname()
          + '</p>'
          + '</div>'
          + '')
          i++;
        }
      }  
  });
}

$(document).click(function(e){
  y = e.target.id
  console.log(y);
  if( y.split('&')[0] === "music" || y.split('&')[0] === "songe" ){
      song.forEach(son => {
          if(son.getId() === parseInt(y.split('&')[1])){
              $('#player').removeClass('play-on')
              $('#player').addClass('play-off')
              $('#audio').attr('src', son.getUrlpreview());
              setTimeout(function(){
                $('#audio')[0].play()
              }, 2000)
              $('#img-song').attr('src', son.getImage());
              $('#description').replaceWith(''
              + '<div id="description" class="lh-1">'
              + '<marquee><p><small>' + son.getMusicname() + '</small></p></marquee>'
              + '<p><small>@' + son.getSingername() + '</small></p>'
              + '</div>'
              )
              
                    
          }
      })
  }  
})

$('#swicth').click(function(e){
  console.log("ok")
  if(tt){
    $('body').removeClass('bg-dark');
    $('body').addClass('bg-light');
    tt = false;
  } else{
    $('body').removeClass('bg-light');
    $('body').addClass('bg-dark');
    tt = true;
  } 
})

$('#start-song').click(function(e){
  $('#audio')[0].play()
})

$('#stop-song').click(function(e){
  $('#audio')[0].pause()
})
begin(jQuery)