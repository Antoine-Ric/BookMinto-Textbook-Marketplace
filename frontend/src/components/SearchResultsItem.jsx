import React from 'react'
import "../styles/SearchBar.css";

export const SearchResultsItem = ({ result }) => {
  return (
    <div className='search-result'>{result.name}</div>
  )
}
