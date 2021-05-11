const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolver.js')
const mongoose = require('mongoose')

async function startServer(){
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start()
    apolloServer.applyMiddleware({app: app});
    //apolloServer.applyMiddleware({app: app, path:'/swesh'});

    app.use((req,res)=>{
        res.send('Hello from express apollo server')
    })

    await mongoose.connect('mongodb://localhost:27017/post_db',{
        useUnifiedTopology:true,
        useNewUrlParser:true,
    })
    console.log('Mongoose connected..')

    app.listen(4000,()=> console.log('server is running in port 4000'))
}

startServer();


