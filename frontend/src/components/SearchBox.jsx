import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate()
    const {keyword: urlKeyword} = useParams()
    const [keyword, setKeyword] = useState(urlKeyword || '')

    const submitHandler = (e) => {
        
    }
  
    return (
    <Form onSubmit={submitHandler} className=''>
        <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder='Search By Name or ISBN...'
            className=''
        ></Form.Control>
        <Button type='submit' variant='outline-success' className=''> Search </Button>
    </Form>
  )
}

export default SearchBox