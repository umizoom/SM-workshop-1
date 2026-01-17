import http from "http";

async function startServer() {
  const port = process.env.PORT || 4000;
  const host = "0.0.0.0";

  // Create a simple HTTP server
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!\n");
  });

  // Start listening
  server.listen(port, host, () => {
    console.log(`🚀 Server ready at http://${host}:${port}`);
  });
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n👋 Shutting down server...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n👋 Shutting down server...");
  process.exit(0);
});

// Start the server
startServer().catch((error) => {
  console.error("❌ Error starting server:", error);
  process.exit(1);
});
