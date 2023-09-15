const express = require("express") ;
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const connectDb = require("./config/db");
const PORT = process.env.PORT || 8000;
connectDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v.1", require("./routes/apiRoutes"));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
