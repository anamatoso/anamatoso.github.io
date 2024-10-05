<script>
  function searchPosts() {
    // Get the input value from the search bar
    var input = document.getElementById("search-bar").value.toLowerCase();
    
    // Get all the blog post items
    var posts = document.getElementsByClassName("blog-post-item");
    
    // Loop through all the posts and hide those that don't match the search query
    for (var i = 0; i < posts.length; i++) {
      var title = posts[i].getElementsByClassName("blog-post-title")[0].innerText.toLowerCase();
      
      // If the title includes the search query, show the post, otherwise hide it
      if (title.includes(input)) {
        posts[i].style.display = "";
      } else {
        posts[i].style.display = "none";
      }
    }
  }
</script>
