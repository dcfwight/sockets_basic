// this is a function to return the values for query variables in the http query.

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1].replace(/\+/g," ")); // this is regex - first argument. / and / mark the begining and end of the regex.
        // the \is the escape sign which escapes the +. g means global, so it replaces all instances.
        }
    }
    
    return undefined;
}