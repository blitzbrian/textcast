let backdrop,tooltip,focused,nav, target, menu;
let scenes = [];
let cScene = 0;

$(document).ready(function() {
target = M.TapTarget.init(document.querySelectorAll('.tap-target'));
menu = M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {hoverEnabled:false});
tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'));
nav = M.Sidenav.init(document.querySelectorAll('.sidenav'),{draggable:true,onOpenStart:function(){
  $(scenes[cScene]).html($('.Text-Container').html());
  $(focused).css({border:'1px solid black'});
  focused = null;
    html2canvas(document.querySelector('.Text-Container'),{logging:false}).then(
                function (canvas) {
                  $('.scene div')[cScene].innerHTML = '';
                  let img = $(document.createElement('img')).attr({src:canvas.toDataURL()}).addClass('sceneImg').appendTo($('.scene div')[cScene]);
                });
}});
$(document).on('paste', function (e) {
  let items = e.originalEvent.clipboardData.items;
  let item = items[items.length - 1];
  if (item.type.indexOf('image') == 0) {
    e.preventDefault();
    let forAddFoto = {files:[item.getAsFile()]};
    addFoto(forAddFoto);
  }
});
$('body').on('contextmenu', async function (e) {
  if(nav[0].isOpen) e.preventDefault() else {
    let item = navigator.clipboard.read();
    if (item.type.indexOf('image') == 0) {
      e.preventDefault();
      let forAddFoto = {files:[item.getAsFile()]};
      addFoto(forAddFoto);
    }
  };
});
$('.NewScene').click(function () {
  let scene = $(document.createElement('div')).click(function () {
  nav[0].close();
  let divs = $('.scene div');
  for(let i = 0; i<scenes.length; i++) {
    if (divs[i] == this) {
      cScene = i;
      $('.Text-Container').empty();
      $('.Text-Container').append($(scenes[cScene]).html()).css({backgroundColor:scenes[cScene][0].style.backgroundColor});
      $('.Editable-Text').draggable({
              start:function () {
                $(this.querySelector('.TextDiv')).css({zIndex: '-1'});
              },
              stop:function () {
                $(this.querySelector('.TextDiv')).css({zIndex: '1'});
              },
               containment: "window"
            }).resizable({
              start:function () {
                $(this.querySelector('.TextDiv')).css({zIndex: '-1'});
              },
              stop:function () {
                $(this.querySelector('.TextDiv')).css({zIndex: '1'});
              }
            });
      $('.Cross').click(function () {
              $(this.parentElement).remove();
            })
      $('.TextDiv').click(function () {
              $(focused).css({border:'1px solid #000'});
              $(this).focus();
              $(this.parentElement).css({border:'1px solid #29b6f6'});
              focused = $(this.parentElement);
            })
    };
  }
}).on('contextmenu', function (e) {
  e.preventDefault();
  let scene = this;
  if(scenes.length == 1) return;
    $(scene).click();
    let i = $('.scene div').index(scene);
    scenes.splice(i,1);
    $(scene).remove();
    $('.scene div').first().click();
});
  $('.scene').append(scene);
  let append = $(document.createElement('div')).html(scene.html());
  scenes.push(append);
});
$('.tooltipped').click(function () {
  for(let i = 0; i<tooltip.length; i++) {
    tooltip[i].close();
  }
});
$('.Scene-Button').click(function () {
  nav[0].open();
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
$('.Upload').click(function () {
  $('#upload').click();
});
$('.New-Text').click(function() {
            let cross = $(document.createElement('i')).css({
              position: 'absolute', fontSize: '15px', zIndex: '2', cursor: 'pointer', top: '2px', left: '2px'
            }).click(function () {
              $(text).remove();
            }).addClass('Cross material-icons').append('close');
            
            let div = $(document.createElement('div')).css({
              position: 'absolute', width:'calc(100% - 20px)', height:'calc(100% - 20px)', border: 'none', margin: '10px',
              zIndex:'1',padding:'10px', outline: '0px solid transparent', cursor: 'text', fontSize: '24px'
            }).attr('contenteditable','true').click(function () {
              $(focused).css({border:'1px solid #000'});
              $(this).focus();
              $(text).css({border:'1px solid #29b6f6'});
              focused = text;
            }).addClass('TextDiv');
            $(div).fitText(0.8,{minFontSize:'15px',maxFontSize:'45px'});
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
          $(scenes[cScene]).html($('.Text-Container').html());
          let j = 0;
          let body = document.createElement('body');
          body.style.cursor = 'none';
          body.style.margin = '0';
          for(let i = 0; i<scenes.length;i++) {
            let scene = scenes[i][0];

            let div = document.createElement('div');
            div.style.transition = 'opacity 1s ease';
            div.style.display = 'none';
            div.style.opacity = '0';
            div.style.width = '100vw';
            div.style.height = '100vh';
            div.style.margin = 0;
            div.style.backgroundColor = $(scene).css('backgroundColor');
            console.trace(scene.innerText)
            $(div).html(scene.innerHTML);
            console.trace(div.innerText)
            $(div).addClass('Switch-Scene');
            let text = div.querySelectorAll('.Editable-Text');
            for(let i = 0; i<text.length; i++) {
              $(text[i]).css({border:'none', cursor: 'none'});
              let cross = text[i].querySelector('.Cross');
              $(cross).remove();
              let iframe = text[i].querySelector('.TextDiv');
              if (iframe) {
                let p = document.createElement('p');
                p.style.margin = '10px';
                p.style.color = iframe.style.color;
                p.style.fontFamily= '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
                let divs = iframe.querySelectorAll('div');
                divs.forEach(function (el) {
                  $(el).after('\n' + el.innerText);
                  $(el).remove();
                });
                p.style.fontSize = iframe.style.fontSize;
                iframe.innerHTML = iframe.innerText.replaceAll('\n','<br>');
                p.innerHTML = iframe.innerHTML
                $(iframe).remove();
                text[i].appendChild(p);
                j++;
              }
            }
            $(body).append(div)
          }
          console.log(body);
          body.style.overflow = 'hidden';
          let filename = prompt('Filename');
          download(filename + '.html', '<title>'+filename+'</title>'+'<link rel="icon" type="image/png" href="https://textcast.tk/icon.png">'+body.outerHTML+'<script>'+switchScene.toString()+'; switchScene()</script>');
        });
        $("#color").on('change', function() {
          scenes[cScene][0].style.backgroundColor = $('#color').val();
          $(".Text-Container").css({backgroundColor: $('#color').val()});
        });
        $("#text-color").on('change', function() {
          $(focused[0].querySelector('.TextDiv')).css({color:$('#text-color').val()});
        });
        $('.NewScene').click();
        target[0].open();
});

function addFoto(input) {
            if (input.files && input.files[0]) {
                let reader = new FileReader();

                reader.onload = function (e) {
                let cross = $(document.createElement('i')).css({
                  position: 'absolute', width: '15px', heigth: '15px', zIndex: '2', cursor: 'pointer', top: '2px', left: '2px'
                }).click(function () {
                  $(text).remove();
                }).addClass('Cross material-icons').append('close');
                let img = $(document.createElement('img')).css({
                    position: 'absolute', width:'calc(100% - 20px)', height:'calc(100% - 20px)', border: 'none', margin: '10px',
                    zIndex:'1'
                }).click(function () {
              $(focused).css({border:'1px solid #000'});
              $(this).focus();
              $(text).css({border:'1px solid #29b6f6'});
              focused = text;
            }).attr({src:e.target.result});
                
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
function upload(input) {
  if (input.files && input.files[0]) {
                let reader = new FileReader();

                reader.onload = function (e) {
                  let el = document.createElement('div');
                  $(el).html(e.target.result);
                  let s = el.querySelectorAll('.Switch-Scene');
                  let length = scenes.length;
                  for(let i = 0; i<s.length; i++) {
                  let scene = s[i]
                  let div = document.createElement('div');
                  let text = scene.querySelectorAll('div');
                  for(let i = 0; i<text.length; i++) {
                    $(text[i]).css({border:'black'});
                    let cross = text[i].querySelector('.Cross');
                    $(cross).remove();
                    let iframe = text[i].querySelector('p');
                    if (iframe) {
                      let cross = $(document.createElement('i')).css({
                        position: 'absolute', fontSize: '15px', zIndex: '2', cursor: 'pointer', top: '2px', left: '2px'
                      }).click(function () {
                        $(text).remove();
                      }).addClass('Cross material-icons').append('close');
                      let div = document.createElement('div');
                      $(div).css({position: 'absolute', width:'calc(100% - 20px)', height:'calc(100% - 20px)', border: 'none', margin: '10px',
                        zIndex:'1',padding:'10px', outline: '0px solid transparent', cursor: 'text', fontSize: '24px'
                      }).attr('contenteditable','true').click(function () {
                          $(focused).css({border:'1px solid #000'});
                          $(this).focus();
                          $(text[i]).css({border:'1px solid #29b6f6'});
                          focused = text[i];
                            }).addClass('TextDiv');
                            $(text[i]).draggable({
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
                        div.style.color = iframe.style.color;
                        div.style.fontFamily= '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
                        div.style.fontSize = iframe.style.fontSize;
                        div.innerHTML = iframe.innerHTML;
                        $(iframe).remove();
                        $(text[i]).append(div,cross).css({border:'1px solid #000', cursor:'drag'});
                      }
                      let image = text[i].querySelector('img');
                      if (image) {
                        
                      let cross = $(document.createElement('i')).css({
                        position: 'absolute', fontSize: '15px', zIndex: '2', cursor: 'pointer', top: '2px', left: '2px'
                      }).click(function () {
                        $(text).remove();
                      }).addClass('Cross material-icons').append('close');
                      $(image).css({position: 'absolute', width:'calc(100% - 20px)', height:'calc(100% - 20px)', border: 'none', margin: '10px',
                        zIndex:'1',padding:'10px', outline: '0px solid transparent', cursor: 'text', fontSize: '24px'
                      }).click(function () {
                          $(focused).css({border:'1px solid #000'});
                          $(text[i]).css({border:'1px solid #29b6f6'});
                          focused = text[i];
                            }).addClass('TextDiv');
                            $(text[i]).draggable({containment: "window"}).resizable();
                        $(iframe).remove();
                        $(text[i]).append(div,cross).css({border:'1px solid #000', cursor:'drag'});
                      }
                    }
            
                    $('.NewScene').click();
                    $('.scene div')[scenes.length - 1].click();
                    scenes[cScene][0].innerHTML = s[i].innerHTML;
                  }
                  $($('.scene div')[length]).click();
                };

                reader.readAsText(input.files[0]);
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

async function switchScene () {
  const timer = ms => new Promise(res => setTimeout(res, ms))
  let divs = document.querySelectorAll('.Switch-Scene');
  let body = document.querySelector('body')
  for(let i = 0; i<divs.length; i++) {
    divs[i].style.display = 'block';
    divs[i].style.opacity = '0';
    await timer(1000);
    divs[i].style.opacity = '1'
    await timer(60000);
    divs[i].style.opacity = '0'
    await timer(1000);
    divs[i].style.display = 'none'
  }
  switchScene();
}
