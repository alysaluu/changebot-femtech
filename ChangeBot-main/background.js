console.log("from background")

chrome.tabs.onUpdated.addListener(
    function (tabId, changeInfo, tab) {
        console.log(changeInfo.status);
        if (changeInfo.status != 'complete')
            return;

        chrome.tabs.get(tabId, current_tab_info => {
            console.log("helloworld");
            console.log(current_tab_info.url);
            if (/^https:\/\/www\.change\.org\/p/.test(current_tab_info.url)) {
                chrome.tabs.insertCSS(null, {file:'./style.css'});
                chrome.tabs.executeScript(null, { file: './foreground.js' }, () => {
                    console.log("triggering onActivated scirpt");
                })
            }
        });
    }
);
