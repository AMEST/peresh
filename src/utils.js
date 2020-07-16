/*eslint-disable */
var settings = {
    "bgStyle": "bg-light",
    "lang":"en"
}
var utils = {
    installPrompt: () => {
        window.addEventListener('beforeinstallprompt', function (event) {
            if ((localStorage.installPrompt === undefined) || (localStorage.installPrompt === 'undefined')) {
                localStorage.installPrompt = "success"
                console.log("[beforeinstallprompt]", "prompt")
                event.prompt()
            }
        })
    },
    parseHash: () => {
        var hash = window.location.hash.substring(1)
        var params = {}
        hash.split('&').map(hk => {
            let temp = hk.split('=')
            params[temp[0]] = temp[1]
        })
        return params
    },
    useDefaults: () => {
        //Set default theme
        if ((localStorage.bgStyle === undefined) || (localStorage.bgStyle === 'undefined')) {
            localStorage.bgStyle = settings.bgStyle
        }
        //Set default tasks
        if ((localStorage.tasks === undefined) || (localStorage.tasks === 'undefined')) {
            localStorage.tasks = JSON.stringify({})
        }
        //Set default dropBox mode
        if ((localStorage.dropBoxMode === undefined) || (localStorage.dropBoxMode === 'undefined')) {
            localStorage.dropBoxMode = "disable"
        }
    },
    showNotification: (message) => {
        var img = '/img/icons/nb-47-192.png';
        if (Notification.permission === "granted") {
            var notification = new Notification('Peresh', { body: message, icon: img });
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    var notification = new Notification('Peresh', { body: message, icon: img });
                }
            });
        }
    },
    getActiveItemFromSession: () => {
        return ((sessionStorage.activeMenuItem === 'undefined') || (sessionStorage.activeMenuItem === undefined))
            ? 'TrackerMain'
            : sessionStorage.activeMenuItem
    },
    isAppStarted: () => {
        return ((localStorage.isAppStarted === 'undefined') || (localStorage.isAppStarted === undefined) 
            ? false 
            : localStorage.isAppStarted)
    },
    getSettings: () => {
        settings.bgStyle = localStorage.bgStyle
        settings.lang = localStorage.lang
        return settings
    },
    setSettings: (settings) => {
        localStorage.bgStyle = settings.bgStyle
        localStorage.lang = settings.lang
    }
}
export default utils
/*eslint-enable*/
