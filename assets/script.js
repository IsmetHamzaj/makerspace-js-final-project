var shortenBtn = document.getElementById('shorten-btn');
var urlInputElement = document.getElementById("url-input");
var urlsListElement = document.getElementById("text-div");



function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

function getMainUrl(url) {
    try {
        const puttedUrl = new URL(url)
        return puttedUrl.hostname
    } catch (error) {
        console.log("URL is invalid: ", error)
        return null;
    }
}


function loadUrls() {
    var urls = JSON.parse(localStorage.getItem("urls")) || [];
    urlsListElement.innerHTML = '';
    urls.forEach(url => {
        var mainUrl = getMainUrl(url)
        if (mainUrl) {
            const randomStringForUrl = generateRandomString(10)
            var linkDiv = document.createElement('div');
            linkDiv.className = 'link-div';
            linkDiv.innerHTML = `<a href="${url}">${mainUrl}/${randomStringForUrl}</a>
                             <span><a href=""><img src="assets/images/deleteIcon.png" alt=""></a></span>`;
            urlsListElement.appendChild(linkDiv);
        }
    });
}

loadUrls();

shortenBtn.addEventListener('click', () => {
    var urlInput = urlInputElement.value;
    if (urlInput) {
        var urls = JSON.parse(localStorage.getItem("urls")) || [];
        urls.push(urlInput);
        localStorage.setItem("urls", JSON.stringify(urls));
        urlInputElement.value = '';
        loadUrls();
    }
});

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
});