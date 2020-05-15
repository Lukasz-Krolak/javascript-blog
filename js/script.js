/*{*/
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

            const activeArticles = document.querySelectorAll('.post .active');
            for (let activeArticle of activeArticles) {
                activeArticle.classList.remove('.post .active');
                console.log(activeArticle);
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
    }

    /*6.4*/
/*    {
        const optArticleSelector = '.post',
            optTitleSelector = '.post-title',
            optTitleListSelector = '.titles';

        function generateTitleLinks() {
            /* remove contents of titleList */
  /*          const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
            console.log(titleList);
            /* for each article */
    /*        const articles = document.querySelectorAll(optArticleSelector);
            console.log(articles);
            const links = document.querySelectorAll('.titles a');

            let html = '';

            for (const article of articles) {
                article.addEventListener('click', generateTitleLinks);
                console.log(article);
                /* get the article id */
    /*            const articleId = article.getAttribute('id').innerHTML;
                console.log(articleId);

                /* find the title element */
      /*          const optTitleListSelector = document.querySelector('.titles').innerHTML;
                console.log(optTitleListSelector);

                /* get the title from the title element */
        /*        const articleTitle = document.querySelector(optTitleSelector).innerHTML;
                console.log(articleTitle);

                /* create HTML of the link */
          /*      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
                console.log(linkHTML);

                /* insert link into titleList */
    /*            titleList.innerHTML = titleList.innerHTML + linkHTML;

            }
            titleList.innerHTML = html;
            console.log(html);
        }
        generateTitleLinks();
    }

}*/