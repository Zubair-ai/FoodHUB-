
const express = require('express')
const app = express()
const connectToDatabase= require('./db');
connectToDatabase();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
       "Access-Control-Allow-Headers" ,
       "Origin,X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api',require("./routes/CreateUsers"))
app.use('/api',require("./routes/LoginUsers"))
app.use('/api',require("./routes/DisplayData"))
app.use('/api',require("./routes/OrderData"))
app.use('/api',require("./routes/MyOrderData"))


if (process.env.NODE_ENV==="production"){
  const path=require("path");
  app.get('/',(req,res)=>{
    app.use(express.static(path.join(__dirname,"./build")));
    res.sendFile(path.join(__dirname,"./build/index.html"));
  })
}

const port=process.env.port || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})