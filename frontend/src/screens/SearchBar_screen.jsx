//search bar under the navbar on the homescreen

import React, { useState } from "react";
import "../styles/SearchBar.css";
import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";

export default function SearchBar_screen() {
    const [results, setResults] = useState([])
    return (
        <div className="Search-bar-container">
            <SearchBar setResults={setResults}/>
            <SearchResults results={results}/>
        </div>
    );
}