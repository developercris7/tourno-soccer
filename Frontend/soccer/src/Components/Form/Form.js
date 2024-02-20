import React from "react";
import "./form.css";

const Form = ({ forms, handleSubmit, handleChange, formError, btn }) => {
  return (
    <div>
      <form className="px-2 mt-3" onSubmit={handleSubmit}>
        {forms.map((item) => (
          <div className={`${formError ? "mb-1" : "mb-3"}`} key={item.id}>
            <label htmlFor={item.name} className="label">
              <span className="mx-1">{item.icon}</span>
              <span>{item.name}</span>
            </label>
            <input
              name={item.name}
              id={item.name}
              placeholder={item.placeholder}
              className={`input ${
                formError && formError[item.name] ? "err-input" : ""
              }`}
              autoComplete="off"
              type={item.type}
              onChange={handleChange}
            />
            {formError && formError[item.name] && (
              <p className="err-text m-0">{formError[item.name]}</p>
            )}
          </div>
        ))}
        <button className="submit-btn" type="submit">
          {btn}
        </button>
      </form>
    </div>
  );
};

export default Form;
