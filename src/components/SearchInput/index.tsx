import { ChangeEvent } from 'react';

type SearchInputProps = {
  value: string;
  onChange: (newValue: string) => void;
}

export default function SearchInput ({ value, onChange}: SearchInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    onChange(newValue);
  }

  return (
    <input 
      type="search" 
      value={value}
      onChange={handleChange}  
    />
  );
}