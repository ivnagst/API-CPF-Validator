import mongoose from 'mongoose';

// const db = mongoose.connect(
//   "mongodb+srv://root:123123123@cluster0.kssgfqn.mongodb.net/cpfValidator"
// );

const db = mongoose.createConnection(
	'mongodb+srv://root:123123123@cluster0.kssgfqn.mongodb.net/cpfValidator',
);

export default db;
