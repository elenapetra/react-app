import Button from 'common/Button/Button';
import { useState } from 'react';
import { SearchBarProps } from 'helpers/Types';
import './SearchBar.css';

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };
  return (
    <div className='search-bar'>
      <input
        className='search-bar-input'
        value={searchTerm}
        type='text'
        placeholder='Input text'
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
      <Button label='SEARCH' size='small' onClick={handleSearch} />
    </div>
  );
};
