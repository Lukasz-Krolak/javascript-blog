
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

        /* [DONE] add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        console.log('clickedElement:', clickedElement);

        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.post.active');
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
            console.log('activeArticle', activeArticle);
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');
        console.log('articleselector', articleSelector);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);
        console.log('target article', targetArticle);


        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');
        console.log('clickedElement:', targetArticle);
    }

    const optArticleSelector = '.post';
    const optTitleSelector = '.post-title';
    const optTitleListSelector = '.titles';
    const optArticleTagsSelector = '.post-tags .list';

    function generateTitleLinks() {

        /* remove contents of titleList */
        let titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log('articles', articles);
        let html = '';

        for (let article of articles) {

            article.addEventListener('click', generateTitleLinks);
            console.log('kliknięty artykuł', article);

            /* get the article id */
            const articleId = article.getAttribute('id');
            console.log('articleId', articleId);

            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            console.log('znaleziony tytuł', articleTitle)
            /* get the title from the title element */

            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            /* insert link into titleList */
            titleList.innerHTML = titleList.innerHTML + linkHTML;
        }
        const links = document.querySelectorAll('.titles a');
        console.log('testowa', links);

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }
    generateTitleLinks();

    function generateTags() {
        let html = '';
        /* find all articles */

        const articles = document.querySelectorAll(optArticleSelector);
        console.log('artykuly znalezione', articles);

        /* START LOOP: for every article: */
        for (let article of articles) {

            article.addEventListener('click', generateTitleLinks);
            console.log('kliknięty artykuł', article);
        }

        /* find tags wrapper */


        let tagList = article.querySelector(optArticleTagsSelector);
        console.log('lista tagów', taglist);

        /* make html variable with empty string */

        tagList.innerHTML = '';
    
        /* get tags from data-tags attribute */

        const articleTags = article.getAttribute('href');
        console.log('tagi artykulu', articleTags);

        /* split tags into array */
        
        const articleTagsArray = articleTags.split(' ');

        /* START LOOP: for each tag */

        for(let tag of articleTagsArray){
            console.log('tag',tag);
            
            /* generate HTML of the link */
            
            const linkHTML = '<li><a href="#tag-' + a + '</span></a></li>';
            console.log('link html',linkHTML);
        
        }
            /* add generated code to html variable */

            /* END LOOP: for each tag */

        /* insert HTML of all the links into the tags wrapper */

        /* END LOOP: for every article: */
    }

    generateTags();
}