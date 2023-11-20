const express= require('express');
const morgan= require('morgan');
const connectDB=require('./config/db')
const userRoutes= require('./routes/userRoute')
require('dotenv').config();
require('colors');

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({ extended:false}));

app.use('/api/users',userRoutes);

app.get('*', function(req, res) {
    // console.log(req.body);
    console.log(`Endpoint doesn't exist`);
    res.status(404).send('Endpoint does not exist');
})

const PORT=process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(`server connected to ${process.env.NODE_ENV} mode on port ${PORT}`.red)
)