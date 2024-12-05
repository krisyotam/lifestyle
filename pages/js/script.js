document.addEventListener("DOMContentLoaded", function() {
    // Fetch the blog posts from the JSON file
    fetch('/posts/json/posts.json')
      .then(response => response.json())
      .then(data => {
        const postsContainer = document.querySelector('main');
  
        // Loop through each post in the JSON and add it to the page
        data.posts.forEach(post => {
          const postElement = document.createElement('article');
          postElement.classList.add('blog-post');
  
          postElement.innerHTML = `
            <h2><a href="${post.url}">${post.title}</a></h2>
            <div class="post-meta">
              <time>${post.date}</time>
              <span>•</span>
              <span>${post.category}</span>
            </div>
            <p>${post.content}</p>
            <button class="like-button">${post.likes} likes</button>
          `;
  
          postsContainer.appendChild(postElement);
        });
      })
      .catch(error => console.error('Error loading blog posts:', error));

    // Pagination Logic
    const pages = document.querySelectorAll('.page-numbers a, .page-numbers span');
    const nextPageButton = document.getElementById('next-page');

    // Track the current page number
    let currentPage = 1;

    // Function to update the pagination display
    function updatePagination() {
        pages.forEach(page => {
            page.classList.remove('current');
            if (page.textContent === String(currentPage)) {
                page.classList.add('current');
            }
        });
    }

    // Handle next page click
    nextPageButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < 100) {
            currentPage++;
            updatePagination();
        }
    });

    // Handle page number click
    pages.forEach(page => {
        page.addEventListener('click', (e) => {
            e.preventDefault();
            const pageNumber = parseInt(e.target.textContent);
            currentPage = pageNumber;
            updatePagination();
        });
    });

    // Initial pagination setup
    updatePagination();
});
