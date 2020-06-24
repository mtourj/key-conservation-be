const db = require('../dbConfig');

const CampaignPosts = require('./campaignPostsModel');

function findUserBookmarks(id) {
  return db('bookmarks')
    .where({ user_id: id })
    .then((bookmarks) => {
      const ids = bookmarks.map((bm) => bm.campaign_id);
      return CampaignPosts.getPostsWhere({
        'campaign_posts.is_update': false,
      }).whereIn('campaigns.id', ids);
    });
}

function insertBookmark(bookmark) {
  return db('bookmarks').insert(bookmark);
}

function removeBookmark(campaignId, userId) {
  return db('bookmarks')
    .where({ campaign_id: campaignId, user_id: userId })
    .del();
}

module.exports = {
  findUserBookmarks,
  insertBookmark,
  removeBookmark,
};
