import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import ProfileHeader from '../components/ProfileHeader';
import { FaEdit } from "react-icons/fa";
import Loader from "../components/Loader";
import Message from "../components/Message";

const MyListings = () => {
    const {data: products, isLoading, error} = useGetProductsQuery("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    console.log(products);

    // get user info:
    const [email, setEmail] = useState("");
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        setEmail(userInfo.email);
    }, [userInfo.email]);
    
    // figure out why isbn is not showing 
    return <>
        <ProfileHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Row className="align-items-center">
            <Col className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
                <h2>My Listings</h2>
            </Col>
            <Col className="text-end">
                <Button className="btn-sm m-3">
                    <FaEdit /> Create New Listing
                </Button>
            </Col>
        </Row >
        <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
        {isLoading ? (<Loader />) : error ? (
            <Message variant="danger">
                {error?.data?.message || error.error}
            </Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ISBN</th>
                                <th>NAME</th>
                                <th>AUTHOR</th>
                                <th>PRICE</th>
                                <th>SUBJECT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.filter((product) => product.userEmail === email).map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.ISBN}</td>
                                    <td>{product.name}</td>
                                    <td>{product.Author}</td>
                                    <td>${product.price}</td>
                                    <td>{product.Subject}</td>
                                    {/*<td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                        <FaTrash style={{ color: 'white' }} />
                                        </Button>
                                    </td>*/}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )
        }
        </div>
    </>;
    
};

export default MyListings;