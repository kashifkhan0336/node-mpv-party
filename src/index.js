const http = require("http");
const app = require("express")();
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const port = 8080 || process.env.PORT;

io.on("connect", (c) => {
  console.info("SOME ONE IS HERE", c.id);
  c.on("video_pause", (seek_data) => {
    c.broadcast.emit("video_pause_from_server", seek_data);
    console.log("pause_event with ", seek_data);
  });
  c.on("video_play", (seek_data) => {
    c.broadcast.emit("video_play_from_server", seek_data);
    console.log("play_event with ", seek_data);
  });
  c.on("video_seeked", (seek_data) => {
    c.broadcast.emit("video_seeked_from_server", seek_data);
    console.log("seeked_event with ", seek_data);
  });
});

const listenCb = () =>
  console.table([
    ["status", "port"],
    ["started", port]
  ]);

httpServer.listen(port, listenCb);
