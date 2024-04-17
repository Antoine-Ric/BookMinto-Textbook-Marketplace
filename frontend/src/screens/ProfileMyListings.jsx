import React, { useEffect, useState } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import ProfileHeader from '../components/ProfileHeader';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { 
    useGetProductsQuery,
    useDeleteProductMutation,
    useCreateProductMutation,
} from "../slices/productsApiSlice";
import { toast } from 'react-toastify';

const MyListings = () => {
    const {data: products, isLoading, error, refetch} = useGetProductsQuery("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    console.log(products);

    // get user info:

    /* 
        use userEmail for now. Since texbooks werent made with this user they wont show up.
        Not sure how to change the user attribute of products.
        However, when user creates new post, then sorting by userID should work.
    */
    const [email, setEmail] = useState("");
    //const [userID, setUserID] = useState("");
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        setEmail(userInfo.email);
    }, [userInfo.email]);

    /*
    useEffect(() => {
        //setEmail(userInfo.email);
        setUserID(userInfo._id)
    }, [userInfo._id]);
    */

    // handlers
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure')) {
          try {
            await deleteProduct(id);
            toast.success('Product deleted')
            refetch();
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }
      };

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
        try {
            await createProduct();
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        }
    };



    return <>
        <ProfileHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Row className="align-items-center">
            <Col className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
                <h2>My Listings</h2>
            </Col>
            <Col className="text-end">
                <Button className="btn-sm m-3" onClick={createProductHandler}>
                    <FaPlus /> Create New Listing
                </Button>
            </Col>
        </Row >
        <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
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
                                    <td>
                                        <LinkContainer to={`/product/${product._id}/edit`}>
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
                                    </td>
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