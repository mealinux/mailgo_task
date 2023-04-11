module.exports = {
  async up(db, client) {
    await db.collection('mail_send_info_actions').createIndexes([
      {
        key: {
          subscriber_id: "text",
          subject: "text",
          content: "text"
        },
      }
    ]);

    await db.collection('mail_send_info_actions').updateMany(
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
    await db.collection('mail_send_info_actions').dropIndexes([
      {
        key: {
          subscriber_id: "text",
          subject: "text",
          content: "text"
        },
      }
    ]);
    
    await db.collection('mail_send_info_actions').updateMany(
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
