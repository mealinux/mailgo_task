module.exports = {
  async up(db, client) {
    await db.collection('campaigns').createIndexes([
      {
        key: {
          name: "text",
          description: "text",
          target: "text"
        },
      }
    ]);

    await db.collection('campaigns').updateMany(
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
    await db.collection('campaigns').dropIndexes([
      {
        key: {
          name: "text",
          description: "text",
          target: "text"
        },
      }
    ]);
    
    await db.collection('campaigns').updateMany(
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
