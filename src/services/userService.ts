import User from '../models/userModel';
import IUser from '../interfaces/userInterface';


const registerUser = async (userData: IUser) => {
    const { username, password } = userData;
    try {
        const user = new User({ username, password });
        await user.save();
        return user;
    } catch (error) {
        throw new Error('User registration failed');
    }
};

export default {registerUser};
