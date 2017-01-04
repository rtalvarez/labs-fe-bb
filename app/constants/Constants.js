var Constants = {
  MOCK_DATA_URL: '/mock/feed_collection_mock.json',
  BOOK_PLACEHOLDER_IMG_URL: '/images/image_book_placeholder_100x150px.jpeg',
  ARTICLE_PLACEHOLDER_IMG_URL: '/images/image_article_placeholder_160x260px.jpeg',
  DEFAULT_RESOURCE_URL: 'https://developer.mozilla.org/en-US/',
  events: {
    SUBMITTED_BOOK_FORM: 'submitted:addBookForm',
    RATED_BOOK: 'rated:book',
    TOGGLED_DIALOG: 'toggled:dialog'
  },
  icons: {
    close: 'templates/icons/ic_close_24px.svg',
    star: 'templates/icons/ic_star_24px.svg',
    menu: 'templates/icons/ic_menu_24px.svg'
  },
  feedItemTemplates: {
    book: 'templates/feed/feed_book_view',
    article: 'templates/feed/feed_article_view'
  }
};

module.exports = Constants;