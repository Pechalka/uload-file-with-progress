$(function(){
    var $progressContainer = $('.progress');
    var $image = $('#image');
    var $changePanel = $('#change-panel');
    var $changeBtn = $('#change-image');
    var $form = $('#upload-form');

    $progressContainer.hide();
    $image.hide();
    $changePanel.hide();

    $('#fileinput').change(function(){
        var file = this.files[0];  
        if (file){
            $progressContainer.show();
            upload('/upload', file, function(src){
                $image.attr('src', src).show();
                $progressContainer.hide();
                $changePanel.show();
                $form.hide();
                $('#file-progress').css({ width : 0 })
            }, function(loaded, total){
                var p = total/loaded * 100;
                $('#file-progress').css({ width : p + '%'})
            });  
        } 
    })

    $changeBtn.click(function(){
        $image.hide();
        $form.show();

        return false;
    })
})


// function upload(url, file, onSuccess, onProgress, onError) {
//     var data = new FormData();
//     data.append('file', file);
//     return $.ajax({
//         url: url,
//         data: data,
//         cache: false,
//         contentType: false,
//         processData: false,
//         type: 'POST',
//         success: function(data){
//             onSuccess(data)
//         },
//         error : onError,
//         xhr: function(){
//             var xhr = $.ajaxSettings.xhr() ;
//             xhr.upload.onprogress = function(evt){ 
//                 onProgress(evt.loaded, evt.total)
//             } 
//             return xhr;
//         }
//     });
// }


function upload(url, file, onSuccess, onProgress, onError) {
  var xhr = new XMLHttpRequest();
  xhr.onload = xhr.onerror = function() {
    if(this.status != 200) {
    	console.log('error', this);
      if (onError) 
        onError(this);
    } else {
    	onSuccess(this.responseText);
    }
  };


  xhr.upload.onprogress = function(event) {
    if (onProgress)
      onProgress(event.loaded, event.total);
  }


  xhr.open("POST", url, true); 
  var formData = new FormData();
	formData.append("file", file);
	xhr.send(formData);
}
