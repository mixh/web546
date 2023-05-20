//Here you will import route files and export them as used in previous labs

import venueRoutes from './venues.js';

const constructorMethods = (app) =>{
    app.use('/', venueRoutes);
    app.use('*', (req,res)=>{
        res.redirect('/');
    })
}

export default constructorMethods;