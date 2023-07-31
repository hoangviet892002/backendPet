const express = require('express');
const db = require('./database');
const swaggerDocs = require('./utils/swagger');
const cors = require('cors');

const route = require('./routes');

const app = express();

app.use(express.json());
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));

route(app);

swaggerDocs(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server đang lắng nghe trên cổng ${port}`);
});