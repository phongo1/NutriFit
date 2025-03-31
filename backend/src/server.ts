import app from './app';
import config from './config/config';
import { connectDB } from './config/db';
import mongoose from 'mongoose';
import User from './models/User';


// connectDB();
// const testUser = async () => {
//   try {
//     await connectDB();


//     const newUser = new User({
//       username: 'testuser123',
//       firstname: 'John',
//       lastname: 'Doe',
//       password: 'securepassword', // Remember to hash this in production
//       fitnessgoal: 'bulking',
//       saveditems: [{ name: 'Protein Powder', details: 'Whey protein 2 lbs' }],
//     });

//     await newUser.save();
//     console.log('Test User Created:', newUser);

//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error creating test user:', error);
//   }
// };

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
  }
);