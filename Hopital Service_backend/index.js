import express from 'express';
import routes from './src/routes';
import bodyParser from 'body-parser';


const app = express();
const PORT = 4000;


//bodyparser setup
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//cross-origin error
app.use((req, res,next) =>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Access-Control-Allow-Headers"," Content-Type")
	next()
})
routes(app);

app.get("/", (req, res) =>
	res.send("Node Server is working on port "+PORT)
);

app.listen(PORT, () => console.log("this is port no "+PORT));