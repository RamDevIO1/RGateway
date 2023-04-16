const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/modeles/')
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  //useFindAndModify: true
}).then(() => {
  console.log(`Connected To RGateway Database`)
}).catch((err) => {
  console.log(`Cannot Connect To RGateway Database`, err)
  process.exit()
})

app.get('/', async (req, res) => {
  res.json({
    message: "RGateway service"
  })
});

require(`./app/routes/post.routes`)(app)

app.listen(process.env.PORT || 4580, () => {
  console.log(`RGateway service is Running`); 
});