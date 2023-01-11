import mongoose from 'mongoose';

// mongoose.connect(
// 	'mongodb+srv://root:123123123@cluster0.kssgfqn.mongodb.net/cpfValidator',
// );

// const db = mongoose.connection;

const db = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://root:123123123@cluster0.kssgfqn.mongodb.net/cpfValidator',
		);
		console.log('[Mongoose]: Connected to the database');
		return mongoose.connection;
	} catch (error) {
		console.log(`[Mongoose]: ${error}`);
	}
};

export default db;
