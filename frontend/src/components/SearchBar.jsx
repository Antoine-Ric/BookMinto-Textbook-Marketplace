import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import "../styles/SearchBar.css";

export const SearchBar = ({ setResults }) => {
    const[input, setInput] = useState("");

    /*
        takes in value from textbox
        makes a call to relavent api to fetch data
        & display results
    */
    const fetchData = (value) => {
        // 1. put as a place holder for testing purposes replace later when api is set up
        // 2. set up later so instead of displaying json, displays list of resulting posts
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
            // move filtering to backend later on
            const results = json.filter((user) =>{
                return (
                    value && 
                    user && 
                    user.name && 
                    user.name.toLowerCase().includes(value)
                );
            });
            setResults(results);
        });
    }

    /*
        every time text is changed in search bar
        fetchData has to be called to update results
    */
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

  return <div className='input-wrapper'>
    <FaSearch id='search-icon'/>
    <input placeholder="Search by ISBN" value={input} onChange={(e) => handleChange(e.target.value)}/>
  </div>
}
