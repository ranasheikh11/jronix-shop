import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// INFO: Route for adding a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const productImages = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );

    let imageUrls = [];

    // Check Cloudinary config
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_SECRET_KEY) {
      imageUrls = await Promise.all(
        productImages.map(async (image) => {
          let result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    } else {
      // INFO: Fallback to placeholder if Cloudinary is not configured
      console.warn("Cloudinary not configured. Using placeholder images.");
      imageUrls = productImages.map(() => "https://via.placeholder.com/500?text=Product+Image");

      // If no images were uploaded at all, provide at least one placeholder
      if (imageUrls.length === 0) {
        imageUrls = ["https://via.placeholder.com/500?text=Jeronix+Shop"];
      }
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added" });
  } catch (error) {
    console.log("Error while adding product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for fetching all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error while fetching all products: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for removing a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log("Error while removing product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for fetching a single product
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error while fetching single product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for updating a product
const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const updateData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" || bestSeller === true ? true : false,
    };

    // Handle new images if provided
    if (req.files) {
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];

      const productImages = [image1, image2, image3, image4].filter(
        (image) => image !== undefined
      );

      if (productImages.length > 0) {
        if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_SECRET_KEY) {
          let imageUrls = await Promise.all(
            productImages.map(async (image) => {
              let result = await cloudinary.uploader.upload(image.path, {
                resource_type: "image",
              });
              return result.secure_url;
            })
          );
          updateData.image = imageUrls;
        } else {
          // INFO: Fallback to placeholder if Cloudinary is not configured during update
          console.warn("Cloudinary not configured during update. Using placeholder images.");
          updateData.image = productImages.map(() => "https://via.placeholder.com/500?text=Updated+Product+Image");
        }
      }
    }

    await productModel.findByIdAndUpdate(id, updateData);

    res.status(200).json({ success: true, message: "Product updated" });
  } catch (error) {
    console.log("Error while updating product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, getSingleProduct, updateProduct };
