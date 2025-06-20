import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../assets/styles/ProfileHeader.css';

const ProfileHeader = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <Nav className='flex-column'>
      <Nav.Item>
          <LinkContainer to='/profileinfo'>
            <Nav.Link>Profile Info</Nav.Link>
          </LinkContainer>
      </Nav.Item>

      <Nav.Item>
          <LinkContainer to='/profileupdate'>
            <Nav.Link>Update Profile</Nav.Link>
          </LinkContainer>
      </Nav.Item>

      <Nav.Item>
          <LinkContainer to='/myorders'>
            <Nav.Link>My Orders</Nav.Link>
          </LinkContainer>
      </Nav.Item>

      <Nav.Item>
          <LinkContainer to='/mylistings'>
            <Nav.Link>My Listings</Nav.Link>
          </LinkContainer>
      </Nav.Item>
    </Nav>
    </div>
  );
};

export default ProfileHeader;