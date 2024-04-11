import React, { useState } from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AnimatedMulti({placeholder, options, param, param2}) {
   options.map((option) => {
    (param2 === '') ? option.label = option[param] : option.label = option[param]+ ' ' + option[param2];
   });

    
  return (
    <Select
        placeholder={placeholder}
      closeMenuOnSelect={false}
      defaultValue={[]}
      components={animatedComponents}
      isMulti={true}
      options={options}

    />
  );
}
