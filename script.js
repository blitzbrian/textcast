let backdrop,tooltip,focused;


document.addEventListener('DOMContentLoaded', function() {
  M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {hoverEnabled:false});
  tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'));
});

$(document).ready(function() {
$('.tooltipped').click(function () {
  for(let i = 0; i<tooltip.length; i++) {
    tooltip[i].close();
  }
});

$('.Backdrop').click(function () {
  $('#color').click();
});
$('.Text-Color').click(function () {
  $('#text-color').click();
});
$('.New-Img').click(function () {
  $('#file').click();
});
$('.New-Text').click(function() {
            let cross = $(document.createElement('img')).attr('src', 'cross.png').css({
              position: 'absolute', width: '15px', heigth: '15px', zIndex: '2', cursor: 'pointer', top: '2px', left: '2px'
            }).click(function () {
              $(text).remove();
            }).addClass('Cross');
            
            let div = $(document.createElement('div')).css({
              position: 'absolute', width:'90%', height:'90%', border: 'none', margin: '5%',
              zIndex:'1',padding:'10px', outline: '0px solid transparent', cursor: 'text', fontSize: '24px'
            }).attr('contenteditable','true').click(function () {
              $(focused).css({border:'1px solid #000'});
              $(this).focus();
              $(text).css({border:'1px solid #29b6f6'});
              focused = text;
            }).addClass('TextDiv');
            $(div).fitText(0.8,{minFontSize:'15px',maxFontSize:'35px'});
            let text = $(document.createElement('div')).css({
                border: '1px solid', position: 'absolute', left: '80px',
                top: '80px', cursor: 'grab',overflow:'hidden',
                width: '120', height: '120', margin: '0',
                borderRadius: '25px'
            }).addClass('Editable-Text').append(div, cross).appendTo('.Text-Container').draggable({
              start:function () {
                $(div).css({zIndex: '-1'});
              },
              stop:function () {
                $(div).css({zIndex: '1'});
              },
               containment: "window"
            }).resizable({
              start:function () {
                $(div).css({zIndex: '-1'});
              },
              stop:function () {
                $(div).css({zIndex: '1'});
              }
            });
        });
        
        $('.Download').click(function () {
          let j = 0;
          let div = document.createElement('body');
          div.style.backgroundColor = backdrop;
          div.innerHTML = $('.Text-Container').html();
          let text = div.querySelectorAll('div');
          for(let i = 0; i<text.length; i++) {
            $(text[i]).css({border:'none', cursor: 'none'});
            let cross = text[i].querySelector('.Cross');
            $(cross).remove();
            let iframe = text[i].querySelector('.TextDiv');
            console.log(iframe);
            if (iframe) {
              let p = document.createElement('p');
              p.style.margin = '5%';
              p.style.color = iframe.style.color;
              p.style.fontFamily= '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
              p.innerText = iframe.innerText;
              $(iframe).remove();
              text[i].appendChild(p);
              j++;
            }
          }
          div.style.overflow = 'hidden';
          download(prompt('Filename') + '.html', div.outerHTML);
        });
        $("#color").on('change', function() {
          backdrop = $('#color').val();
          $(".Text-Container").css({backgroundColor: backdrop});
        });
        $("#text-color").on('change', function() {
          $(focused[0].querySelector('.TextDiv')).css({color:$('#text-color').val()});
        });
});

function addFoto(input) {
            if (input.files && input.files[0]) {
                let reader = new FileReader();

                reader.onload = function (e) {
                  
                let cross = $(document.createElement('img')).attr('src', 'cross.png').css({
                    position: 'absolute', width: '15px', heigth: '15px', zIndex: '2', cursor: 'pointer', top: '2px', left: '2px'
                  }).click(function () {
                    $(text).remove();
                  }).addClass('Cross');
                let img = $(document.createElement('img')).css({
                    position: 'absolute', width:'90%', height:'90%', border: 'none', margin: '5%',
                    zIndex:'1'
                }).click(function () {
              $(focused).css({border:'1px solid #000'});
              $(this).focus();
              $(text).css({border:'1px solid #29b6f6'});
              focused = text;
            }).attr('src', e.target.result);
                
                let text = $(document.createElement('div')).css({
                      border: '1px solid', position: 'absolute', left: '80px',
                      top: '80px',cursor: 'grab',
                      width: '120', height: '120', margin: '0',
                      borderRadius: '25px'
                }).addClass('Editable-Text').append(img, cross).appendTo('.Text-Container').draggable({containment: "window"}).resizable();
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
        
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}