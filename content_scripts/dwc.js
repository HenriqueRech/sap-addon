const dwc = {
    login: {
        urlPath: "/login",
        optionName: "dwc-login",
        query: "#amalthea-login-button",
    },
};

function executeLogin() {
    executeFunctionAfterPageLoaded(function () {
        domObserver.registerCallbackFunction(dwc.login.optionName, function (_mutations, _observer) {
            getSignInButtonAndClick();
        });
        getSignInButtonAndClick();
    });
}
function getSignInButtonAndClick() {
    try {
        const signInBtn = document.querySelector(dwc.login.query);
        if (signInBtn && signInBtn.click) {
            signInBtn.click();
            stopAutoSignIn();
        }
    } catch {}
}

function stopAutoSignIn() {
    domObserver.unregisterCallbackFunction(dwc.login.optionName);
}

let options = {};

async function main() {
    if (url.pathname === dwc.login.urlPath) {
        options = await loadFromStorage("options");
        if (isEnabled(dwc.login.optionName)) {
            executeLogin();
        }
    }
}
main();
browser.runtime.onConnect.addListener(() => {
    main();
});
