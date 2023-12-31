import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/AuthService";
import "../register.css"

const RegisterHomePage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
      });
      const [registrationError, setRegistrationError] = useState<string | undefined>(undefined)
    
      let token: string | null = null;
      const navigate = useNavigate();
    
      
      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
          
          const result = await registerUser(formData);
          token = result?.data;
          if (token != null) {
            navigate("/", { state: { token: token, username: formData.username } });
          }
        } catch (error) {
          // @ts-ignore
          setRegistrationError(error)
        }
      };
    
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
                <h1>Create an Account</h1>
              </div>
    
              {/* Registration Form */}
              <div className="col-md-7 col-lg-6 ml-auto">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Username */}
                    <div className="input-group col-lg-6 mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                          <i className="fa fa-user text-muted"></i>
                        </span>
                      </div>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="form-control bg-white border-left-0 border-md"
                        value={formData.username}
                        onChange={(event) =>
                          setFormData({ ...formData, username: event.target.value })
                        }
                      />
                    </div>
    
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
                        <span className="font-weight-bold">Create your account</span>
                      </button>
                    </div>
    
                    {/* Already Registered */}
                    <div className="text-center w-100">
                      <p className="text-muted font-weight-bold">
                        Already Registered? 
                        <a style={{cursor: "pointer"}} className="text-primary ml-2" onClick={()=> navigate("/login")}> Login</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          { registrationError && 
            <div className="form-error">
              <h3>{registrationError}</h3>
            </div>
          }

        </div>
      );
    };

export default RegisterHomePage


