export const Role = {
    ADMIN: 'administrator',
    SELLER: 'seller',
    USER: 'regular_user',
   
   
  }
  
  export const Permission = {
    READ_USER : 'read_user',
    CREATE_USER : 'create_user',
    BROWSE_USER : 'browse_user',
    GET_USER_BYID: 'get_user_byId',
    UPDATE_USER: 'update_user',
    DELETE_USER : 'delete_user',

    READ_PRODUCT :'read_product',
    CREATE_PRODUCT : 'create_product',
    BROWSE_PRODUCT: 'browse_product',
    GET_PRODUCT_BYID: 'get_product_byId',
    UPDATE_PRODUCT: 'update_product',
    DELETE_PRODUCT: 'delete_product',

    ADD_TOCART: 'add_to_cart',
    SHOW_CART_BYID:'show_cart_byId',
    DELETE_CART: 'delete_cart',
    DELETE_CART_BYID :'delete_cart_byProductId',

    CHECK_OUT: 'checkout_addToOrder',

    READ_ORDER: 'read_order',
    DELETE_ORDER: 'delete_order',
    UPDATE_ORDER: 'update_order',
    READ_ORDER_ITEM : 'read_order_item',
    HISTORY_ORDER:'history_order',

    PROCESS_PAYMENT : 'process_payment'


   
  }
  
  // Permissiion
  export const PermissionAssignment = {

    [Role.USER]: [
        
      // Permission.READ_USER,
      Permission.UPDATE_USER,
      Permission.GET_USER_BYID,

      Permission.BROWSE_PRODUCT,
      Permission.READ_PRODUCT,

      Permission.ADD_TOCART,
      Permission.SHOW_CART_BYID,
      Permission.DELETE_CART,
      Permission.DELETE_CART_BYID,

      Permission.CHECK_OUT,
      Permission.UPDATE_ORDER,
      Permission.HISTORY_ORDER,


      Permission.PROCESS_PAYMENT,
     
    ],
    
    [Role.SELLER]: [
      
      Permission.UPDATE_USER,
      Permission.GET_USER_BYID,


      // Permission PRODUCT
      Permission.READ_PRODUCT,
      Permission.CREATE_PRODUCT,
      Permission.BROWSE_PRODUCT,
      Permission.UPDATE_PRODUCT,
      Permission.DELETE_PRODUCT,

      Permission.READ_ORDER,
      Permission.DELETE_ORDER,
      Permission.READ_ORDER_ITEM
    ],

    [Role.ADMIN]: [
      Permission.READ_USER,
      Permission.GET_USER_BYID,
      Permission.CREATE_USER,
      Permission.UPDATE_USER,
      Permission.BROWSE_USER,
      Permission.DELETE_USER,

      // Permission PRODUCT
      Permission.READ_PRODUCT,
      Permission.CREATE_PRODUCT,
      Permission.BROWSE_PRODUCT,
      Permission.UPDATE_PRODUCT,
      Permission.DELETE_PRODUCT,

      Permission.READ_ORDER,
      Permission.DELETE_ORDER,
      Permission.READ_ORDER_ITEM,
      Permission.HISTORY_ORDER,

    ],
  
   
  }
