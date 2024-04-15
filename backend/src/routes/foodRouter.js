import { Router } from "express";
import { addFoodToMenu, deleteFoodFromMenu, getFoodMenu, updateFoodMenu } from "../controllers/food.controller.js";




// Admin Permissions not yet added 
const router = Router();


// Admin Routes

router.route('/addItem').post(addFoodToMenu)
router.route('/deleteItem').delete(deleteFoodFromMenu)
router.route('/updateItem').put(updateFoodMenu)




// User Routes
router.route('/listMenu').get(getFoodMenu)


export default router;