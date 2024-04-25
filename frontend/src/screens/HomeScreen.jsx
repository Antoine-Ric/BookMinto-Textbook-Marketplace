import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";

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
            {subjects.map((item, index) => (
              <Row>
                <h2>{item}</h2>
                {products.filter(product => product.Subject === item).map((product, index) => (
                  <Col key={index} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            ))}
        </>
      )}
    </>
  );
};

export default HomeScreen;
