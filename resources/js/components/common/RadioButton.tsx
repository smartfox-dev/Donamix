import React, { useState } from 'react';

const RadioButton = ({ label, name, value, checked, onChange }) => {
  return (
    <label className="flex items-center w-full gap-1">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="text-gray-700 form-radio focus:ring-gray-900 border-gray-300"
      />
      <span className="font-medium text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton;
