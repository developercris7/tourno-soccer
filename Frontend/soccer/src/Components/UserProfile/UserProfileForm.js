import React from "react";
import Location from './Location'

const UserProfileForm = ({formData,setFormData,handleUpdateProfile }) => {
  const forms = [
    {
      title: "personal",
      fields: [
        { label: "username", name: "username", type: "text" },
        {
          label: "gender",
          name: "gender",
          type: "select",
          options: ["Male", "Female"],
          flex: { label: "age", name: "age", type: "text" },
        },
      ],
    },
    {
      title: "contact",
      fields: [
        { label: "email", name: "email", type: "text" },
        { label: "phone", name: "phone", type: "text" },
      ],
    },
    {
      title: "club",
      fields: [
        {
          label: "position",
          name: "position",
          type: "select",
          options: ["Forward", "Midfield", "Defence", "Goal Keeper"],
          flex: { label: "clubname", name: "clubname", type: "text" },
        },
      ],
    }
  ];

  // const [formData, setFormData] = useState({
  //   personal: {
  //     username: "cris",
  //     gender: "male",
  //     age: "12",
  //   },
  //   contact: {
  //     email: "",
  //     phone: "",
  //   },
  //   club: {
  //     clubname: "",
  //     position: "",
  //   },
  //   location: {
  //     state: "india",
  //     district: "",
  //   },
  // });


  const handleChange = (e, title) => {
    const obj = { ...formData };
    const { name, value } = e.target;
    obj[title][name] = value.toLowerCase();
    setFormData(obj);
    console.log("-----")
    console.log(obj)
    console.log(formData)
  };

  return (
    <>
      <form action="" className="w-100 info-2 pb-3" onSubmit={handleUpdateProfile}>
        {forms.map((cat) => (
          <div key={cat.title}>
            <p>{cat.title}</p>
            {cat.fields.map((field) =>
              field.type === "select" ? (
                <div key={field.name} className="d-flex gap-3">
                   <div className="d-flex flex-column w-100">
                    <label htmlFor={field.flex.name} className="label">
                      {field.flex.label}
                    </label>
                    <input
                      name={field.flex.name}
                      type={field.flex.type}
                  value={formData[cat.title][field.flex.name]}
                      onChange={(e) => handleChange(e, cat.title)}
                      className="input"
                      autoComplete="off"
                    />
                  </div>
                  <div className="d-flex flex-column w-100">
                    <label htmlFor={field.name} className="label">
                      {field.label}
                    </label>
                    <select
                      className="select"
                      name={field.name}
                      onChange={(e) => handleChange(e, cat.title)}
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
               
                </div>
              ) : (
                <div key={field.name}>
                  <label htmlFor={field.name} className="label">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    value={formData[cat.title][field.name]}
                    type={field.type}
                    onChange={(e) => handleChange(e, cat.title)}
                    className="input"
                    autoComplete="off"
                  />
                </div>
              )
            )}
          </div>
        ))}
        <Location formData={formData} handleChange={handleChange} />
        <button className="btn btn-primary w-100" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default UserProfileForm;
