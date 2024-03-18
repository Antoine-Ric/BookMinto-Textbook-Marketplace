import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProfileHeader from "../components/ProfileHeader";
import '../assets/styles/ProfileInfoScreen.css';

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  return (
    <Row>
      <ProfileHeader step1 step2 step3 step4 />

      <Col md={9}>
        <h2>Profile Info Page</h2>
        <Table className="custom-table" striped hover responsive>
          <tbody>
            <tr >
              <th style={{ padding: '20px 0px' }}>Name</th>
              <td style={{ padding: '20px 0px' }}>{name}</td>
            </tr>
            <tr>
              <th style={{ padding: '20px 0px' }}>Email</th>
              <td style={{ padding: '20px 0px' }}>{email}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
