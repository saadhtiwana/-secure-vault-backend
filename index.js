import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import fs from "fs";
import { format } from "date-fns";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Log file setup
const logFilePath = __dirname + "/logs/server.log";
const writeLog = (message) => {
  const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
};

var userIsAuthorised = false;
var userDatabase = {
  "admin": { password: "SaadisTopG;", role: "admin" },
  "user": { password: "password123", role: "user" }
};

// Session setup
app.use(session({
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Body parser setup
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for password check
function passwordCheck(req, res, next) {
  const username = req.body["username"];
  const password = req.body["password"];
  
  if (userDatabase[username] && userDatabase[username].password === password) {
    userIsAuthorised = true;
    req.session.userIsAuthorized = true;
    req.session.userRole = userDatabase[username].role;
    writeLog(`${username} logged in successfully.`);
  } else {
    req.session.userIsAuthorized = false;
    writeLog(`Failed login attempt for username: ${username}`);
  }
  next();
}

app.use(passwordCheck);

// Routes setup
app.get("/", (req, res) => {
  if (req.session.userIsAuthorized) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.post("/check", (req, res) => {
  if (userIsAuthorised || req.session.userIsAuthorized) {
    writeLog("User successfully logged in.");
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    writeLog("Login attempt failed.");
    res.sendFile(__dirname + "/public/index.html");
  }
});

// User logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Failed to logout.");
    } else {
      writeLog("User logged out.");
      res.sendFile(__dirname + "/public/index.html");
    }
  });
});

// Admin route to view server logs
app.get("/admin/logs", (req, res) => {
  if (req.session.userIsAuthorized && req.session.userRole === "admin") {
    fs.readFile(logFilePath, "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Error reading log file.");
      } else {
        res.send(`<pre>${data}</pre>`);
      }
    });
  } else {
    res.status(403).send("Forbidden: You are not authorized to view the logs.");
  }
});

// API for user information
app.get("/api/userinfo", (req, res) => {
  if (req.session.userIsAuthorized) {
    const userInfo = {
      username: req.session.userIsAuthorized ? req.body["username"] : null,
      role: req.session.userRole || null,
      status: "Authorized"
    };
    res.json(userInfo);
  } else {
    res.json({ status: "Not Authorized" });
  }
});

// Simulating a simple user database interaction
app.get("/api/users", (req, res) => {
  if (req.session.userIsAuthorized && req.session.userRole === "admin") {
    res.json(userDatabase);
  } else {
    res.status(403).send("Forbidden: You do not have admin privileges.");
  }
});

// File upload route (simulating file upload functionality)
import multer from "multer";
const upload = multer({ dest: 'uploads/' });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    writeLog(`File uploaded: ${file.originalname}`);
    res.send(`File uploaded successfully: ${file.originalname}`);
  } else {
    res.status(400).send("No file uploaded.");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  writeLog(`Error: ${err.message}`);
  res.status(500).send("Something went wrong.");
});

// Server start log
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  writeLog("Server started successfully.");
});
