/*eslint-disable */
var settings = {
    "bgStyle": "bg-light",
    "lang":"en",
    "statuses":[]
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
        //Set default custom statuses
        if ((localStorage.customStatuses === undefined) || (localStorage.customStatuses === 'undefined') || (localStorage.customStatuses === "")) {
            localStorage.customStatuses = JSON.stringify(settings.statuses)
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
    getCurrentTaskFromSession: () => {
        return ((window.sessionStorage.currentTask === 'undefined') || (window.sessionStorage.currentTask === undefined))
        ? { "title": "", "summary": "", "priority": "medium", "status": "do", "created": new Date().getTime(), "expiry": new Date().getTime() + 16000 }
        : JSON.parse(window.sessionStorage.currentTask)
    },
    isAppStarted: () => {
        return ((localStorage.isAppStarted === 'undefined') || (localStorage.isAppStarted === undefined) 
            ? false 
            : localStorage.isAppStarted)
    },
    getSettings: () => {
        settings.bgStyle = localStorage.bgStyle
        settings.lang = localStorage.lang
        settings.statuses = JSON.parse(localStorage.customStatuses)
        return settings
    },
    setSettings: (setting) => {
        localStorage.bgStyle = setting.bgStyle
        localStorage.lang = setting.lang
        localStorage.customStatuses = JSON.stringify(setting.statuses)
    }
}
export default utils
/*eslint-enable*/
