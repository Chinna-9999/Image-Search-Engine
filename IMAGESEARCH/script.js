document.addEventListener("DOMContentLoaded", () => {
    const accessKey = "o26a9tE2RD2ZewwwqTb-ow5AJT9o7A6BgmVPvLQiOEk";
    const searchForm = document.getElementById("search-form");
    const searchBox = document.getElementById("search-box");
    const searchResult = document.getElementById("search-results");
    const showMoreBtn = document.getElementById("show-more-btn");

    let keyword = "";
    let page = 1;

    async function searchImages() {
        keyword = searchBox.value.trim();

        if (!keyword) {
            alert("Please enter a search term");
            return;
        }

        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=30`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const results = data.results;

          
            if (page === 1) {
                searchResult.innerHTML = ""; 
            }

     
            results.forEach((result) => {
                const image = document.createElement("img");
                image.src = result.urls.small;
                image.alt = result.alt_description || "Image";

                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";

                imageLink.appendChild(image);
                searchResult.appendChild(imageLink);
            });

    
            if (results.length > 0) {
                showMoreBtn.style.display = "block";
            } else {
                showMoreBtn.style.display = "none"; 
            }

        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        page = 1;
        searchImages();
    });

    
    showMoreBtn.addEventListener("click", () => {
        page++;
        searchImages();
    });
});

