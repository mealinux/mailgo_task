module.exports = {
  async up(db, client) {
    await db.collection('subscribes').updateMany(
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
    await db.collection('subscribes').updateMany(
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
