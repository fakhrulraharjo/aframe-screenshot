var sceneEl = document.querySelector('a-scene');
var counter = 0;

let shareData;
document.addEventListener('pointerup', (event) => {
    if (counter%2 !== 0) {
        navigator.share(shareData).then(function()    {}).catch(function(err) {alert(err);});
        ++counter;
        return;
    }
    function captureVideos() {
      var canvas = document.getElementById("canvas"); // declare a canvas element in your html
      var ctx = canvas.getContext("2d");
      var videos = document.querySelectorAll("video");
      var i, w, h;

      for (i = 0, len = videos.length; i < len; i++) {
        const v = videos[i];
        
        try {
            w = v.videoWidth;
            h = v.videoHeight;
            canvas.width = w;
            canvas.height = h;
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(v, 0, 0, w, h);
            const a = canvas.toDataURL();
            v.style.backgroundImage = "url(" + a + ")";
            ctx.clearRect(0, 0, w, h); // clean the canvas
            canvas.width = canvas.height = 0;
        } catch(e) {
            console.log(e);
        }
      }
    }
    
    captureVideos();
    sceneEl.renderer.render(sceneEl.object3D, sceneEl.camera);
    html2canvas(document.body, {width: document.documentElement.offsetWidth, height: document.documentElement.offsetHeight}).then(function(canvas) {
        function dataURLtoFile(dataurl) {
            var bstr = atob(dataurl.split(',')[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return u8arr;
        }
                
        const dataURL = canvas.toDataURL();
        const byteArray = dataURLtoFile(dataURL);
        shareData = {
            files: [new File([byteArray], "bla.png", {type: "image/png"})]
        };
        alert("done");
    }).catch(e => {
        alert(e);
        console.error(e);
        
    });
    ++counter;
});