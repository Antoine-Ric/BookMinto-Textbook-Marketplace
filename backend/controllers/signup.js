import User from '../data/users.js'; 
import bcrypt from 'bcryptjs';

const signup = async (username, email, password) => {
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return newUser;
  } catch (error) {
    throw error;
  }
};

export default signup;
