import axios from 'axios';

const baseUrl = '/api/user';

const userService = {
    signup: async (socialSecurityNumber, password, role) => {
        try {
            const response = await axios.post(`${baseUrl}/signup`, { socialSecurityNumber, password, role });
            return response.data.token;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
    login: async (socialSecurityNumber, password) => {
        try {
            const response = await axios.post(`${baseUrl}/signin`, { socialSecurityNumber, password });
            return response.data.token;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
    logout: async () => {
        try {
            const response = await axios.post(`${baseUrl}/logout`);
            return response.data.message;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
  

    decodeToken: async (token) => {
        try {
            console.log(token)
            const response = await axios.get(`${baseUrl}/token`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },



    getUser: async (token, id) => {
        try {
            const response = await axios.get(`${baseUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    id
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    

}



export default userService;
