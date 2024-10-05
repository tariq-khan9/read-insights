import React, { useEffect, useState } from "react";
import Select from "react-select";

// Custom styles for react-select
const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "30px",
    minHeight: "30px",
    borderRadius: 5,
    marginLeft: "0px",
    fontSize: "12px", // Reduce text size in the control
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
    fontSize: "12px", // Reduce text size in value container
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    height: "20px",
    fontSize: "12px", // Reduce text size for single values
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "30px",
    fontSize: "10px"
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#ece9fd" : provided.backgroundColor,
    color: state.isFocused ? "black" : provided.color,
    fontSize: "12px", // Reduce text size for dropdown options
  }),
};

// MultiSelect component
const MultiSelect = ({
  options = [], // Ensure default value is an empty array
  placeholder,
  onChange,
  setCategories,
  data = [],
}) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelected(data);
      setCategories(data);
    }
  }, [data]);

  const handleChange = (selected, actionMeta) => {
    setSelected(selected);
    onChange(selected);
  };

  return (
    <Select
      options={options} // Ensure options is always an array
      placeholder={placeholder}
      onChange={handleChange}
      isMulti
      styles={customStyles}
      value={selected} // Pass selected state to Select component
    />
  );
};

export default MultiSelect;
