import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUsername, loginUser } from '../service/AuthService';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
      let token: string | null = null;
      let username = null;
      const navigate = useNavigate();
      const [loginError, setLoginError] = useState<string | undefined>(undefined)
    
    
      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
          const result = await loginUser(formData);
          const token = result?.data;
          
          username = (await getUsername(token, formData.email))?.data
          
          // Reindirizza alla pagina principale se il client ha ricevuto un token.
          if (token != null) navigate("/", { state: { token: token, username: username }});
        } catch (error:any) {
          setLoginError(error);
        }
      }
      
    
      return (
        <div className="register-container">
          <div className="container">
            <div className="row py-5 mt-4 align-items-center">
              <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg"
                  alt=""
                  className="img-fluid mb-3 d-none d-md-block"
                />
                <h1>Welcome back</h1>
              </div>
    
              {/* Registration Form */}
              <div className="col-md-7 col-lg-6 ml-auto">
                <form onSubmit={handleSubmit}>
                  <div className="row">
    
                    {/* Email Address */}
                    <div className="input-group col-lg-12 mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                          <i className="fa fa-envelope text-muted"></i>
                        </span>
                      </div>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control bg-white border-left-0 border-md"
                        value={formData.email}
                        onChange={(event) =>
                          setFormData({ ...formData, email: event.target.value })
                        }
                      />
                    </div>
    
                    {/* Password */}
                    <div className="input-group col-lg-6 mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                          <i className="fa fa-lock text-muted"></i>
                        </span>
                      </div>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control bg-white border-left-0 border-md"
                        value={formData.password}
                        onChange={(event) =>
                          setFormData({ ...formData, password: event.target.value })
                        }
                      />
                    </div>
    
    
                    {/* Submit Button */}
                    <div className="form-group col-lg-12 mx-auto mb-0">
                      <button type="submit" className="btn btn-primary btn-block py-2">
                        <span className="font-weight-bold">Login</span>
                      </button>
                    </div>
    
                    {/* Register */}
                    <div className="text-center w-100">
                      <p className="text-muted font-weight-bold">
                        Don't have an account? 
                        <a style={{cursor: "pointer"}} onClick={()=> navigate("/register")} className="text-primary ml-2"> Register</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          { loginError && 
            <div className="form-error">
              <h3>{loginError}, you probably inserted an invalid username and password</h3>
            </div>
          }   
        </div>
      )
}

export default LoginPage