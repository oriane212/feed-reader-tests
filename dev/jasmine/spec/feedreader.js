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
    /* Test suite: "RSS Feeds"
     * This suite is all about the RSS feeds definitions,
     * the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds
         * variable has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has defined URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect((feed.url).length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
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


    /* Test suite: "The menu" */
    describe('The menu', function() {

        // store menu icon element
        const menuIcon = document.querySelector('i.icon-list');

        /* Test that ensures the menu element is hidden by default. */

        it('is hidden by default', function() {
            expect(document.body.classList.contains('menu-hidden')).toBeTruthy();
        });

         /* Test that ensures the menu changes
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

    /* Test suite: "Initial Entries" */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed function is
         * called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires the
         * use of Jasmine's beforeEach and asynchronous done() function.
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

        // test that a single entry exists and is valid
        it('has at least one entry', function() {
            expect((entry).length).not.toBe(0);
            expect(entry).toBeDefined();
        });
    
    });

    /* Test suite: "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
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