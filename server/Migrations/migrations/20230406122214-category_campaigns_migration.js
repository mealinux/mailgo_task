module.exports = {
  async up(db, client) {
    await db.collection('category_campaigns').updateMany(
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
    await db.collection('category_campaigns').updateMany(
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
