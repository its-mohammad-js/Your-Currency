export function Input({ label, name, formik, type = "text" }) {
  return (
    <div id="formControl" className="flex flex-col md:my-1 md:gap-y-1">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...formik.getFieldProps(name)}
        name={name}
        className="p-2 rounded-md border-2 border-secondary-600 focus:outline-secondary-100"
      />

      {formik.errors[name] && formik.touched[name] && (
        <div className="text-red-500">{formik.errors[name]}</div>
      )}
    </div>
  );
}

export function CheckBoxInput({ name, formik, checkOptions }) {
  return (
    <div id="formControl" className="flex flex-col items-start md:my-2">
      {checkOptions.map((item) => {
        return (
          <div
            key={item.value}
            className="flex items-center justify-start gap-x-1"
          >
            <input
              className=""
              type="checkbox"
              id={item.value}
              name={name}
              value={item.value}
              checked={formik.values[name]}
              onChange={formik.handleChange}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        );
      })}

      {formik.errors[name] && formik.touched[name] && (
        <div className="text-red-500">{formik.errors[name]}</div>
      )}
    </div>
  );
}

export function RadioInput({ name, formik, radioOptions }) {
  return (
    <div id="formControl" className="flex flex-col items-start md:my-2">
      {radioOptions.map((item) => {
        return (
          <div
            key={item.value}
            className="flex items-center justify-start gap-x-1"
          >
            <input
              type="radio"
              id={item.value}
              name={name}
              value={item.value}
              checked={formik.values[name] === item.value}
              onChange={formik.handleChange}
              className="mt-1"
            />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        );
      })}

      {formik.errors[name] && formik.touched[name] && (
        <div className="text-red-500">{formik.errors[name]}</div>
      )}
    </div>
  );
}
