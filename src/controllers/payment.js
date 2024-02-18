
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import { config } from 'dotenv';
import Stripe from 'stripe';

config();


    // Initialize Stripe with API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
  });
  

//   Payment Function
  const Payment = async (req, res) => {

    const userId = req.user.id
    
    const order_id = parseInt(req.params.id)

    const order = await prisma.orders.findFirst({
      where: {id:order_id}
    })

    if(!order){
      return res.json({ message: "Order Id not Found" })
    }

    if(userId !== order.userID){
     return  res.json({ message: "you doesnt have access!!" })
    }

    // if(req.params.id !== order.id){
    //   return res.json({message: "invalid Order Id"})
    // }

    if(order.status === "Paid"){
      return res.json({message: "Order Already Paid, Please Cek Your Order History"})
    }

    try {

        const customer_email = req.user.email;
        const customer_name = req.user.name;

        // Create a new customer with the generated email
        const customer = await stripe.customers.create({
          email: customer_email,
          name: customer_name,
          
        });

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
    
      amount:order.total,
      currency: "USD",
      payment_method:  "pm_card_visa",
      customer: customer.id
      
    });

    // Confirm the PaymentIntent to handle 3D Secure or other authentication 
    await stripe.paymentIntents.confirm(paymentIntent.id);

      // condition to update status order
      if(paymentIntent.client_secret){

        const updateStatus = await prisma.orders.update({
          where: {
           id: order_id,
           
        },
          data: {
            status: "Paid"
          },
        })

        res.status(200).json({
          clientSecret: paymentIntent.client_secret,
          message: "Success ! tanks, we will reach out you soon"
        });  

      }
   // Send the PaymentIntent client secret to the client
     
   
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


export default Payment