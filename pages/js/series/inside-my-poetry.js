// Fetch posts data from posts.json
fetch('/posts/json/posts.json')
    .then(response => response.json())
    .then(data => {
        const posts = data.posts;

        // Filter posts in the "48 Laws of Power" series
        const filteredPosts = posts.filter(post => post.series === "Inside My Poetry");

        // Generate the posts list with titles and URLs
        const postsList = filteredPosts.map(post => {
            return {
                title: post.title,  // Assuming "title" is the key for the post name
                url: post.url      // Assuming "url" is the key for the post URL
            };
        });

        // Now render the posts dynamically into the table
        const tableBody = document.querySelector('table tbody');
        postsList.forEach(post => {
            const row = document.createElement('tr');
            const postCell = document.createElement('td');

            const postLink = document.createElement('a');
            postLink.href = post.url;
            postLink.textContent = post.title;

            postCell.appendChild(postLink);
            row.appendChild(postCell);
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error loading posts:', error));
