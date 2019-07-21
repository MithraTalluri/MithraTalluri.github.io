window.onload = function () {
    fetchContent();
}

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function fetchContent() {
    getJSON('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mithratalluri',
        function (err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                displayContentFromJSON(data);
            }
        });
}

function displayContentFromJSON(obj) {
    let postsData = "";
    let itemsArray = obj.items;
    for (let i = 0; i < itemsArray.length; i++) {
        let isBlogPost = itemsArray[i].categories.length > 0;
        if (isBlogPost) {
            let postTitle = itemsArray[i].title;
            let postPublishedDate = itemsArray[i].pubDate.split(" ")[0];
            let postURL = itemsArray[i].link;
            let postThumbnailSrc = itemsArray[i].thumbnail;
            let postGuid = itemsArray[i].guid;

            postsData += "<article class=\"post\">\r\n" +
                "    <h1>\r\n" +
                "        <a href=\"" + postURL + "\" target=\"_blank\">" + postTitle + "</a>\r\n" +
                "    </h1>\r\n" +
                "    <div class=\"entry\">\r\n" +
                "        <img src=\"" + postThumbnailSrc + "\" onclick=\"window.open('" + postURL + "', '_blank');\" style=\"cursor:pointer;\"/>\r\n" +
                "    </div>\r\n" +
                "    <a href=\"" + postURL + "\" class=\"read-more\" target=\"_blank\">Read More</a>\r\n" +
                "</article>";
        }
    }
    document.getElementById("medium-posts").innerHTML = postsData;
}