//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');
// const Diet = require('./src/models/Diet.js'); si no funciona el de arriba utilizar este

// const dietPreCharged = require('./routes/dietPreCharge');

// function dietPreCharge() {
//   const diets = ["gluten free", "paleolithic", "vegetarian", "lacto ovo vegetarian", "vegan", "pescatarian", "primal", "whole 30", "fodmap friendly", "dairyFree"]
//   diets?.forEach(async (el) => await Diet.create({name: el}))
// };

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  // await dietPreCharge();
  // dietPreCharged() este es parte del require routes/dietPreCharge
  server.listen(3001, () => {
     const diets = ["gluten free","paleolithic", "vegetarian", "lacto ovo vegetarian","vegan","pescatarian","primal","whole 30", "fodmap friendly","dairyFree"]
    diets?.forEach(async(el) => await Diet.create({name: el}))
    console.log('Dietas pre cargadas :)');

    console.log('server is listening at 3001'); // eslint-disable-line no-console
  });
});
