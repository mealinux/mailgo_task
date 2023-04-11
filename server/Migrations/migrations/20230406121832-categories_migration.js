module.exports = {
  async up(db, client) {
    await db.collection('categories').createIndexes([
      {
        key: {
          name: "text",
          description: "text",
        },
      }
    ]);

    await db.collection('categories').updateMany(
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
    await db.collection('categories').dropIndexes([
      {
        key: {
          name: "text",
          description: "text",
        },
      }
    ]);
    
    await db.collection('categories').updateMany(
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
