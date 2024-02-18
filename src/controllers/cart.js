import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()



// add To Cart
export const addTocart = async(req, res) => {
    const {product_id, quantity} = req.body;
    const user_id = req.user.id


    try {
        const product = await prisma.product.findUnique({
          where: { id: product_id, in_stock: true }
        });
        
    
        if (!product) {
          return res.json({ error: 'Product not found or out of stock' });
        }

        if(quantity < 1){
          return res.json({ error: 'Quantity must be valid '})
        }
        
        

        const existingCart = await prisma.cart.findFirst({
              where: { productID: Number(product_id), userID:user_id}
            })
            
          
                if (existingCart) {
                  const cart = await prisma.cart.update({
                    where: { id: existingCart.id },
                    data: {
                      quantity: Number(existingCart.quantity) + Number(quantity),
                      total: Number(product.price) * (Number(existingCart.quantity) + Number(quantity))
                    }
                })
                return res.json({ message: 'Product added to cart', cart });
              }
              
                const cartItem = await prisma.cart.create({
                  data: {
                    quantity: Number(quantity),
                    userID: user_id,
                    productID: product_id,
                      total: product.price * quantity,
                      
      
                  },
                });
                  
        
          return res.json({ message: 'Product added to cart', cartItem });
        } catch (error) {
          res.json({ error: 'Internal Server Error' });
        } 
}


// show cart
export const showCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findMany({
      where:{userID: req.user.id}
    });

    if(!cart){
      return res.status(200).json({ message: 'Cart is Empty'})
    }

    const total = cart.reduce((sum, item) => sum + item.total, 0);

    res.status(200).json({ total, cart })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// delete All cart 
export const deleteCart = async (req, res) => {
  try {
    await prisma.cart.deleteMany({});

    res.status(200).json({message: 'Cart Empty'})
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
}

// delete cart by Id 
export const deleteCartById = async (req, res) => {
  const cartId = parseInt(req.params.id)

  try {
    await prisma.cart.delete({
      where: {id: cartId}
    });

    res.status(200).json({message: 'Product removed from cart'})

  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
}


// checkout

export const checkOut = async (req, res) => {
  try {

    
    const user_Id = req.user.id
    console.log(user_Id);
    const cart = await prisma.cart.findMany({
      where: {userID : Number(user_Id) }
    });


    if(cart.length === 0 ){
      return res.json({message: "cart is empty"})
    }

    const total = cart.reduce((sum, item) => sum + item.total, 0);

    // Save the order details to the 'orders' table
    
    const order = await prisma.orders.create({
      data: {
        userID: user_Id,
        total,
        created_at: new Date(),  // Set the current timestamp
        nomorOrder: `ORD/${Math.floor(Math.random() * 1000)}`
        
        
      },
    });

    const items = cart.map((product) => {
      return {
        order_id: order.id,
          product_id: product.productID,
          quantity: product.quantity,
          price: product.price,
          total: product.total
      }
    } )


      // save order item to order item table 
    const orderItem = await prisma.orderItems.createMany({

      data: items
    })

     await prisma.cart.deleteMany({
      where:{userID: user_Id}
    });


    res.status(200).json({ message: 'Order placed successfully',order:order,items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


