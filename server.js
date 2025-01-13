const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require("cookie-parser");

const assassinRoute = require("./routes/assassinRoute");
const weaponRoute = require("./routes/weaponRoute");
const organizationRoute = require("./routes/organizationRoute");
const skillRoute = require("./routes/skillRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require('./routes/userRoute');
const authMiddleware = require("./controllers/authMiddleware");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/photo");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });


app.use("/organizations", authMiddleware.checkAuth, authMiddleware.checkRole(["admin"]), organizationRoute);
app.use("/assassins", authMiddleware.checkAuth, authMiddleware.checkRole(["admin", "user"]), assassinRoute);
app.use("/users", authMiddleware.checkAuth, authMiddleware.checkRole(["admin"]), userRoute);
app.use("/weapons", authMiddleware.checkAuth, authMiddleware.checkRole(["weaponsmith"]), weaponRoute);
app.use("/skills", authMiddleware.checkAuth, authMiddleware.checkRole(["witch"]), skillRoute);




app.use("/", authRoute);


app.get("/main", authMiddleware.checkAuth, (req, res) => {
    res.render("main", { user: req.user });
});


app.get("/", (req, res) => {
    res.redirect("/login");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
