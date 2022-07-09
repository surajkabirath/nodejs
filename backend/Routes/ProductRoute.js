const express = require("express");
const {
  getAllProducts,
  createProduct,
  UpdateProduct,
  deleteProduct,
  getProductDetails,
} = require("../Controller/ProductController");
const { isAuthenticatedUser, authorizeRoles} = require("../Middleware/auth");
const router = express.Router();
router
  .route("/products")
  .get(isAuthenticatedUser,authorizeRoles("admin"),getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, UpdateProduct)
  .delete(isAuthenticatedUser, deleteProduct)
  .get(getProductDetails);

module.exports = router;
