const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

//app.use('/', express.static('public'));
app.use(cors());

/*const budget = {
    myBudget: [
    {
        title: 'Eat out',
        budget: 25
    },
    {
        title: 'Rent',
        budget: 375
    },
    {
        title: 'Grocery',
        budget: 110
    },
]
};*/



app.get('/hello', (req,res) => {
    res.send('Hello World!');
});

//Now getting data from modifiedBudget array present in w4budget.json file
const modifiedData = require('./w4budget.json');
app.get('/budget', (req,res) => {
    res.json(modifiedData);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});