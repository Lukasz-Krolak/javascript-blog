{
    'use strict';


    const titleClickHandler = function (event) {
        const clickedElement = this;
        event.preventDefault();
        console.log(event);
        console.log('Link was clicked!');

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        console.log('clickedElement:', clickedElement);

        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.post', '.active');
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');
        console.log(articleSelector);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);
        console.log(targetArticle);

        /* add class 'active' to the correct article */
        targetArticle.classList.add('active');
        console.log('clickedElement:', targetArticle);
    }

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }


    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks() {

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
        console.log(titleList);
        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log(articles);
      
        /* get the article id */
        for (let activeArticle of articles) {
            activeArticle.classList.remove('active');
        }
        /* find the title element */

        /* get the title from the title element */

        /* create HTML of the link */

        /* insert link into titleList */

    }
    generateTitleLinks();
}