import axios from 'axios';
import setupUser from './setupUser';

async function loginUser({ email, password }) {
    const response = await axios
        .post(`${process.env.API_URL}/auth/local`, {
            identifier: email,
            password,
        })
        .catch(error => console.log(error));

    if (response) {
        setupUser(response);
    }

    return response;
}

export default loginUser;
