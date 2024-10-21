import React from 'react'
import Main from '../../../components/layout/Main'
import {
    Card,
} from "antd"


export default function reviews() {
    return (
        <>
            <div className='review-heading'>
                <h2>Customer Reviews & Rating</h2>
            </div>

            <Card className='customer-all-rating-card'>
                <div className='card-inner'>
                    <h3>Customer Rating</h3>
                </div>
            </Card>


        </>
    )
}

reviews.layout = Main 
