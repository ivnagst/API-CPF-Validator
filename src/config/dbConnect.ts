import mongoose from 'mongoose';

void mongoose.connect(
	'mongodb+srv://root:123123123@cluster0.kssgfqn.mongodb.net/cpfValidator',
);

const db = mongoose.connection;

export default db;
