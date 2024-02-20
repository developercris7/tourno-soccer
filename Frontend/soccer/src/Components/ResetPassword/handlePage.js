import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import {Link} from 'react-router-dom'

const handlePage = (
  newPage,
  handleChange,
  handleEmail,
  handleCode,
  handlePassword,
  formError,
  verifyText,
  formData
) => {
  switch (newPage) {
    case 1:
      return (
        <div className="email-box">
          <img
            src="https://cdn-icons-png.flaticon.com/128/7721/7721667.png"
            alt="reset-password-img"
            className="reset-image"
          />
          <div className="mt-5 text-center px-md-5">
            <h4>Recover your password</h4>
            <p>
              Enter the email that you used when you signed up to recover your
              password
            </p>
          </div>

          <form className="mx-auto px-4" onSubmit={handleEmail}>
            <label htmlFor="email" className="label">
              <MdEmail className="fs-5 my-auto me-1" />
              <span>Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              id="email"
              className={`input ${
                formError && formError.email ? "err-input" : ""
              }`}
              value={formData.email}
              autoComplete="off"
              onChange={handleChange}
            />
             
            <button className="submit-btn-1 float-end" type="submit">
              Send
            </button>
            {formError && formError.email && (
              <p className="err-text">{formError.email}</p>
            )}
            {verifyText && (
              <p style={{ color: "green" }}>Email Verfied !</p>
            )}
           
          </form>
        </div>
      );
    case 2:
      return (
        <div className="email-box">
          <div className="mt-5 text-center px-md-5">
            <h4>Code Verification </h4>
            <p>
              Enter the 6-digit verification code sent to your email address for
              verification
            </p>
          </div>

          <form className="mx-auto px-4" onSubmit={handleCode}>
            <label htmlFor="verificationCode" className="label">
              {/* <MdEmail className='fs-5 my-auto me-1'/> */}
              <span>Verification Code</span>
            </label>
            <input
              type="text"
              placeholder="X X X X X X"
              name="verificationCode"
              id="verificationCode"
              className={`input ${
                formError && formError.verificationCode ? "err-input" : ""
              }`}
              value={formData.verificationCode}
              autoComplete="off"
              onChange={handleChange}
              maxLength={6}
            />
              
            <button className="submit-btn-1 float-end" type="submit">
              Verify
            </button>

            {formError && formError.verificationCode && (
              <p className="err-text">{formError.verificationCode}</p>
            )}

              {verifyText && (
              <p style={{ color: "green" }}>Verified Successfully !</p>
            )}
            {/* <p className='err-text'>Email is required!</p> */}
          
          </form>
        </div>
      );
    case 3:
      return (
        <div className="email-box">
          <div className="mt-4 mb-3 text-center px-md-5">
            <img
              src="https://cdn-icons-png.flaticon.com/128/10542/10542551.png"
              alt="password-img"
              style={{ width: "60px" }}
              className="my-3 my-md-0"
            />
            <h4>Set a New Password</h4>
            <p>Enter a strong password</p>
          </div>

          <form className="mx-auto px-4" onSubmit={handlePassword}>
            <label htmlFor="password" className="label">
              <FaLock className="fs-5 my-auto me-1" />
              <span>New Password</span>
            </label>
            <input
              type="password"
              className={`input ${
                formError && formError.password ? "err-input" : ""
              }`}
              placeholder="Enter your password"
              name="password"
              id="password"
              value={formData.password}
              autoComplete="off"
              onChange={handleChange}
            />
  
            <button className="submit-btn-1 float-end" type="submit">
              Save
            </button>
            {formError && formError.password && (
              <p className="err-text">{formError.password}</p>
            )}
          </form>
        </div>
      );
    default:
      return (
        <div className="email-box">
          <div className="text-center mt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/845/845646.png"
              alt="tick-img"
              style={{ width: "60px" }}
              className="my-3"
            />
            <h5>Your Password Updated Successfully !</h5>
            <p>
              To ensure account's security you need to sigin to the application
            </p>
            <button className="submit-btn"><Link to="/signin">Sign In</Link></button>
          </div>
        </div>
      );
  }
};

export default handlePage;
