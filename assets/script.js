var shortenBtn = document.getElementById('shorten-btn');
var urlInputElement = document.getElementById("url-input");
var urlsListElement = document.getElementById("text-div");

function loadUrls() {
    var urls = JSON.parse(localStorage.getItem("urls")) || [];
    urlsListElement.innerHTML = '';
    urls.forEach(url => {
        var linkDiv = document.createElement('div');
        linkDiv.className = 'link-div';
        linkDiv.innerHTML = `<a href="${url}">${url}</a>
                             <span><a href=""><img src="assets/images/deleteIcon.png" alt=""></a></span>`;
        urlsListElement.appendChild(linkDiv);
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