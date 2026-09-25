document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const query = document.getElementById('search-input').value.trim();

    if (query !== '') {
        const isUrl = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/i.test(query);

        if (isUrl) {
            const url = query.startsWith('http://') || query.startsWith('https://') ? query : 'https://' + query;
            window.location.href = url;
        } else {
            if (typeof chrome !== 'undefined' && chrome.search && chrome.search.query) {
                chrome.search.query({
                    text: query,
                    disposition: 'CURRENT_TAB'
                });
            } else {
                window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            }
        }
    }
});