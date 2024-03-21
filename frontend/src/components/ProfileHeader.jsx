import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileHeader = () => {
  return (
    <Nav className='justify-content-center mb-4'>
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
          <LinkContainer to='/notifications'>
            <Nav.Link>Notifications</Nav.Link>
          </LinkContainer>
      </Nav.Item>

      <Nav.Item>
          <LinkContainer to='/myorders'>
            <Nav.Link>My Orders</Nav.Link>
          </LinkContainer>
      </Nav.Item>
    </Nav>
  );
};

export default ProfileHeader;