const server = require("./app");

const port = process.env.PORT || 8002;
const host = process.env.HOST || "localhost";

server.listen(port, host, () => {
  console.log(`server started http://${host}:${port}`);
});
