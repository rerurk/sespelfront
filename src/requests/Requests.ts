
const domen ="http://192.168.1.95"

export enum Requests {

    MAIN_DOMAIN = "http://192.168.1.95:3001",
    IMAGES_REQUEST = "https://rerurk.ru/",
    GET_PRODUCT_MAP = "http://192.168.1.95:3001/getProductMap",
    GET_ALL_PRODUCT_MAP = "http://192.168.1.95:3001/getAllProductMap",
    GET_PACKAGES = "http://192.168.1.95:3001/getProductsPackages",
    GET_PREPARATION_PLACES = "http://192.168.1.95:3001/getFoodPreparationPlaces",
    GET_DELIVERY_LOCATIONS = "http://192.168.1.95:3001/getActiveDeliveryLocations",
    GET_PAYMENT_TYPES = "http://192.168.1.95:3001/getPaymentTypes",
    POST_NEW_ORDER = "http://192.168.1.95:3001/newOrder",
    UPDATE_PRODUCT = "http://192.168.1.95:3001/updateProduct",
    UPDATE_CATEGORY = "http://192.168.1.95:3001/updateCategory",
    SAVE_NEW_PRODUCT="http://192.168.1.95:3001/saveNewProduct",
    SAVE_PRODUCTS_POSITIONS_IN_CATEGORIES="http://192.168.1.95:3001/saveProductPositionsInCategory",


}