const server = require('./src/app.js');
const { conn } = require("./src/db.js");

// conn.sync({ force: false }).then(() => {
//   server.listen(3001, () => {
//     console.log('%s listening at 3001')
//   });
// });

const PORT = process.env.PORT

server.listen(PORT, async()=>{
    await conn.sync({ force: false })
    console.log(`is listening at ${PORT}`)
    console.log("**************************    GymSpace    ***********************")
})

