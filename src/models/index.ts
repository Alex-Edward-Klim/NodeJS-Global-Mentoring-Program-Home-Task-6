import Group from './group';
import User from './user';

//
// import dataBase from '../data-access/dataBase';

User.belongsToMany(Group, { through: 'UserGroup' });
Group.belongsToMany(User, { through: 'UserGroup' });

//
// Create Tables In DataBase
// dataBase
//   // .sync({ force : true })
//   .sync()
//   .then(async () => {
//     console.log('complete');
//   })
//   .catch((err) => console.log('Custom Err: ', err));
//

export {
  Group,
  User,
};
