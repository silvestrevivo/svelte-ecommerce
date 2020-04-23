import axios from 'axios';
import setupUser from './setupUser';

async function registerUser({ username, email, password }) {
    const response = await axios
        .post(`${process.env.API_URL}/auth/local/register`, {
            username,
            email,
            password,
        })
        .catch(error => console.log(error));

    if (response) {
        setupUser(response);
    }

    return response;
}

export default registerUser;
