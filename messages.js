const pool = require("./pool.js");

class Messages {
  onSocket(socket) {
    socket.on("post", ({ sender, recipient, title, body }) => {
      pool.query(
        "INSERT INTO messages (sender, recipient, title, postAt, body) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [sender, recipient, title, new Date(), body],
        (err, result) => {
          if (err) {
            socket.emit("error", err);
          } else {
            if (sender === recipient) {
              socket.emit("receive_post", result.rows[0]);
            } else {
              socket.broadcast.emit("receive_post", result.rows[0]);
            }
          }
        }
      );
    });

    socket.on("userget", (recipient) => {
      pool.query(
        "SELECT * FROM messages WHERE recipient = $1",
        [recipient.trim()],
        (error, results) => {
          if (error) {
            socket.emit("error", error);
          } else {
            const users = results.rows;
            socket.emit("receive_userget", users);
          }
        }
      );
    });
  }
}

module.exports = new Messages();
