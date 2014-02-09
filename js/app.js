$(function() {
  var githubSearch = function(query) {
    $('#message').show();
    $('#message').html('Searching github with ' + query + '...');
    $('#user').val('');

    var url = "https://api.github.com/search/repositories?q=" + query;
    $.getJSON(url, function(data) {
      // console.log(data);
      var first_page = data.items[0] && data.items[0].html_url;
      if (first_page) {
        window.location = first_page;
      }
      else {
        $('.alert-box').show();
        $('#error').html('No results for ' + query);
      }
    });
  };

  $("form").on('submit', function(e) {
    githubSearch($("#query").val());
    e.preventDefault();
  });

  // close alert box
  $('a.close').on('click', function(e) { $(e.target).parent().hide() });

  var match;
  if (match = window.location.search.match(/query=([^&]+)/)) {
    githubSearch(match[1]);
  }
});
