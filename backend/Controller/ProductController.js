const Product = require("../Model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ApiFeatures = require("../Utils/apifeatures");
// create Product --admin
exports.createProduct = catchAsyncError (async (req, res, next) => {

  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// get all product

exports.getAllProducts =catchAsyncError (async (req, res) => {
  const resultPerPage = 10;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
  });
});
// Get product detail
exports.getProductDetails= catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
       return next(new ErrorHandler("Product is not found",404));
    }
    res.status(200).json({
        success:true,
       product,
       productCount
    })
});
// update product--admin
exports.UpdateProduct = catchAsyncError(async (req, res,next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product is not found",404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    success:true,
    product
  })
});
// DeleteProduct--admin
exports.deleteProduct= catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
      return next(new ErrorHandler("Product is not found",404));
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product is successfully deleted"
    })
});