import React, { useEffect, useState } from "react";
import Select from "react-select";

// Custom styles for react-select
const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "40px",
    minHeight: "40px",
    borderRadius: 5,
    marginLeft: "0px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "40px",
    padding: "0 6px",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    height: "40px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#ece9fd" : provided.backgroundColor,
    color: state.isFocused ? "black" : provided.color,
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
      setCategories(data)
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
