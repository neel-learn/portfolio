const express = require("express");
const sgMail = require("@sendgrid/mail");
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.set('trust proxy', true);
const allowedOrigins = [
  "https://neel-learn.github.io",
  "https://neelratanpatel.in",      // New Custom Domain
  "http://neelratanpatel.in",       // For non-SSL testing
  "https://www.neelratanpatel.in",  // With WWW
  "http://www.neelratanpatel.in",   // With WWW
  "http://localhost:5173"           // Local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS policy violation for origin: " + origin), false);
    }
    return callback(null, true);
  }
}));

const dbURI = process.env.MONGODB_URI;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

mongoose
  .connect(dbURI)
  .then(() => console.log("connected to Mongodb"))
  .catch((err) => console.log("could not connect ", err));

const ProjectSchema = new mongoose.Schema({
  navBarList: Array,
  qualificationList: Array,
  languageList: Array,
  frontendList: Array,
  backendList: Array,
  databaseList: Array,
  devOpsList: Array,
  cyberSecurityList: Array,
  toolsList: Array,
  projectList: Array,
  socialLinks: Array,
  likes: { type: Number, default: 999 },
  userInteractions: [
    {
      ip: String,
      liked: { type: Boolean, default: false },
      timestamp: { type: String }
    },
  ],
});

const MessageSchema = new mongoose.Schema({
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Portfolio = mongoose.model("Portfolio", ProjectSchema);
const Message = mongoose.model("Message", MessageSchema);



app.post("/api/seed-data", async (req, res) => {
  try {
    const fullPortfolioData = {
      navBarList: [
        { href: "#home", className: "fa-solid fa-house", id: "instagram" },
        { href: "#about", className: "fa-solid fa-address-card", id: "github" },
        {
          href: "#qualifications",
          className: "fa-solid fa-graduation-cap",
          id: "whatsapp",
        },
        {
          href: "#skills",
          className: "fa-solid fa-screwdriver-wrench",
          id: "linkedin",
        },
        {
          href: "#projects",
          className: "fa-solid fa-diagram-project",
          id: "github",
        },
        { href: "#contact", className: "fa-solid fa-phone", id: "whatsapp" },
      ],

      qualificationList: [
        {
          title: "10",
          session: "2018 - 2019",
          persentage: "71.4",
          collageName: "Shri Baldeo Inter Collage",
        },
        {
          title: "12",
          session: "2020 - 2021",
          persentage: "74.2",
          collageName: "Shri Baldeo Inter Collage",
        },
        {
          title: "BCA",
          session: "2021 - 2024",
          persentage: "67.5",
          collageName: "Rajarshi School of Management & Technology",
        },
        {
          title: "MCA",
          session: "2024 - 2026",
          persentage: "Appearing",
          collageName: "Microtech Collage of Management & Technology",
        },
      ],

      languageList: [
        { language: "C" },
        { language: "C++" },
        { language: "JAVA" },
        { language: "JAVASCRIPT" },
        { language: "SQL" },
        { language: "Shell Scripting" },
        { language: "Android (Java)" },
      ],
      frontendList: [
        { frontEnd: "HTML" },
        { frontEnd: "CSS" },
        { frontEnd: "Bootstrap" },
      ],

      backendList: [
        { backend: "Node.js" },
        { backend: "Express.js" },
        { backend: "Spring Core" },
        { backend: "Spring ORM" },
        { backend: "JDBC" },
      ],
      databaseList: [{ database: "MongoDB" }, { database: "MySQL" }],

      devOpsList: [
        { devOps: "AWS" },
        { devOps: "Docker" },
        { devOps: "Kubernetes" },
        { devOps: "Terraform" },
        { devOps: "Ansible" },
        { devOps: "Git & GitHub" },
        { devOps: "Jenkins (CI/CD Pipelines)" },
      ],

      cyberSecurityList: [
        { cyberSecurity: "Nmap" },
        { cyberSecurity: "Burp Suite" },
        { cyberSecurity: "SQL Injection" },
      ],
      toolsList: [
        { ides: "VS Code" },
        { ides: "IntelliJ IDEA" },
        { ides: "Eclipse" },
        { ides: "Android Studio" },
        { ides: "VI" },
      ],

      projectList: [
        {
          title: "Online Event Management",
          description:
            "I designed and coded this fully functional event management tool from scratch to demonstrate my skills in core web technologies.",
          role: "Full-Stack Developer (HTML, CSS, JavaScript, Email Integration Logic)",
          link: "https://github.com/neelratanpatel/emanag/tree/main/online%20event%20management",
        },
        {
          title: "Library Management System",
          description:
            "I developed the logic for dynamic array manipulation, including functions to search for available space when adding a new book, and shifting elements when a book is removed.",
          role: "Solo Software Engineer responsible for the entire system's design and implementation.",
          link: "https://github.com/neelratanpatel/java-project-part-1/blob/main/CWN_C51_EXERCISE_4_ONLINE_LIBRARY.java",
        },
        {
          title: "Rock Paper Scissors",
          description:
            "This project is a digital implementation of the classic two-player hand game. It serves as a foundational project to demonstrate core programming competencies.",
          role: "Solo Software Engineer responsible for the entire system's design and implementation.",
          link: "https://github.com/neelratanpatel/java-project-part-1/blob/main/CWN_C20_EXERCISE_2_ROCK_PAPER_SCISSOR_GAME.java",
        },
        {
          title: "Guess the Number",
          description:
            "An interactive console-based game using Java and JDBC for SQL database persistent statistics. Features full CRUD data management.",
          role: "Solo Software Engineer responsible for the entire system's design and implementation.",
          link: "https://github.com/neelratanpatel/java-project-part-1/blob/main/Main.java",
        },
        {
          title: "Music Application",
          description:
            "A fully functional music playback engine scanning local device libraries. Includes controls for Play, Pause, Next, and Repeat.",
          role: "Solo Android Developer responsible for the entire system's design and implementation.",
          link: "https://github.com/neelratanpatel/java-project-part-1/blob/main/Main.java",
        },
      ],

      socialLinks: [
        {
          href: "https://wa.me/6393788862",
          icon: "fa-brands fa-whatsapp",
          id: "whatsapp",
        },
        {
          href: "https://www.instagram.com/neelratan.patel",
          icon: "fa-brands fa-instagram",
          id: "instagram",
        },
        {
          href: "https://www.linkedin.com/in/neel-ratan-patel",
          icon: "fa-brands fa-linkedin",
          id: "linkedin",
        },
        {
          href: "https://github.com/neelratanpatel",
          icon: "fa-brands fa-github",
          id: "github",
        },
        { href: "tel:6393788862", icon: "fa-solid fa-phone", id: "phone" },
      ],
    };

    await Portfolio.deleteMany({});
    const newPortfolio = new Portfolio(fullPortfolioData);
    await newPortfolio.save();

    res.status(201).json({
      message: "database seede successfully!",
      data: newPortfolio,
    });
  } catch (err) {
    res.status(500).send("Error seeding data: " + err.message);
  }
});

app.post("/api/contact", async (req, res) => {
  const {email, subject, message } = req.body;
  try {
    const newMessage = new Message({ email, subject, message});
    await newMessage.save();

    const msg = {
      to: process.env.EMAIL_TO, // Your receiving email (the one you want to read messages at)
      from: process.env.EMAIL_USER, // MUST be the exact email you verified in SendGrid
      replyTo: email, // This allows you to reply directly to the person who filled the form
      subject: `New Message from Portfolio: ${subject}`,
      text: `From: ${email}\n\nMessage:\n${message}`,
      html: `<strong>From:</strong> ${email}<br><br><strong>Message:</strong><p>${message}</p>`,
    };

    await sgMail.send(msg);

    res.status(201).json({ success: true, message: "Message saved!" });
  } catch (err) {
    console.log("detailed mail error: ", err)
    res.status(500).json({ error: "server error " +  err.message });
  }
});

// app.use(express.json());
// app.use(cors());


//like button

app.patch("/api/portfolio/like", async (req, res) => {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const getFormattedDate = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB');
    const time = now.toLocaleTimeString('en-GB', { hour12: false});
    return `${date} : ${time}`;
  }

  if (ip && ip.includes(',')){
    ip = ip.split(',')[0].trim();
  }

  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio)
      return res.status(404).json({ error: "No portfolio found" });

    const userIndex = portfolio.userInteractions.findIndex((u) => u.ip === ip);

    let isNowLiked;
    const currentTime = getFormattedDate();

    if (userIndex !== -1) {
      isNowLiked = !portfolio.userInteractions[userIndex].liked;
      portfolio.userInteractions[userIndex].liked = isNowLiked;
      portfolio.userInteractions[userIndex].timestamp = currentTime;
      portfolio.likes += isNowLiked ? 1 : -1;
    } else {
      isNowLiked = true;
      portfolio.userInteractions.push({ ip: ip, liked: isNowLiked , timestamp: currentTime });
      portfolio.likes += 1;
    }

    await portfolio.save();

    res.json({
      likes: portfolio.likes,
      liked: isNowLiked,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/portfolio", async (req, res) => {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  
  if (ip && ip.includes(',')){
    ip = ip.split(',')[0].trim();
  }

  try {
    const data = await Portfolio.findOne();
    if (!data) {
      return res
        .status(404)
        .json({
          message: "No portfolio data found. Please seed the database.",
        });
    }

    const userStatus = data.userInteractions.find((u) => u.ip === ip);
    res.json({
      ...data._doc,
      currentUserLiked: userStatus ? userStatus.liked : false,
      likes: data.likes
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
