module.exports = {
  async up(db, client) {
    await db.collection('subscribe_states').updateMany(
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
    await db.collection('subscribe_states').updateMany(
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
