import React from 'react'
import { useState } from 'react'
import { Form} from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate()
    const {keyword: urlKeyword} = useParams()
    const [keyword, setKeyword] = useState(urlKeyword || '')

    const handleChange = (e) => {
        const value = e.target.value;
        setKeyword(value);
        if (value.trim() === '') {
            navigate('/');
        } else {
            navigate(`/search/${value}`);
        }
    };

    return (
        <Form className="">
            <Form.Control
                type="text"
                name="q"
                onChange={handleChange}
                value={keyword}
                placeholder="Search By Name or ISBN..."
                className=""
            ></Form.Control>
        </Form>
    );
};

export default SearchBox