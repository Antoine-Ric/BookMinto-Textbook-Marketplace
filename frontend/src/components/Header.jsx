import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import {  FaHeart, FaBell } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import logo from "../assets/mintlogosmall.png";
import { selectFavoritesCount } from '../slices/favoriteSlice'; // Correctly import the selector
import { removeHiddenFromCart } from '../slices/favoriteSlice'; // Import the action creator


const Header = () => {
  //const { cartItems } = useSelector((state) => state.cart);

  const favoritesCount = useSelector(selectFavoritesCount); // Get favorites count from Redux store

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogoClick = () => {
    dispatch(removeHiddenFromCart()); // Call the action creator on logo click
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand onClick={handleLogoClick}> {/* Attach onClick handler to the logo */}
              <img src={logo} alt="BookMinto" />
              BookMinto
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/favorites">
                <Nav.Link>
                  <FaHeart /> {favoritesCount}
                  
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/offers">
                <Nav.Link>
                  <FaBell>
                    
                  </FaBell>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profileinfo">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
