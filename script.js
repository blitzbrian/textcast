var backdrop;

$(document).ready(function() {
$('.New-Text').click(function() {
  
            let cross = $(document.createElement('img')).attr('src', 'cross.png').css({
              position: 'absolute', width: '15px', heigth: '15px', zIndex: '2', cursor: 'pointer', top: '2px', left: '2px'
            }).click(function () {
              $(text).remove();
            }).addClass('Cross');
            
            let iframe = $(document.createElement('iframe')).css({
              position: 'absolute', width:'90%', height:'90%', border: 'none', margin: '5%',
              zIndex:'1'
            }).attr('onload','this.contentDocument.designMode="on";');
            
            let text = $(document.createElement('div')).css({
                border: '1px solid', position: 'absolute', left: 0,
                top: '50px', cursor: 'grab',overflow:'hidden',
                width: '120', height: '120', margin: '0',
                borderRadius: '25px'
            }).addClass('Editable-Text').append(iframe, cross).appendTo('.Text-Container').draggable({
              start:function () {
                $(iframe).css({zIndex: '-1'});
              },
              stop:function () {
                $(iframe).css({zIndex: '1'});
              }
            }).resizable({
              start:function () {
                $(iframe).css({zIndex: '-1'});
              },
              stop:function () {
                $(iframe).css({zIndex: '1'});
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
            $(text[i]).css({border:'none', cursor: 'default'});
            let cross = text[i].querySelector('.Cross');
            $(cross).remove();
            let iframe = text[i].querySelector('iframe');
            if (iframe) {
              let innerText = document.querySelectorAll('iframe')[j].contentWindow.document.body.innerText;
              $(iframe).remove();
              let p = document.createElement('p');
              p.innerText = document.querySelectorAll('iframe')[j].contentWindow.document.body.innerText;
              p.style.margin = iframe.style.margin
              $(iframe).remove();
              text[i].appendChild(p);
              j++;
            }
          }
          download(prompt('Filename') + '.html', div.outerHTML);
        });
        $("#color").on('change', function() {
          backdrop = $('#color').val();
          $(".Text-Container").css({backgroundColor: backdrop});
        });
});

function addFoto(input) {
            if (input.files && input.files[0]) {
                let reader = new FileReader();

                reader.onload = function (e) {
                  let cross = $(document.createElement('div')).attr('src', 'cross.png').css({
                    position: 'absolute', width: '15px', heigth: '15px', zIndex: '2', cursor: 'pointer', top: '2px', left: '2px'
                  }).click(function () {
                  $(text).remove();
                  }).addClass('Cross');
                let img = $(document.createElement('img')).css({
                    position: 'absolute', width:'90%', height:'90%', border: 'none', margin: '5%',
                    zIndex:'1'
                }).attr('src', e.target.result);
                
                let text = $(document.createElement('div')).css({
                      border: '1px solid', position: 'absolute', left: 0,
                      top: '50px',cursor: 'grab',
                      width: '120', height: '120', margin: '0',
                      borderRadius: '25px'
                }).addClass('Editable-Text').append(img, cross).appendTo('.Text-Container').draggable().resizable();
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