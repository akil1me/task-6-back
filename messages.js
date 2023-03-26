const pool = require("./pool.js");
const events = require("events");
const emitter = new events.EventEmitter();

class Messages {
  onPost(req, res) {
    const { sender, recipient, title, body } = req.body;
    pool.query(
      "INSERT INTO messages (sender, recipient, title, postAt, body) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [sender, recipient, title, new Date(), body],
      (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          // emitter.emit("newMessage", result.rows[0]);
          res.json(result.rows[0]);
        }
      }
    );
  }
  onGet(req, res) {
    const recipient = req.query.recipient;
    pool.query(
      "SELECT * FROM messages WHERE recipient = $1",
      [recipient.trim()],
      (error, results) => {
        if (error) {
          res.status(500).json(error);
        } else {
          const messages = results.rows;
          // res.json([...messages]);
          res.json(messages);
          // emitter.on("newMessage", (message) => {
          //   res.json([...messages, message]);
          // });
        }
      }
    );
  }
}

module.exports = new Messages();
