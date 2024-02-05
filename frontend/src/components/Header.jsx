import { Navbar, Nav, Container} from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from "../assets/mintlogosmall.png"; // Angela change the logo to have just the leaf
import "../assets/styles/bootstrap.custom.css";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="BookMinto" />
              BookMinto
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <LinkContainer to="/products">
                <Nav.Link className="products-link">Products</Nav.Link> 
              </LinkContainer>
            </Nav>
            <Nav className="ms-auto">
              {/* <Nav.Link href="/cart"><FaShoppingCart/> Cart</Nav.Link> */}
              <LinkContainer to="/login">
                <Nav.Link href="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
