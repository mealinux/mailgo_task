module.exports = {
  async up(db, client) {
    await db.collection('campaign_click_actions').updateMany(
      {},
      {
        $set: {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );
  },

  async down(db) {
    await db.collection('campaign_click_actions').updateMany(
      {},
      {
        $unset: {
          createdAt: '',
          updatedAt: '',
        },
      }
    );
  },
};
