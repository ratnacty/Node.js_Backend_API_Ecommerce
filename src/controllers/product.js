import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get All Product
export const Allproducts = async(req, res) => {

  // setting pagination
    const {page = 1, limit = 3 } = req.query  
    const skip = ( page - 1 ) * limit

    const products = await prisma.product.findMany({
      take: parseInt(limit),
      skip:skip
    })

    // information total data
    const result = await prisma.product.count() //integer total product

    // generated total page 
    const totalPage = Math.ceil(result / limit)

    res.status(200).json({
      success: true,
      current_page: page-0,
      total_page: totalPage,
      total_data: result,
      data: products
    })
}

// Create Product
export const createProduct = async(req, res) => {
    const { name, category, price, in_stock, description } = req.body
    const user_id = req.user.id

  
    if (!name || !category || !price || !in_stock) {
      res.status(400).json({ message: 'Missing required fields' })
      return
    }

  
    const product = await prisma.product.create({
      data: { name, category, price, in_stock, description, user_id }
    })
  
    res.json({ message: 'Product created successfully', product })
  
}


// Get Product By Id
export const getProductById = async(req, res) => {
    const productId = req.params.id 

    if(isNaN(productId)) {
        res.status(400).json({message: 'Invalid Id'})
        return
    }

    try {
        const product = await prisma.product.findFirstOrThrow({where: {id: Number(productId)}})
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({message: 'Product Not Found'})
    }
}

// Search Product
export const searchProduct = async(req, res) => {
  
    const { query } = req.query

    const {page = 1, limit = 3 } = req.query  
    const skip = ( page - 1 ) * limit

    const search = await prisma.product.findMany({
     
        where: {
            OR:[
                {category: {contains:query}},
                {description: {contains:query}},
                {name: {contains:query}}
                
            ]
           
        },
        take: parseInt(limit),
        skip:skip,
      
      })

       // information total data
    const result = await prisma.product.count({
      where: {
        OR:[
            {category: {contains:query}},
            {description: {contains:query}},
            {name: {contains:query}}
            
        ]
       
    },
    }) //integer total product

    // generated total page 
    const totalPage = Math.ceil(result / limit)

    res.status(200).json({
      current_page: page-0,
      total_page: totalPage,
      total_data: result,
      data: search
    })

}


// Update Product
export const updateProduct = async(req, res) => {
    const { name, category, price, in_stock, description } = req.body
  
    if (!name || !category || !price) {
      res.status(400).json({ message: 'Missing required fields' })
      return
    }
  
    const productId = req.params.id
  
    if (isNaN(productId)) {
      res.status(400).json({ message: 'Invalid ID' })
      return
    }
  
    try {
      const product = await prisma.product.update({
        where: { id: Number(productId) }, // !!!!!!!!!
        data: { name, category, price, in_stock, description }
      })
      res.status(201).json({ message: 'Product updated successfully', product })
    } catch (err) {
      res.status(404).json({ message: 'Not found' })
    }
  
}


// Delete Product
export const deleteProduct = async(req, res) => {
    const productId = Number(req.params.id);
  
    if (isNaN(productId)) {
      res.status(400).json({ message: 'Invalid ID' })
      return
    }
  
    try {
      const product = await prisma.product.delete({
        where: { id: Number(productId) }
      })
      res.json({ message: 'Product deleted successfully', product })
    } catch (err) {
      res.status(404).json({ message: 'Not found' })
    }
  
}