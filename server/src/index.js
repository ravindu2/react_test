const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/getAllCurrencies",async (req, res) => {
    const nameURL ="https://openexchangerates.org/api/currencies.json?app_id=debfeb6ebc014c7f96ffcafd319479b1";

    
    try{
        const namesResponce = await axios.get(nameURL);
        const nameData = namesResponce.data;

        return res.json(nameData);

    }catch(err){
        console.error(err);
    }
});

app.get("./convert", async (req, res) => {
    const {date, sourceCurrency, targetCurrency, amountInSourceCurrency} = req.query;

    try{

        const dataUrl =`https://openexchangerates.org/api/historical/${date}.json?app_id=debfeb6ebc014c7f96ffcafd319479b1`;

        const dataResponce = await axios.get(dataUrl);
        const rates = dataResponce.data.rates;

        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        const targetAmount = (targetRate/sourceRate) * amountInSourceCurrency;

        return res.json(targetAmount);

    } 
    
    catch(err) {
        console.error(err);
    }
});
app.listen(5000,()=>{
    console.log("server started");
});