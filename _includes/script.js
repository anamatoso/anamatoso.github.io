$(document).ready(function() {
    // GitHub repository information
    var username = 'anamatoso';
    var repo = 'anamatoso.github.io';
    var branch = 'main'; // or the branch you want to track

    // GitHub API endpoint for the latest commit
    var apiUrl = 'https://api.github.com/repos/' + username + '/' + repo + '/commits/' + branch;

    // Fetch the latest commit information
    $.get(apiUrl, function(data) {
        var lastUpdatedDate = new Date(data.commit.author.date);
        var formattedDate = lastUpdatedDate.toDateString(); // You can format the date as needed

        // Update the HTML element with the last update date
        $('#lastUpdated').text(formattedDate);
    });
});
