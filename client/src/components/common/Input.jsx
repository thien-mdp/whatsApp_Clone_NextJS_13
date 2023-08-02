import React from 'react';

function Input({ name, state, setState, label = false }) {
  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label htmlFor={name} className='px-1 text-lg text-teal-light'>
          {name}
        </label>
      )}
      <div>
        <input
          type='text'
          name={name}
          value={state}
          onChange={(e) => setState(e.target.value)}
          className='w-full h-10 px-5 py-4 text-white rounded-lg bg-input-background text-start focus:outline-none'
        />
      </div>
    </div>
  );
}

export default Input;
