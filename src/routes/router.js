import express from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import {authorizePermission,authToken} from "../middleware/cekPermission.js"
import {Permission,Role,PermissionAssignment }from "../middleware/auth.js"

import {registerUser,login} from "../controllers/auth.js"
import Payment from "../controllers/payment.js"

import { readOrder, history_order_user, deleteOrder, readOrderItem } from "../controllers/order.js"

import {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser} from "../controllers/user.js"

import {
    Allproducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProduct
} from "../controllers/product.js"

import { 
    addTocart,
    deleteCart,
    showCart,
    deleteCartById,
    checkOut} from "../controllers/cart.js"




const router = express.Router();


// user 
router.get('/users', authToken, authorizePermission(Permission.READ_USER), getAllUsers);
router.post('/user/create', authToken, authorizePermission(Permission.CREATE_USER),createUser)
router.get('/user/:id',authToken, authorizePermission(Permission.BROWSE_USER),getUser)
router.post('/user/update/:id',authToken, authorizePermission(Permission.UPDATE_USER),updateUser)
router.delete('/user/delete/:id',authToken, authorizePermission(Permission.DELETE_USER),deleteUser)


// auth
router.post('/registeruser', registerUser)
router.post('/login',login)


// Product
router.get('/products',authToken,authorizePermission(Permission.READ_PRODUCT),Allproducts)
router.post('/product/create',authToken,authorizePermission(Permission.CREATE_PRODUCT),createProduct)
router.get('/product/:id',authToken,authorizePermission(Permission.BROWSE_PRODUCT),getProductById,)
router.put('/product/:id',authToken,authorizePermission(Permission.UPDATE_PRODUCT),updateProduct)
router.delete('/product/:id',authToken,authorizePermission(Permission.DELETE_PRODUCT),deleteProduct)


router.get('/search',authToken,authorizePermission(Permission.BROWSE_PRODUCT),searchProduct)

// add To cart
router.post('/addToCart',authToken,authorizePermission(Permission.ADD_TOCART), addTocart)
router.get('/displayCart',authToken,authorizePermission(Permission.SHOW_CART_BYID), showCart)
router.delete('/deleteCart',authToken,authorizePermission(Permission.DELETE_CART), deleteCart)
router.delete('/delete/:id',authToken,authorizePermission(Permission.DELETE_CART), deleteCartById)

// checkout
router.post('/checkout',authToken, authorizePermission(Permission.CHECK_OUT), checkOut)

// process payment
router.post('/process_payment/:id',authToken, authorizePermission(Permission.PROCESS_PAYMENT), Payment)

// Order Management
router.get('/read_order',authToken,authorizePermission(Permission.READ_ORDER),readOrder)
router.get('/history_order',authToken,authorizePermission(Permission.HISTORY_ORDER),history_order_user)
router.delete('/deleteOrder/:id',authToken,authorizePermission(Permission.DELETE_ORDER),deleteOrder)
router.get('/read_order_item',authToken,authorizePermission(Permission.READ_ORDER_ITEM),readOrderItem)
  




export default router
