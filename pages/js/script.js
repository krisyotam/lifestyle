document.addEventListener("DOMContentLoaded", function() {
  // Fetch the blog posts from the JSON file
  fetch('/posts/json/posts.json')
    .then(response => response.json())
    .then(data => {
      const postsContainer = document.querySelector('main');
      const postsPerPage = 4;  // Number of posts to display per page
      let currentPage = 1;

      // Reverse the posts array to display newer posts first
      const posts = data.posts.reverse();

      // Function to render posts on the current page
      function renderPosts() {
        // Clear the current posts
        postsContainer.innerHTML = '';

        // Get the slice of posts for the current page
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const postsToDisplay = posts.slice(start, end);

        // Loop through each post and add it to the page
        postsToDisplay.forEach(post => {
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
      }

      // Function to update the pagination display
      function updatePagination() {
        const totalPages = Math.ceil(posts.length / postsPerPage);
        const pageNumbersContainer = document.querySelector('.page-numbers');
        const nextPageButton = document.querySelector('.next-page');

        // Remove existing page links
        pageNumbersContainer.innerHTML = '';

        // Add page numbers dynamically
        for (let i = 1; i <= totalPages; i++) {
          const pageLink = document.createElement('a');
          pageLink.href = '#';
          pageLink.textContent = i;

          // Set current page style
          if (i === currentPage) {
            pageLink.classList.add('current');
          }

          pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderPosts();
            updatePagination();
          });

          pageNumbersContainer.appendChild(pageLink);
        }

        // Add 'Next' button logic
        nextPageButton.disabled = currentPage >= totalPages;
        nextPageButton.addEventListener('click', (e) => {
          e.preventDefault();
          if (currentPage < totalPages) {
            currentPage++;
            renderPosts();
            updatePagination();
          }
        });
      }

      // Initial render and pagination setup
      renderPosts();
      updatePagination();
    })
    .catch(error => console.error('Error loading blog posts:', error));
});
