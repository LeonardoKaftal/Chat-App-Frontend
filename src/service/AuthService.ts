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

export const registerUser = async (formData: RegisterFormData): Promise<AxiosResponse | undefined> => {
  try {
      const response = await axios.post("https://chat-app-spring-boot-backend.onrender.com/api/v1/auth/register", formData);
      return response;
  } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
          throw "Error attempting to register the user: " + error.response.data.message;
      } else {
          throw "Error attempting to register the user: " + error.message;
      }
  }
};

export const authenticateUser = async (token: string): Promise<AxiosResponse | undefined> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await axios.get("https://chat-app-spring-boot-backend.onrender.com/api/v1/users/authenticate", config);
  } catch (error) {
    throw console.error("Error attempting to authenticate the user " + error);
  }
};

export const loginUser = async (formData: LoginFormData): Promise<AxiosResponse | undefined> => {
  try {
      const response = await axios.post("https://chat-app-spring-boot-backend.onrender.com/api/v1/auth/login", formData);
      return response;
  } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
          throw "Error attempting to login the user: " + error.response.data.message;
      } else {
          throw "Error attempting to login the user: " + error.message;
      }
  }
};

export const getUsername = async (token: string | null, email : string): Promise<AxiosResponse | undefined> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      return await axios.get(`https://chat-app-spring-boot-backend.onrender.com/api/v1/users/email/${email}`, config);
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
  
      return await axios.post(`https://chat-app-spring-boot-backend.onrender.com/logout`, config);
    } catch (error) {
      throw console.error("Error attempting to logout the user " + error);
  
    }
  }

    
