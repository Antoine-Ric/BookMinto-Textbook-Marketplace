import React, { useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes } from "react-icons/fa";
import ProfileHeader from '../components/ProfileHeader';
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";

const ProfileScreen = () => {
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Row> 
        <ProfileHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
      </div>
    </Row>
  );
};

export default ProfileScreen;
