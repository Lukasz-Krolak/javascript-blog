
{
  'use strict';
  

    const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  };

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
  };

  // 7.2 początek, lista tytułów lewy sidebar//

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optTagsListSelector = '.list.tags';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorListSelector = '.post-author';

  const generateTitleLinks = function (customSelector = '') {
    
    /* remove contents of titleList */

    let titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    
    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('articles', articles);
    

    for (let article of articles) {

      /* get the article id */

      const articleId = article.getAttribute('id');
      console.log('articleId', articleId);

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('znaleziony tytuł', articleTitle);

      /* get the title from the title element */
      /* create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + linkHTML;

    }

    const links = document.querySelectorAll('.titles a');
    console.log('testowa', links);
  
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  /* Calculate parameters */
    
  const calculateTagsParams = function(tags) {
    console.log('tagsss',tags);
    const params = {'min':9999, 'max':0};

    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      params.min = tags[tag] < params.min ? tags[tag] : params.min;
      console.log('params',params);   
    }
    return params;     
  };

  const calculateTagClass = function(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    console.log('klass numer',classNumber);
    return optCloudClassPrefix + classNumber;
  };
  
  // 7.2 druga część dodanie tagów //

  const generateTags = function () {

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
    console.log('alltags', allTags);
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    console.log('artykuly znalezione', articles);
    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */

      const tagList = article.querySelector(optArticleTagsSelector);
      console.log('lista tagów', tagList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      console.log('tagi artykulu', articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');
      console.log('check', articleTagsArray);
      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {
        console.log('tag', tag);

        /* generate HTML of the link */
        
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        console.log('link html', linkHTML);

        // const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + ' ' + '</span></a></li>'; 
        // console.log('link html', linkHTML);

        /* add generated code to html variable */
        html = html + ' ' + linkHTML;

        console.log('kod', html);
      
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      
      tagList.innerHTML = html;

      /* END LOOP: for every article: */
    
    }
  
    /* [NEW] find list of tags in right column */

    const tagList = document.querySelector(optTagsListSelector);
    console.log('tag list',tagList);
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    
    let allTagsHTML ='';

    /* [NEW] START LOOP: for each tag in allTags: */
        
    for(let tag in allTags){
           
      /* [NEW] generate code of a link and add it to allTagsHTML */

      allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag  + '"><span>' + tag + '</span></a></li>';
      console.log('all tags html',allTagsHTML);

      /* [NEW] END LOOP: for each tag in allTags: */
    }
    
    /*[NEW] add HTML from allTagsHTML to tagList */
    
    tagList.innerHTML = allTagsHTML;
    console.log('taglist inner',tagList);      
  };
  generateTags();
  console.log( 'wygenerowane tagi', generateTags);
  
  /* 7.2 aktywnosc po kliknieciu */

  const tagClickHandler = function(event) {

    /* prevent default action for this event */
    
    event.preventDefault();
    console.log(event);
    console.log('Link was clicked!');
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
  
    const href = clickedElement.getAttribute('href');
    console.log('href', href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    
    const tag = href.replace('#tag-', '');
    console.log('tag z hrefa',tag);
  
    /* find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('tagi aktywne', activeTagLinks);

    /* START LOOP: for each active tag link */
  
    for (let activeTag of activeTagLinks) {


      /* remove class active */

      activeTag.classList.remove('active');
      
      /* END LOOP: for each active tag link */

    }
  
    /* find all tag links with "href" attribute equal to the "href" constant */
  
    const tagLinks = document.querySelectorAll(href);
    console.log('target article', tagLinks);

    /* START LOOP: for each found tag link */

    
    for(const tagLink of tagLinks) {
      console.log('link taga', tagLink);
  
      /* add class active */
      tagLink.classList.add('active');
      console.log('clickedElement:', tagLink);
    
      /* END LOOP: for each found tag link */
    
    }
    
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    
  };

  const addClickListenersToTags = function() {
    /* find all links to tags */
      
    const tags = document.querySelectorAll('a[href^="#tag-"]');
  
    /* START LOOP: for each link */

    for (let link of tags) {
      console.log('TAg!!!!',link);
      
      /* add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  };
  addClickListenersToTags();
  
  //   /* 7.2 dodanie generate authors */
  //generate AUTHORS poczatek genereowania chmury linkow

  const calculateAuthorsParams = function(authors) {
    console.log('tagsss',authors);
    const params = {'min':9999, 'max':0};
    
    for(let authorTag in authors){
      console.log(authorTag + ' is used ' + authors[authorTag] + ' times');
      params.max = authors[authorTag] > params.max ? authors[authorTag] : params.max;
      params.min = authors[authorTag] < params.min ? authors[authorTag] : params.min;
      console.log('params',params);
    }
    return params;     
  };

  const calculateAuthorsClass = function(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    console.log('klass author numer',classNumber);
    return optCloudClassPrefix + classNumber;
  };
  
  const generateAuthors = function () {

    /* [NEW] create a new variable allTags with an empty array */
    let allAuthors = {};    
    console.log('allauthors',allAuthors);

    
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    console.log('artykuly znalezione', articles);
    
    /* START LOOP: for every article: */
    
    for (let article of articles) {

      /* find tags wrapper */

      const authorList = article.querySelector(optAuthorListSelector);
      console.log('lista tagów', authorList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */

      const authorTag = article.getAttribute('data-authors');
      console.log('tagi autora', authorTag);

      /* generate HTML of the link */
      
      const linkHTMLData = {id: authorTag, title: authorTag};
      const linkHTML = templates.authorLink(linkHTMLData);

      // const linkHTML = '<p><a  href="#author-' + authorTag + '"><span>' + authorTag + '</span></a></p>'; 
      // console.log('link html autora', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      
      console.log('', html);
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors[authorTag]) {
        /* [NEW] add tag to allTags object */
        allAuthors[authorTag] = 1;
      } else {
        allAuthors[authorTag]++;
      }

      /* insert HTML of all the links into the tags wrapper */
      
      authorList.innerHTML = html;

      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const authorList = document.querySelector('.authors');
    // authorList = tagList; .tags = .authors; tag = author;

    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('AuthorsParams:', authorsParams);

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
        
    for(let authorTag in allAuthors){
           
      /* [NEW] generate code of a link and add it to allTagsHTML */
    
      allAuthorsHTML += '<li><a class="' + calculateAuthorsClass(allAuthors[authorTag], authorsParams) + '" href="#author-' + authorTag  + '"><span>' + authorTag + '</span></a></li>';
      console.log('all authors tags html',allAuthorsHTML);
    
      /* [NEW] END LOOP: for each tag in allTags: */
    }
        
    /*[NEW] add HTML from allTagsHTML to tagList */
    authorList.innerHTML = allAuthorsHTML;
    console.log('authorlist inner',authorList);   

  };

  generateAuthors();
  console.log( 'wygenerowany autor', generateAuthors);

  const authorClickHandler = function(event) {
    /* prevent default action for this event */
    
    event.preventDefault();
    console.log(event);
    console.log('Link was clicked!');
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
  
    const href = clickedElement.getAttribute('href');
    console.log('href', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    
    const author = href.replace('#author-', '');
    console.log('author z hrefa',author);
  
    /* find all tag links with class active */

    const authorTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('tagi aktywne', authorTagLinks);

    /* START LOOP: for each active tag link */
  
    for (let authorTag of authorTagLinks) {
      console.log('tag autora', authorTag);

      /* remove class active */

      authorTag.classList.remove('active');
      
      /* END LOOP: for each active tag link */

    }
  
    /* find all tag links with "href" attribute equal to the "href" constant */
  
    const authorLinks = document.querySelectorAll(href);
    console.log('target article', authorLinks);

    /* START LOOP: for each found tag link */

    for(const authorLink of authorLinks) {
      console.log('link autora', authorLink);
  
      /* add class active */
      authorLink.classList.add('active');
      console.log('clickedElement:', authorLink);
    
      /* END LOOP: for each found tag link */
    
    }
    
    /* execute function "generateTitleLinks" with article selector as argument */
    
    generateTitleLinks('[data-authors="' + author + '"]');
    
  };
  
  const addClickListenersToAuthors = function() {
    /* find all links to author */
      
    const author = document.querySelectorAll('a[href^="#author-"]');
  
    /* START LOOP: for each link */
    for (let authorLink of author) {
      console.log('authorRRR',authorLink);
      
      /* add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();

}