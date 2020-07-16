/*eslint-disable */
var dropboxClientId = "3pap37yp0kr2bei"

var dropboxClient = {
    enabled: () => {
        return (localStorage.dropBoxMode == "enable") ? true : false
    },
    active: () => {
        return ((localStorage.dropBoxToken !== undefined) || (localStorage.dropBoxToken !== 'undefined')) && dropboxClient.enabled()
    },
    redirectToAuth: () => {
        var redirectUrl = window.location.protocol + "//" + window.location.host
        var client_id = dropboxClientId
        var authUrl = "https://www.dropbox.com/oauth2/authorize?client_id=" + client_id + "&response_type=token&redirect_uri=" + redirectUrl
        window.location = authUrl
    },
    auth: (token, async = true) => {
        localStorage.dropBoxToken = token
        localStorage.dropBoxMode = "enable"
        var request = new XMLHttpRequest()
        request.open("POST", "https://api.dropboxapi.com/2/users/get_current_account", async)
        request.setRequestHeader("Authorization", "Bearer " + localStorage.dropBoxToken)
        request.onload = function () {
            var profile = JSON.parse(request.response)
            localStorage.dropBoxUser = profile.name.display_name
            localStorage.isAppStarted = true
            window.location = window.location.protocol + "//" + window.location.host
        }
        request.send(null)
    },
    upload: (filename, content, callback = () => { }, async = true) => {
        var request = new XMLHttpRequest();
        request.open("POST", "https://content.dropboxapi.com/2/files/upload", async)
        request.setRequestHeader("Authorization", "Bearer " + localStorage.dropBoxToken)
        request.setRequestHeader("Dropbox-API-Arg", '{"path": "/' + filename + '","mode": "overwrite","autorename": false,"mute": false,"strict_conflict": false}')
        request.setRequestHeader("Content-Type", 'application/octet-stream')
        request.onload = () => {
            callback()
            console.log('[DBC]', request.response)
        }
        request.send(content)
    },
    download: (filename, callback = (response) => { }, async = true, callbackError = null) => {
        var request = new XMLHttpRequest();
        request.open("POST", "https://content.dropboxapi.com/2/files/download", async)
        request.setRequestHeader("Authorization", "Bearer " + localStorage.dropBoxToken)
        request.setRequestHeader("Dropbox-API-Arg", '{"path": "/' + filename + '"}')
        request.onload = function () {
            if (request.status == 200) {
                callback(request.response)
            } else {
                if (callbackError != null) {
                    callbackError(request)
                } else {
                    console.error('[DBC]', 'Error downloading ' + filename + '!')
                    console.error('[DBC]', 'Server response code' + request.status)
                    console.error('[DBC]', 'Response: ' + request.response)
                }
            }
        }
        request.send(null)
    }
}
export default dropboxClient
/*eslint-enable */