//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./Models')

const citoyenRoutes = require('./Routes/citoyenRoutes');
const agentMunicipaliteRoutes = require('./Routes/agentmunicipaliteRoutes')
const plageRoutes = require('./Routes/plageRoutes')
const locataireRoutes = require('./Routes/locataireRoutes')
const appelRoutes = require('./Routes/appel_offresRoutes')
const plagePubliqueRoutes = require('./Routes/plagePubliqueRoutes')
//setting up your port
const PORT = process.env.PORT || 3000
//assigning the variable app to express
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})

// routes for the citoyen API
app.use('/citoyen', citoyenRoutes);

//routes for the agentmunicipale API
app.use('/agent', agentMunicipaliteRoutes);
//routes for the plage API
app.use('/plage', plageRoutes);
app.use('/plage_publique', plagePubliqueRoutes);
app.use('/locataire', locataireRoutes)
app.use('/appel_offre', appelRoutes)
//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))

