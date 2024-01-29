import React from 'react'
import "../styles/SearchBar.css";
import { SearchResultsItem } from './SearchResultsItem';

/* 
    this will have to be removed or reworked
    currently for testing purposes
    corect version will just display posts on homescreen
*/

export const SearchResults = ({results}) => {
  return (
    <div className='results-list'>
        {
            results.map((result, id) => {
                return <SearchResultsItem  result={result} key={id}/>
            })
        }
    </div>
  )
}
