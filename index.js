let    CLOVER_DRIVE ={
    client_id: "JTJBTMR69Y0AC",
    client_secret: "2af97167-a039-3234-4251-5b456940243d",
    // client_id: "RVH812TJR5J6A",
    // client_secret: "57d22339-9957-8d82-f211-e2cb6071924e",
    friendly_name: "Clover",
    objUrl:"assets/images/clover_cloud.png",
    isOffline:false
};


let oAuthurl = 'https://sandbox.dev.clover.com/oauth/authorize?response_type=token&client_id=' + CLOVER_DRIVE.client_id;

function ConnectonResp() {
    this.accessToken = '';
    this.adaptorId = '';
    this.merchantId = '';
    this.code = '';
    this.isError = false;
    this.isDone = false;
} 

function extractCloverToken(responseURL, cloudAuthPopup, callback) {
    var _resp = new ConnectonResp();
    _resp.merchantId = cloudAuthPopup.document.URL.split("merchant_id=")[1].split("&")[0];
    _resp.accessToken = cloudAuthPopup.document.URL.split("access_token=")[1].split("&")[0];
 
    _resp.isDone = true;
    var _timer = setInterval(function(){
        console.log(_resp)
        if(_resp.isDone && ! (_resp.accessToken == undefined)){
            console.log(_resp)
            clearTimeout(_timer);
            callback(_resp);
        }
    })
}

function connect( ) { 
    var _windoWidth =window.screen.availWidth -300; 
    
    var cloudAuthPopup = window.open('', '', 'height=700,width='+_windoWidth+',right=150,left=150,top=100');
    cloudAuthPopup.location = oAuthurl;
    var _matchUrl = window.location.pathname; 
   
    var popupWatcher = window.setInterval(function () {
        try { 
            var _url = cloudAuthPopup.document.URL; 

            if (_url.indexOf(_matchUrl) != -1) { 
                window.clearInterval(popupWatcher);                    
                cloudAuthPopup.close();
                extractCloverToken(cloudAuthPopup.document.URL, cloudAuthPopup, function(resp){

                })
            }
        } catch (e) {
        }

    },0);


}
