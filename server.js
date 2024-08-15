const express = require('express');
const connection = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended : true}));



connection.sync({ force : false}).then(() => {
    app.listen(PORT , () => {
        console.log(`were listening on port ${PORT}`);
    })
})

