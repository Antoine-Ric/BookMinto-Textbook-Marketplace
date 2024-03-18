import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const OfferScreen = () => {

        const acceptOffer = () => {
            
        };

        const declineOffer = () => {

        };

        const counterOffer = () => {

        };

    
        return (
            <div>
                <Button onClick ={acceptOffer}>Accept Offer</Button>
                <Button onClick ={declineOffer}>Decline Offer</Button>
                <Button onClick ={counterOffer}>Counteroffer</Button>
            </div>

        )

};

export default OfferScreen;