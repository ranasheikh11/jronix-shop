import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const Edit = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [price, setPrice] = useState("");
    const [sizes, setSizes] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchProductData = async () => {
        try {
            const response = await axios.post(backendUrl + "/api/product/single", { productId: id });
            if (response.data.success) {
                const product = response.data.product;
                setName(product.name);
                setDescription(product.description);
                setCategory(product.category);
                setSubCategory(product.subCategory);
                setPrice(product.price);
                setSizes(product.sizes);
                setBestSeller(product.bestSeller);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to fetch product data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [id]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("id", id);
            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("price", price);
            formData.append("sizes", JSON.stringify(sizes));
            formData.append("bestSeller", bestSeller);

            const response = await axios.post(
                backendUrl + "/api/product/update",
                formData,
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/list");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong during update");
        }
    };

    if (loading) return <div className="text-center py-20">Loading product data...</div>;

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-start w-full gap-4 max-w-4xl bg-white p-8 rounded-2xl border border-pink-100 shadow-sm"
        >
            <p className="text-2xl font-bold text-pink-dark mb-4">Edit Product</p>

            <div>
                <p className="mb-2 font-semibold text-gray-700">Update Images (Leave empty to keep existing)</p>
                <div className="flex gap-3">
                    {[setImage1, setImage2, setImage3, setImage4].map((setter, idx) => (
                        <label key={idx} htmlFor={`image${idx + 1}`}>
                            <div className="w-24 h-24 border-2 border-dashed border-pink-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-pink-50 transition-all overflow-hidden bg-pink-50/20">
                                <img
                                    className="w-full h-full object-cover"
                                    src={eval(`image${idx + 1}`) ? URL.createObjectURL(eval(`image${idx + 1}`)) : assets.upload_area}
                                    alt={`Upload ${idx + 1}`}
                                />
                            </div>
                            <input onChange={(e) => setter(e.target.files[0])} type="file" id={`image${idx + 1}`} hidden accept="image/*" />
                        </label>
                    ))}
                </div>
            </div>

            <div className="w-full">
                <p className="mb-2 font-semibold text-gray-700">Product Name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full px-4 py-3 border border-pink-100 rounded-xl outline-pink-dark focus:ring-2 focus:ring-pink-100 transition-all"
                    type="text"
                    placeholder="e.g. Premium Silk Scarf"
                    required
                />
            </div>

            <div className="w-full">
                <p className="mb-2 font-semibold text-gray-700">Product Description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full px-4 py-3 border border-pink-100 rounded-xl outline-pink-dark focus:ring-2 focus:ring-pink-100 transition-all min-h-[120px]"
                    placeholder="Detailed description of the product"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div>
                    <p className="mb-2 font-semibold text-gray-700">Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="w-full px-4 py-3 border border-pink-100 rounded-xl outline-pink-dark appearance-none bg-white"
                        required
                    >
                        <option value="">Select</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2 font-semibold text-gray-700">Sub Category</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        value={subCategory}
                        className="w-full px-4 py-3 border border-pink-100 rounded-xl outline-pink-dark appearance-none bg-white"
                        required
                    >
                        <option value="">Select</option>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2 font-semibold text-gray-700">Price</p>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className="w-full px-4 py-3 border border-pink-100 rounded-xl outline-pink-dark"
                        type="number"
                        placeholder="0.00"
                        required
                    />
                </div>
            </div>

            <div>
                <p className="mb-3 font-semibold text-gray-700">Stock Sizes</p>
                <div className="flex gap-3">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <div
                            key={size}
                            onClick={() =>
                                setSizes((prev) =>
                                    prev.includes(size)
                                        ? prev.filter((item) => item !== size)
                                        : [...prev, size]
                                )
                            }
                            className={`${sizes.includes(size)
                                ? "bg-pink-dark text-white border-pink-dark"
                                : "bg-white border-pink-100 text-gray-600 hover:bg-pink-50"
                                } px-5 py-2 cursor-pointer border rounded-full transition-all font-medium text-sm`}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-pink-50/50 rounded-xl border border-pink-100 w-full md:w-auto">
                <input
                    type="checkbox"
                    id="bestSeller"
                    className="w-5 h-5 accent-pink-dark cursor-pointer"
                    checked={bestSeller}
                    onChange={() => setBestSeller((prev) => !prev)}
                />
                <label htmlFor="bestSeller" className="cursor-pointer font-medium text-gray-700 select-none">
                    Feature in Best Sellers Selection
                </label>
            </div>

            <div className="flex gap-4 w-full mt-6">
                <button
                    type="submit"
                    className="flex-1 md:flex-none px-12 py-4 bg-pink-dark text-white rounded-xl shadow-lg hover:bg-pink-900 transition-all font-bold tracking-wide"
                >
                    UPDATE PRODUCT
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/list")}
                    className="flex-1 md:flex-none px-12 py-4 border border-pink-200 text-pink-dark rounded-xl hover:bg-pink-50 transition-all font-bold tracking-wide"
                >
                    CANCEL
                </button>
            </div>
        </form>
    );
};

export default Edit;
