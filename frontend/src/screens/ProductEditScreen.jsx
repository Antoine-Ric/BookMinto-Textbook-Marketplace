import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [Subject, setSubject] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [Author, setAuthor] = useState('')
  const [ISBN, setISBN] = useState('')

  const [userEmail, setEmail] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        Subject,
        Author,
        description,
        countInStock,
        ISBN,
        userEmail
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Product updated');
      refetch();
      navigate('/mylistings');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setSubject(product.Subject);
      setAuthor(product.Author);
      setISBN(product.ISBN);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setEmail(userInfo.email);
    }
  }, [product, userInfo.email]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/mylistings' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? <Message variant='danger'>
        {error.data.message}</Message> : (
          
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='ISBN'>
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter ISBN'
                value={ISBN}
                onChange={(e) => setISBN(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loader />}
        </Form.Group>

            <Form.Group controlId='Author'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Author'
                value={Author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Subject'>
                <Form.Label>Subject</Form.Label>
                <Form.Control
                    as='select'
                    value={Subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    <option value='Science'>Science</option>
                    <option value='Technology'>Technology</option>
                    <option value='Math'>Math</option>
                    <option value='Engineering'>Engineering</option>
                    <option value='Social Science'>Social Science</option>
                    <option value='Business'>Business</option>
                    <option value='Other'>Other</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;