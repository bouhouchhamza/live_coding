import app from './src/app.js';

import dotenv from 'dotenv';
dotenv.config();
import connectDb  from './src/config/db.js';

const PORT = process.env.PORT || 3000;


await connectDb();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
