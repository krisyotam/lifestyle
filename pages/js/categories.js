// Fetch posts data from posts.json
fetch('/posts/json/posts.json')
    .then(response => response.json())
    .then(data => {
        const posts = data.posts;
        const seriesCount = {};

        // Count the number of posts in each series
        posts.forEach(post => {
            const seriesName = post.series;
            if (!seriesCount[seriesName]) {
                seriesCount[seriesName] = 0;
            }
            seriesCount[seriesName]++;
        });

        // Generate the categories list with series names and post counts
        const categoriesList = Object.keys(seriesCount).map(seriesName => {
            // Find the corresponding series URL for each series
            const seriesUrl = posts.find(post => post.series === seriesName)["series-url"];
            return {
                name: seriesName,
                count: seriesCount[seriesName],
                url: seriesUrl
            };
        });

        // Now render the categories dynamically into the table
        const tableBody = document.querySelector('table tbody');
        categoriesList.forEach(category => {
            const row = document.createElement('tr');
            const seriesCell = document.createElement('td');
            const countCell = document.createElement('td');

            const seriesLink = document.createElement('a');
            seriesLink.href = category.url;
            seriesLink.textContent = category.name;
            
            seriesCell.appendChild(seriesLink);
            countCell.textContent = category.count;

            row.appendChild(seriesCell);
            row.appendChild(countCell);
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error loading posts:', error));
