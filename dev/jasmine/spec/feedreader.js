/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has defined URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect((feed.url).length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has defined names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect((feed.name).length).not.toBe(0);
            });
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        // store menu icon element
        const menuIcon = document.querySelector('i.icon-list');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden by default', function() {
            expect(document.body.classList.contains('menu-hidden')).toBeTruthy();
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('changes visibility when icon is clicked', function() {
            
            // simulate first click on menu icon
            menuIcon.click();
            // test that the click results in showing the menu
            expect(document.body.classList.contains('menu-hidden')).not.toBeTruthy();

            //simulate another click on menu icon
            menuIcon.click();
            // test that the second click results in hiding the menu
            expect(document.body.classList.contains('menu-hidden')).toBeTruthy();

        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        let entry;

        // load feed using the loadFeed function before funning test
        beforeEach(function(done) {
            loadFeed(0, function() {
                // store the first entry found in the DOM
                entry = document.querySelector('.feed article.entry');
                done();
            })
        });

        // test that first entry stored is valid
        it('has at least one entry', function() {
            expect(entry).toBeDefined();
        });
    
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let entryLink1;
        let entryLink2;

        // load first two feeds using the loadFeed function before running test
        beforeEach(function(done) {
            loadFeed(0, function() {
                // store the first entry link found in the DOM
                entryLink1 = document.querySelectorAll('.entry-link')[0];
                loadFeed(1, function() {
                    // store the second entry link found in the DOM
                    entryLink2 = document.querySelectorAll('.entry-link')[1];
                    done(); 
                });
            });
        });

        // test the two entry links for matching content and validity
        it('changes content', function() {
            expect(entryLink1).not.toMatch(entryLink2);
            expect(entryLink1).toBeDefined();
            expect(entryLink2).toBeDefined();
        });

    });

}());