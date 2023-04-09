module.exports = {
  async up(db, client) {
    await db.collection('subscribers').createIndexes([
      {
        key: {
          name: "text",
          last_name: "text",
          email: "text"
        },
      }
    ]);

    await db.collection('subscribers').updateMany(
      {},
      {
        $set: {
          createdAt?: new Date(),
          updatedAt: new Date(),
        },
      }
    );
  },

  async down(db) {
    await db.collection('subscribers').dropIndexes([
      {
        key: {
          name: "text",
          last_name: "text",
          email: "text"
        },
      }
    ]);
    
    await db.collection('subscribers').updateMany(
      {},
      {
        $unset: {
          createdAt?: '',
          updatedAt: '',
        },
      }
    );
  },
};
