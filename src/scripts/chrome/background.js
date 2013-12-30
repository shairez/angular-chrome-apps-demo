chrome.app.runtime.onLaunched.addListener(function(launchData){

    chrome.app.window.create("index.html", {
        bounds: {
            width: 600,
            height: 600
        },
        minWidth: 600,
        height: 600
    })

})