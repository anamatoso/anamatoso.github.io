/**
 * Menu
 */
 $("a.menu-icon").on("click", function(event) {
   var w = $(".menu");

   w.css({
     display: w.css("display") === "none"
      ? "block"
      : "none"
   });
 });

/**
 * Wechat widget
 */
function moveWidget(event) {
  var w = $("#wechat-widget");

  w.css({
    left: event.pageX - 25,
    top: event.pageY - w.height() - 60
  });
}

$("a#wechat-link").on("mouseenter", function(event) {
  $("#wechat-widget").css({ display: "block" });
  moveWidget(event);
});

$("a#wechat-link").on("mousemove", function(event) {
  moveWidget(event);
});

$("a#wechat-link").on("mouseleave", function(event) {
  $("#wechat-widget").css({ display: "none" });
});


window.onbeforeunload = () => {
  for(const form of document.getElementsByTagName('form')) {
    form.reset();
  }
}

/**
 * Blog Search and Filter Functionality
 */
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('blog-search');
  const tagFilter = document.getElementById('tag-filter');
  const postsContainer = document.getElementById('blog-posts-container');
  
  if (!searchInput || !tagFilter || !postsContainer) return;
  
  const posts = Array.from(postsContainer.querySelectorAll('.blog-post-card'));
  
  function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedTag = tagFilter.value.toLowerCase();
    
    posts.forEach(post => {
      const title = post.querySelector('.blog-post-title a').textContent.toLowerCase();
      const excerpt = post.querySelector('.blog-post-excerpt')?.textContent.toLowerCase() || '';
      const tags = Array.from(post.querySelectorAll('.blog-post-tag')).map(tag => tag.textContent.toLowerCase());
      
      const matchesSearch = title.includes(searchTerm) || excerpt.includes(searchTerm);
      const matchesTag = !selectedTag || tags.includes(selectedTag);
      
      if (matchesSearch && matchesTag) {
        post.style.display = 'block';
        post.style.animation = 'fadeIn 0.3s ease-in';
      } else {
        post.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    const visiblePosts = posts.filter(post => post.style.display !== 'none');
    let noResultsMsg = document.getElementById('no-results-message');
    
    if (visiblePosts.length === 0 && (searchTerm || selectedTag)) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'no-results-message';
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
          <div class="no-results-content">
            <h3>No posts found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        `;
        postsContainer.appendChild(noResultsMsg);
      }
      noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  }
  
  // Add event listeners
  searchInput.addEventListener('input', filterPosts);
  tagFilter.addEventListener('change', filterPosts);
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .no-results-message {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem 1rem;
      color: #6b7280;
    }
    
    .no-results-content h3 {
      margin: 0 0 0.5rem 0;
      color: #374151;
    }
    
    .no-results-content p {
      margin: 0;
    }
  `;
  document.head.appendChild(style);
});