import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
// import products from '../products';

const HomeScreen = () => {
  const {keyword} = useParams()
  const { data: products, isLoading, error } = useGetProductsQuery({keyword});
  const subjects = ['Science', 'Technology', 'Math', 'Engineering', 'Social Science', 'Business', 'Other']
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <SearchBox />
          <h1>Latest Products</h1>
          <Row>
            <h2>Science</h2>
              {products.filter((product) => product.Subject === subjects[0]).map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row>
            <h2>Technology</h2>
              {products.filter((product) => product.Subject === subjects[1]).map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row>
            <h2>Math</h2>
              {products.filter((product) => product.Subject === subjects[2]).map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row>
            <h2>Engineering</h2>
            {products.filter((product) => product.Subject === subjects[3]).map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row>
            <h2>Social Science</h2>
            {products.filter((product) => product.Subject === subjects[4]).map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row>
            <h2>Business</h2>
            {products.filter((product) => product.Subject === subjects[5]).map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row>
            <h2>Other</h2>
            {products.filter((product) => product.Subject === subjects[6]).map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
