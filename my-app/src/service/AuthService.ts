import axios, { AxiosResponse } from "axios";

interface RegisterFormData {
    username: string,
    email : string,
    password: string
}

interface LoginFormData {
    email : string,
    password: string
}

export const registerUser = async (formData : RegisterFormData): Promise<AxiosResponse | undefined> => {
    try {
        return await axios.post("http://localhost:8080/api/v1/auth/register", formData);
    } 
    catch (error) {
        throw console.error("Error attempting to register the user " + error);
    }
}

export const authenticateUser = async (token: string): Promise<AxiosResponse | undefined> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await axios.get("http://localhost:8080/api/v1/users/authenticate", config);
  } catch (error) {
    throw console.error("Error attempting to authenticate the user " + error);
  }
};

export const loginUser = async (formData: LoginFormData): Promise<AxiosResponse | undefined> => {
  try {
    return await axios.post("http://localhost:8080/api/v1/auth/login", formData);
  } 
  catch (error) {
    throw console.error("Error attempting to login the user " + error);
  }
};

export const getUsername = async (token: string | null, email : string): Promise<AxiosResponse | undefined> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      return await axios.get(`http://localhost:8080/api/v1/users/email/${email}`, config);
    } catch (error) {
      throw console.error("Error attempting to retrive the user " + error);
    }
  };
  
  export const logout = async (token : string): Promise<AxiosResponse | undefined>  => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      return await axios.post(`http://localhost:8080/logout`, config);
    } catch (error) {
      throw console.error("Error attempting to logout the user " + error);
  
    }
  }

    