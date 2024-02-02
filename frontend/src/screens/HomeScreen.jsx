import { Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import products from '../products'; 

import { useState } from "react";
import "../styles/SearchBar.css";
import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";

const HomeScreen = () => {
  const [results, setResults] = useState([]);
  return (
    <>
      <div className="Search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResults results={results} />
      </div>


      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key = {product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen
