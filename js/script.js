'use strict';
// handler funkcja wykonaywana w rekacji na event
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    // eslint-disable-next-line indent
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* [DONE]remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* {DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  /* [DONE]find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* [DONE]add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const generateTitleLinks = function () {
  /* [DONE]remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* [DONE]for each the articles and save them to variable */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for (let article of articles) {
    /* [DONE]get the article id */
    /* [DONE]find the title element */
    const articleId = article.getAttribute('id');
    /* [DONE]get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* [DONE]create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    titleList.innerHTML = titleList.innerHTML + linkHTML;
    /* [DONE]insert link into variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};
generateTitleLinks();

const calculateTagsParams = function (tags) {
  const params = {
    min: 999999,
    max: 0
  };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    // console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
};

const calculateTagClass = function (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
};

// Tak czy inaczej, ten problem już jest za nami. Wystarczy dodać linię, która zwróci z funkcji stałą optCloudClassPrefix i dołączoną do niej stałą classNumber.

const generateTags = function () {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  // console.log(allTags);
  /* [DONE]find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE]START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE]find tags wrapper */
    const tagsWraper = article.querySelector(optArticleTagsSelector);
    /* [DONE]make html variable with empty string */
    let html = '';
    /* [DONE]get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* [DONE]split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE]START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* [DONE]generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* [DONE]add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      // [DONE]/* END LOOP: for each tag */
    }
    /* [DONE]insert HTML of all the links into the tags wrapper */
    tagsWraper.innerHTML = html;
    /* [DONE]END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  // console.log(tagList);

  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    // allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    // allTagsHTML += '<li><a href="#tag-' + tag + '"> ' + tag + ' (' + allTags[tag] + ') </a></li>';


    // const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    // console.log('tagLinkHTML:', tagLinkHTML);
    const tagLinkHTML = '<li><a href="#tag-' + tag +  + tag + '</a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  // const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';


};

generateTags();

const tagClickHandler = function (event) {
  // console.log('link was cliked');
  /* [DONE]prevent default action for this event */
  event.preventDefault();
  /* [DONE]make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE]make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log(href);
  /* [DONE]make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* [DONE]find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [DONE]START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* [DONE]remove class active */
    activeTagLink.classList.remove('active');
    /* [DONE]END LOOP: for each active tag link */
  }
  /* [DONE]find all tag links with "href" attribute equal to the "href" constant */
  const tagHrefLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE]START LOOP: for each found tag link */
  for (let tagHrefLink of tagHrefLinks) {
    /*[DONE] add class active */
    tagHrefLink.classList.add('active');
    /* [DONE]END LOOP: for each found tag link */
  }
  /* [DONE]execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};


const addClickListenersToTags = function () {
  /* [DONE]ind all links to tags */
  const links = document.querySelectorAll('.post-tags a');
  /* [DONE]START LOOP: for each link */
  for (let link of links) {
    /* [DONE]add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* [DONE]END LOOP: for each link */
  }
};
addClickListenersToTags();


// generate Authors
/* [NEW] create a new variable allTags with an empty array */
let allAuthors = {};
const generateAuthors = function () {
  /* [DONE]find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE]START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE]find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* [DONE]make html variable with empty string */
    let html = 'by ';
    /* [DONE]get Authors from author-tags attribute */
    const tagAuthor = article.getAttribute('data-author');
    /* [DONE]generate HTML of the link */
    const linkHTML = '<a href="#author-' + tagAuthor + '">' + tagAuthor + '</a>';
    /* [DONE]add generated code to html variable */
    html = html + linkHTML;
    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors[tagAuthor]) {
      /* [NEW] add tag to allTags object */
      allAuthors[tagAuthor] = 1;
    } else {
      allAuthors[tagAuthor]++;
    }
    /* [DONE]insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html;
    /* [DONE]END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optAuthorsListSelector);
  // console.log(tagList);
  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allAuthors.join(' ');
  // console.log(allAuthors);



  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tagAuthor in allAuthors) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allAuthorsHTML += '<a href="#author-' + tagAuthor + '"> ' + tagAuthor + ' (' + allAuthors[tagAuthor] + ') </a > ';
    // allAuthorsHTML += '<a href="#author -' + tagAuthor + '">' + tagAuthor + '</a>';


  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allAuthorsHTML;






};
generateAuthors();

const authorClickHandler = function (event) {
  /* [DONE]prevent default action for this event */
  event.preventDefault();
  /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE]make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE]make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /* [DONE]find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [DONE]START LOOP: for each active tag link */
  for (let activeAuthorLink of activeAuthorLinks) {
    /* [DONE]remove class active */
    activeAuthorLink.classList.remove('active');
    /* [DONE]END LOOP: for each active tag link */
  }
  /* [DONE]find all tag links with "href" attribute equal to the "href" constant */
  const authorHrefLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE]START LOOP: for each found tag link */
  for (let authorHrefLink of authorHrefLinks) {
    /* [DONE]add class active */
    authorHrefLink.classList.add('active');
    /* [DONE]END LOOP: for each found tag link */
  }
  /* [DONE]execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
};

const addClickListenersToAuthors = function () {
  //  [DONE]find all links to tags */
  const authorLinks = document.querySelectorAll('.post-author a');
  /* [DONE]START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* [DONE]add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* [DONE]END LOOP: for each link */
  }
};
addClickListenersToAuthors();
