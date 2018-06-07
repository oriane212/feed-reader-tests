'use strict';

/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 */

// The names and URLs to all of the feeds we'd like available.
var allFeeds = [{
    name: 'Udacity Blog',
    url: 'http://blog.udacity.com/feed'
}, {
    name: 'CSS Tricks',
    url: 'http://feeds.feedburner.com/CssTricks'
}, {
    name: 'HTML5 Rocks',
    url: 'http://feeds.feedburner.com/html5rocks'
}, {
    name: 'Linear Digressions',
    url: 'http://feeds.feedburner.com/udacity-linear-digressions'
}];

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */
function init() {
    // Load the first feed we've defined (index of 0).
    loadFeed(0);
}

/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 */
function loadFeed(id, cb) {
    var feedUrl = allFeeds[id].url,
        feedName = allFeeds[id].name;

    $.ajax({
        type: "POST",
        url: 'https://rsstojson.udacity.com/parseFeed',
        data: JSON.stringify({ url: feedUrl }),
        contentType: "application/json",
        success: function success(result, status) {

            var container = $('.feed'),
                title = $('.header-title'),
                entries = result.feed.entries,
                entriesLen = entries.length,
                entryTemplate = Handlebars.compile($('.tpl-entry').html());

            title.html(feedName); // Set the header text
            container.empty(); // Empty out all previous entries

            /* Loop through the entries we just loaded via the Google
             * Feed Reader API. We'll then parse that entry against the
             * entryTemplate (created above using Handlebars) and append
             * the resulting HTML to the list of entries on the page.
             */
            entries.forEach(function (entry) {
                container.append(entryTemplate(entry));
            });

            if (cb) {
                cb();
            }
        },
        error: function error(result, status, err) {
            //run only the callback without attempting to parse result due to error
            if (cb) {
                cb();
            }
        },
        dataType: "json"
    });
}

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.setOnLoadCallback(init);

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
$(function () {
    var container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');

    /* Loop through all of our feeds, assigning an id property to
     * each of the feeds based upon its index within the array.
     * Then parse that feed against the feedItemTemplate (created
     * above using Handlebars) and append it to the list of all
     * available feeds within the menu.
     */
    allFeeds.forEach(function (feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));

        feedId++;
    });

    /* When a link in our feedList is clicked on, we want to hide
     * the menu, load the feed, and prevent the default action
     * (following the link) from occurring.
     */
    feedList.on('click', 'a', function () {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    /* When the menu icon is clicked on, we need to toggle a class
     * on the body to perform the hiding/showing of our menu.
     */
    menuIcon.on('click', function () {
        $('body').toggleClass('menu-hidden');
    });
}());
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhbGxGZWVkcyIsIm5hbWUiLCJ1cmwiLCJpbml0IiwibG9hZEZlZWQiLCJpZCIsImNiIiwiZmVlZFVybCIsImZlZWROYW1lIiwiJCIsImFqYXgiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJzdGF0dXMiLCJjb250YWluZXIiLCJ0aXRsZSIsImVudHJpZXMiLCJmZWVkIiwiZW50cmllc0xlbiIsImxlbmd0aCIsImVudHJ5VGVtcGxhdGUiLCJIYW5kbGViYXJzIiwiY29tcGlsZSIsImh0bWwiLCJlbXB0eSIsImZvckVhY2giLCJlbnRyeSIsImFwcGVuZCIsImVycm9yIiwiZXJyIiwiZGF0YVR5cGUiLCJnb29nbGUiLCJzZXRPbkxvYWRDYWxsYmFjayIsImZlZWRMaXN0IiwiZmVlZEl0ZW1UZW1wbGF0ZSIsImZlZWRJZCIsIm1lbnVJY29uIiwib24iLCJpdGVtIiwiYWRkQ2xhc3MiLCJ0b2dnbGVDbGFzcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7QUFRQTtBQUNBLElBQUlBLFdBQVcsQ0FDWDtBQUNJQyxVQUFNLGNBRFY7QUFFSUMsU0FBSztBQUZULENBRFcsRUFJUjtBQUNDRCxVQUFNLFlBRFA7QUFFQ0MsU0FBSztBQUZOLENBSlEsRUFPUjtBQUNDRCxVQUFNLGFBRFA7QUFFQ0MsU0FBSztBQUZOLENBUFEsRUFVUjtBQUNDRCxVQUFNLG9CQURQO0FBRUNDLFNBQUs7QUFGTixDQVZRLENBQWY7O0FBZ0JBOzs7O0FBSUEsU0FBU0MsSUFBVCxHQUFnQjtBQUNaO0FBQ0FDLGFBQVMsQ0FBVDtBQUNIOztBQUVEOzs7Ozs7OztBQVFBLFNBQVNBLFFBQVQsQ0FBa0JDLEVBQWxCLEVBQXNCQyxFQUF0QixFQUEwQjtBQUN0QixRQUFJQyxVQUFVUCxTQUFTSyxFQUFULEVBQWFILEdBQTNCO0FBQUEsUUFDSU0sV0FBV1IsU0FBU0ssRUFBVCxFQUFhSixJQUQ1Qjs7QUFHQVEsTUFBRUMsSUFBRixDQUFPO0FBQ0hDLGNBQU0sTUFESDtBQUVIVCxhQUFLLHlDQUZGO0FBR0hVLGNBQU1DLEtBQUtDLFNBQUwsQ0FBZSxFQUFFWixLQUFLSyxPQUFQLEVBQWYsQ0FISDtBQUlIUSxxQkFBYSxrQkFKVjtBQUtIQyxpQkFBUyxpQkFBVUMsTUFBVixFQUFrQkMsTUFBbEIsRUFBMEI7O0FBRS9CLGdCQUFJQyxZQUFZVixFQUFFLE9BQUYsQ0FBaEI7QUFBQSxnQkFDSVcsUUFBUVgsRUFBRSxlQUFGLENBRFo7QUFBQSxnQkFFSVksVUFBVUosT0FBT0ssSUFBUCxDQUFZRCxPQUYxQjtBQUFBLGdCQUdJRSxhQUFhRixRQUFRRyxNQUh6QjtBQUFBLGdCQUlJQyxnQkFBZ0JDLFdBQVdDLE9BQVgsQ0FBbUJsQixFQUFFLFlBQUYsRUFBZ0JtQixJQUFoQixFQUFuQixDQUpwQjs7QUFNQVIsa0JBQU1RLElBQU4sQ0FBV3BCLFFBQVgsRUFSK0IsQ0FRUDtBQUN4Qlcsc0JBQVVVLEtBQVYsR0FUK0IsQ0FTUDs7QUFFeEI7Ozs7O0FBS0FSLG9CQUFRUyxPQUFSLENBQWdCLFVBQVVDLEtBQVYsRUFBaUI7QUFDN0JaLDBCQUFVYSxNQUFWLENBQWlCUCxjQUFjTSxLQUFkLENBQWpCO0FBQ0gsYUFGRDs7QUFJQSxnQkFBSXpCLEVBQUosRUFBUTtBQUNKQTtBQUNIO0FBQ0osU0E1QkU7QUE2QkgyQixlQUFPLGVBQVVoQixNQUFWLEVBQWtCQyxNQUFsQixFQUEwQmdCLEdBQTFCLEVBQStCO0FBQ2xDO0FBQ0EsZ0JBQUk1QixFQUFKLEVBQVE7QUFDSkE7QUFDSDtBQUNKLFNBbENFO0FBbUNINkIsa0JBQVU7QUFuQ1AsS0FBUDtBQXFDSDs7QUFFRDs7O0FBR0FDLE9BQU9DLGlCQUFQLENBQXlCbEMsSUFBekI7O0FBRUE7Ozs7QUFJQU0sRUFBRSxZQUFZO0FBQ1YsUUFBSVUsWUFBWVYsRUFBRSxPQUFGLENBQWhCO0FBQUEsUUFDSTZCLFdBQVc3QixFQUFFLFlBQUYsQ0FEZjtBQUFBLFFBRUk4QixtQkFBbUJiLFdBQVdDLE9BQVgsQ0FBbUJsQixFQUFFLHFCQUFGLEVBQXlCbUIsSUFBekIsRUFBbkIsQ0FGdkI7QUFBQSxRQUdJWSxTQUFTLENBSGI7QUFBQSxRQUlJQyxXQUFXaEMsRUFBRSxpQkFBRixDQUpmOztBQU1BOzs7Ozs7QUFNQVQsYUFBUzhCLE9BQVQsQ0FBaUIsVUFBVVIsSUFBVixFQUFnQjtBQUM3QkEsYUFBS2pCLEVBQUwsR0FBVW1DLE1BQVY7QUFDQUYsaUJBQVNOLE1BQVQsQ0FBZ0JPLGlCQUFpQmpCLElBQWpCLENBQWhCOztBQUVBa0I7QUFDSCxLQUxEOztBQU9BOzs7O0FBSUFGLGFBQVNJLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLEdBQXJCLEVBQTBCLFlBQVk7QUFDbEMsWUFBSUMsT0FBT2xDLEVBQUUsSUFBRixDQUFYOztBQUVBQSxVQUFFLE1BQUYsRUFBVW1DLFFBQVYsQ0FBbUIsYUFBbkI7QUFDQXhDLGlCQUFTdUMsS0FBSy9CLElBQUwsQ0FBVSxJQUFWLENBQVQ7QUFDQSxlQUFPLEtBQVA7QUFDSCxLQU5EOztBQVFBOzs7QUFHQTZCLGFBQVNDLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFlBQVk7QUFDN0JqQyxVQUFFLE1BQUYsRUFBVW9DLFdBQVYsQ0FBc0IsYUFBdEI7QUFDSCxLQUZEO0FBR0gsQ0F0Q0MsRUFBRiIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBhcHAuanNcbiAqXG4gKiBUaGlzIGlzIG91ciBSU1MgZmVlZCByZWFkZXIgYXBwbGljYXRpb24uIEl0IHVzZXMgdGhlIEdvb2dsZVxuICogRmVlZCBSZWFkZXIgQVBJIHRvIGdyYWIgUlNTIGZlZWRzIGFzIEpTT04gb2JqZWN0IHdlIGNhbiBtYWtlXG4gKiB1c2Ugb2YuIEl0IGFsc28gdXNlcyB0aGUgSGFuZGxlYmFycyB0ZW1wbGF0aW5nIGxpYnJhcnkgYW5kXG4gKiBqUXVlcnkuXG4gKi9cblxuLy8gVGhlIG5hbWVzIGFuZCBVUkxzIHRvIGFsbCBvZiB0aGUgZmVlZHMgd2UnZCBsaWtlIGF2YWlsYWJsZS5cbnZhciBhbGxGZWVkcyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdVZGFjaXR5IEJsb2cnLFxuICAgICAgICB1cmw6ICdodHRwOi8vYmxvZy51ZGFjaXR5LmNvbS9mZWVkJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ0NTUyBUcmlja3MnLFxuICAgICAgICB1cmw6ICdodHRwOi8vZmVlZHMuZmVlZGJ1cm5lci5jb20vQ3NzVHJpY2tzJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ0hUTUw1IFJvY2tzJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL2ZlZWRzLmZlZWRidXJuZXIuY29tL2h0bWw1cm9ja3MnXG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnTGluZWFyIERpZ3Jlc3Npb25zJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL2ZlZWRzLmZlZWRidXJuZXIuY29tL3VkYWNpdHktbGluZWFyLWRpZ3Jlc3Npb25zJ1xuICAgIH1cbl07XG5cbi8qIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHVwIG91ciBhcHBsaWNhdGlvbi4gVGhlIEdvb2dsZSBGZWVkXG4gKiBSZWFkZXIgQVBJIGlzIGxvYWRlZCBhc3luY2hvbm91c2x5IGFuZCB3aWxsIHRoZW4gY2FsbCB0aGlzXG4gKiBmdW5jdGlvbiB3aGVuIHRoZSBBUEkgaXMgbG9hZGVkLlxuICovXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIC8vIExvYWQgdGhlIGZpcnN0IGZlZWQgd2UndmUgZGVmaW5lZCAoaW5kZXggb2YgMCkuXG4gICAgbG9hZEZlZWQoMCk7XG59XG5cbi8qIFRoaXMgZnVuY3Rpb24gcGVyZm9ybXMgZXZlcnl0aGluZyBuZWNlc3NhcnkgdG8gbG9hZCBhXG4gKiBmZWVkIHVzaW5nIHRoZSBHb29nbGUgRmVlZCBSZWFkZXIgQVBJLiBJdCB3aWxsIHRoZW5cbiAqIHBlcmZvcm0gYWxsIG9mIHRoZSBET00gb3BlcmF0aW9ucyByZXF1aXJlZCB0byBkaXNwbGF5XG4gKiBmZWVkIGVudHJpZXMgb24gdGhlIHBhZ2UuIEZlZWRzIGFyZSByZWZlcmVuY2VkIGJ5IHRoZWlyXG4gKiBpbmRleCBwb3NpdGlvbiB3aXRoaW4gdGhlIGFsbEZlZWRzIGFycmF5LlxuICogVGhpcyBmdW5jdGlvbiBhbGwgc3VwcG9ydHMgYSBjYWxsYmFjayBhcyB0aGUgc2Vjb25kIHBhcmFtZXRlclxuICogd2hpY2ggd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgZXZlcnl0aGluZyBoYXMgcnVuIHN1Y2Nlc3NmdWxseS5cbiAqL1xuZnVuY3Rpb24gbG9hZEZlZWQoaWQsIGNiKSB7XG4gICAgdmFyIGZlZWRVcmwgPSBhbGxGZWVkc1tpZF0udXJsLFxuICAgICAgICBmZWVkTmFtZSA9IGFsbEZlZWRzW2lkXS5uYW1lO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogJ2h0dHBzOi8vcnNzdG9qc29uLnVkYWNpdHkuY29tL3BhcnNlRmVlZCcsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgdXJsOiBmZWVkVXJsIH0pLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQsIHN0YXR1cykge1xuXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJCgnLmZlZWQnKSxcbiAgICAgICAgICAgICAgICB0aXRsZSA9ICQoJy5oZWFkZXItdGl0bGUnKSxcbiAgICAgICAgICAgICAgICBlbnRyaWVzID0gcmVzdWx0LmZlZWQuZW50cmllcyxcbiAgICAgICAgICAgICAgICBlbnRyaWVzTGVuID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgZW50cnlUZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZSgkKCcudHBsLWVudHJ5JykuaHRtbCgpKTtcblxuICAgICAgICAgICAgdGl0bGUuaHRtbChmZWVkTmFtZSk7ICAgLy8gU2V0IHRoZSBoZWFkZXIgdGV4dFxuICAgICAgICAgICAgY29udGFpbmVyLmVtcHR5KCk7ICAgICAgLy8gRW1wdHkgb3V0IGFsbCBwcmV2aW91cyBlbnRyaWVzXG5cbiAgICAgICAgICAgIC8qIExvb3AgdGhyb3VnaCB0aGUgZW50cmllcyB3ZSBqdXN0IGxvYWRlZCB2aWEgdGhlIEdvb2dsZVxuICAgICAgICAgICAgICogRmVlZCBSZWFkZXIgQVBJLiBXZSdsbCB0aGVuIHBhcnNlIHRoYXQgZW50cnkgYWdhaW5zdCB0aGVcbiAgICAgICAgICAgICAqIGVudHJ5VGVtcGxhdGUgKGNyZWF0ZWQgYWJvdmUgdXNpbmcgSGFuZGxlYmFycykgYW5kIGFwcGVuZFxuICAgICAgICAgICAgICogdGhlIHJlc3VsdGluZyBIVE1MIHRvIHRoZSBsaXN0IG9mIGVudHJpZXMgb24gdGhlIHBhZ2UuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKGVudHJ5VGVtcGxhdGUoZW50cnkpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHJlc3VsdCwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgICAgIC8vcnVuIG9ubHkgdGhlIGNhbGxiYWNrIHdpdGhvdXQgYXR0ZW1wdGluZyB0byBwYXJzZSByZXN1bHQgZHVlIHRvIGVycm9yXG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcbiAgICB9KTtcbn1cblxuLyogR29vZ2xlIEFQSTogTG9hZHMgdGhlIEZlZWQgUmVhZGVyIEFQSSBhbmQgZGVmaW5lcyB3aGF0IGZ1bmN0aW9uXG4gKiB0byBjYWxsIHdoZW4gdGhlIEZlZWQgUmVhZGVyIEFQSSBpcyBkb25lIGxvYWRpbmcuXG4gKi9cbmdvb2dsZS5zZXRPbkxvYWRDYWxsYmFjayhpbml0KTtcblxuLyogQWxsIG9mIHRoaXMgZnVuY3Rpb25hbGl0eSBpcyBoZWF2aWx5IHJlbGlhbnQgdXBvbiB0aGUgRE9NLCBzbyB3ZVxuICogcGxhY2Ugb3VyIGNvZGUgaW4gdGhlICQoKSBmdW5jdGlvbiB0byBlbnN1cmUgaXQgZG9lc24ndCBleGVjdXRlXG4gKiB1bnRpbCB0aGUgRE9NIGlzIHJlYWR5LlxuICovXG4kKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGFpbmVyID0gJCgnLmZlZWQnKSxcbiAgICAgICAgZmVlZExpc3QgPSAkKCcuZmVlZC1saXN0JyksXG4gICAgICAgIGZlZWRJdGVtVGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoJCgnLnRwbC1mZWVkLWxpc3QtaXRlbScpLmh0bWwoKSksXG4gICAgICAgIGZlZWRJZCA9IDAsXG4gICAgICAgIG1lbnVJY29uID0gJCgnLm1lbnUtaWNvbi1saW5rJyk7XG5cbiAgICAvKiBMb29wIHRocm91Z2ggYWxsIG9mIG91ciBmZWVkcywgYXNzaWduaW5nIGFuIGlkIHByb3BlcnR5IHRvXG4gICAgICogZWFjaCBvZiB0aGUgZmVlZHMgYmFzZWQgdXBvbiBpdHMgaW5kZXggd2l0aGluIHRoZSBhcnJheS5cbiAgICAgKiBUaGVuIHBhcnNlIHRoYXQgZmVlZCBhZ2FpbnN0IHRoZSBmZWVkSXRlbVRlbXBsYXRlIChjcmVhdGVkXG4gICAgICogYWJvdmUgdXNpbmcgSGFuZGxlYmFycykgYW5kIGFwcGVuZCBpdCB0byB0aGUgbGlzdCBvZiBhbGxcbiAgICAgKiBhdmFpbGFibGUgZmVlZHMgd2l0aGluIHRoZSBtZW51LlxuICAgICAqL1xuICAgIGFsbEZlZWRzLmZvckVhY2goZnVuY3Rpb24gKGZlZWQpIHtcbiAgICAgICAgZmVlZC5pZCA9IGZlZWRJZDtcbiAgICAgICAgZmVlZExpc3QuYXBwZW5kKGZlZWRJdGVtVGVtcGxhdGUoZmVlZCkpO1xuXG4gICAgICAgIGZlZWRJZCsrO1xuICAgIH0pO1xuXG4gICAgLyogV2hlbiBhIGxpbmsgaW4gb3VyIGZlZWRMaXN0IGlzIGNsaWNrZWQgb24sIHdlIHdhbnQgdG8gaGlkZVxuICAgICAqIHRoZSBtZW51LCBsb2FkIHRoZSBmZWVkLCBhbmQgcHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb25cbiAgICAgKiAoZm9sbG93aW5nIHRoZSBsaW5rKSBmcm9tIG9jY3VycmluZy5cbiAgICAgKi9cbiAgICBmZWVkTGlzdC5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpO1xuXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbWVudS1oaWRkZW4nKTtcbiAgICAgICAgbG9hZEZlZWQoaXRlbS5kYXRhKCdpZCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyogV2hlbiB0aGUgbWVudSBpY29uIGlzIGNsaWNrZWQgb24sIHdlIG5lZWQgdG8gdG9nZ2xlIGEgY2xhc3NcbiAgICAgKiBvbiB0aGUgYm9keSB0byBwZXJmb3JtIHRoZSBoaWRpbmcvc2hvd2luZyBvZiBvdXIgbWVudS5cbiAgICAgKi9cbiAgICBtZW51SWNvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbWVudS1oaWRkZW4nKTtcbiAgICB9KTtcbn0oKSk7XG4iXX0=
