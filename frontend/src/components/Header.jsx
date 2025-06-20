import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import {  FaHeart } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import logo from "../assets/mintlogosmall.png";
import { selectFavoritesCount } from '../slices/favoriteSlice'; // Correctly import the selector
import { removeHiddenFromCart } from '../slices/favoriteSlice'; // Import the action creator


const Header = () => {
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
            <Navbar.Brand onClick={handleLogoClick}>
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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profileinfo">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                    </NavDropdown.Item>
                            </NavDropdown>
                        ) : (<LinkContainer to='/login'>
                            <Nav.Link>
                            <FaUser /> Sign In
                            </Nav.Link>
                        </LinkContainer>) } 
                       {userInfo && userInfo.isAdmin && (
                          <NavDropdown title='Admin' id='adminmenu'>
                          <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                        )}
                    </Nav> 
                </Navbar.Collapse>
                </Container>  
            </Navbar>
        </header>
    )
}

export default Header;
