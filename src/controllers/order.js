import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const readOrder = async (req, res) => {

    const {page = 1, limit = 3 } = req.query  
    const skip = ( page - 1 ) * limit

    const order = await prisma.orders.findMany({
        take: parseInt(limit),
        skip:skip
    })

     // information total data
     const result = await prisma.orders.count() //integer total product

     // generated total page 
     const totalPage = Math.ceil(result / limit)


     res.status(200).json({
        success: true,
        current_page: page-0,
        total_page: totalPage,
        total_data: result,
        data: order
      })
}

export const history_order_user = async (req, res) => {
    const userId = req.user.id
    
    // const order_id = parseInt(req.params.id)

    const UserOrder = await prisma.orders.findMany({
      where: {userID: userId},
      orderBy: {
        id: 'desc',
      },
    })

    res.json(UserOrder)
}

export const deleteOrder = async (req, res) => {
  const orderId = Number(req.params.id);
  
  if (isNaN(orderId)) {
    res.status(400).json({ message: 'Invalid ID' })
    return
  }

  try {

    const orderItem = await prisma.orderItems.deleteMany({
      where: {order_id : orderId}
    })
    const order = await prisma.orders.delete({
      where: { id: Number(orderId) }
    })

     


    res.json({ message: 'Order deleted successfully', order })
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Not found' })
  }
}

export const readOrderItem = async (req, res) => {
  const {page = 1, limit = 3 } = req.query  
  const skip = ( page - 1 ) * limit

  const orderItems = await prisma.orderItems.findMany({
      take: parseInt(limit),
      skip:skip
  })

   // information total data
   const result = await prisma.orderItems.count() //integer total product

   // generated total page 
   const totalPage = Math.ceil(result / limit)


   res.status(200).json({
      success: true,
      current_page: page-0,
      total_page: totalPage,
      total_data: result,
      data: orderItems
    })
}