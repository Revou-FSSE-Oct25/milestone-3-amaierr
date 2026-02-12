'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Category } from "../../types/category";
import { useRouter } from "next/navigation";

function AddProductPage() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const router = useRouter();
    const onSubmit = () => {
        axios.post('https://api.escuelajs.co/api/v1/products/', {
            title: getValues("Title"),
            price: getValues("Price"),
            description: getValues("Description"),
            categoryId: getValues("Category"),
            images: getValues(["Image"])
        }).then( () => {
            router.push('/products');
        }).catch( (error) => {
            console.log(error.message)
        })
    }
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        async function fetchData(){
            const res = await axios.get<Category[]>('https://api.escuelajs.co/api/v1/categories')
    
            setCategories(await res.data)
        }

        fetchData()
    }, [])
  
  
    return <>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto mt-10 space-y-6 rounded-2xl bg-zinc-900/80 p-8 shadow-2xl backdrop-blur"
        >
            <h2 className="text-2xl font-semibold text-white">
                Create Product
            </h2>

            {/* Title */}
            <div className="relative">
                <input
                    type="text"
                    {...register("Title", { required: "Title is required" })}
                    placeholder=" "
                    className={`peer w-full rounded-lg bg-zinc-800 border px-4 pt-6 pb-2 text-white outline-none transition
                        ${errors.Title
                        ? "border-red-500 focus:ring-red-500"
                        : "border-zinc-700 focus:border-white focus:ring-white"}
                    `}
                />
                <label className="absolute left-4 top-2 text-sm text-zinc- transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
                    Title
                </label>
                {errors.Title && (
                    <p className="mt-1 text-sm text-red-500">
                        {`${errors.Title.message}`}
                    </p>
                )}
            </div>

            {/* Price */}
            <div className="relative">
                <input
                    type="number"
                    {...register("Price", {
                        required: "Price is required",
                        min: { value: 1, message: "Price must be greater than 0" }
                    })}
                    placeholder=" "
                    className={`peer w-full rounded-lg bg-zinc-800 border px-4 pt-6 pb-2 text-white outline-none transition no-spinner
                        ${errors.Price
                        ? "border-red-500 focus:ring-red-500"
                        : "border-zinc-700 focus:border-white focus:ring-white"}
                    `}
                />
                <label className="absolute left-4 top-2 text-sm text-zinc- transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
                    Price
                </label>
                {errors.Price && (
                    <p className="mt-1 text-sm text-red-500">
                        {`${errors.Price.message}`}
                    </p>
                )}
            </div>

            {/* Description */}
            <div className="relative">
                <textarea
                    rows={4}
                    {...register("Description", { required: "Description is required" })}
                    placeholder=" "
                    className={`peer w-full resize-none rounded-lg bg-zinc-800 border px-4 pt-6 pb-2 text-white outline-none transition
                        ${errors.Description
                        ? "border-red-500 focus:ring-red-500"
                        : "border-zinc-700 focus:border-white focus:ring-white"}
                    `}
                />
                <label className="absolute left-4 top-2 text-sm text-zinc-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
                    Description
                </label>
                {errors.Description && (
                    <p className="mt-1 text-sm text-red-500">
                        {`${errors.Description.message}`}
                    </p>
                )}
            </div>

            {/* Category */}
            <div>
                <select
                    {...register("Category", { required: "Category is required" })}
                    className={`w-full rounded-lg bg-zinc-800 border px-4 py-3 text-white outline-none transition
                        ${errors.Category
                        ? "border-red-500"
                        : "border-zinc-700 focus:border-white focus:ring-1 focus:ring-white"}
                    `}
                >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                        {category.name}
                        </option>
                    ))}
                </select>
                {errors.Category && (
                    <p className="mt-1 text-sm text-red-500">
                        {`${errors.Category.message}`}
                    </p>
                )}
            </div>

            {/* Image URL */}
            <div className="relative">
                <input
                    type="url"
                    {...register("Image", {
                        required: "Image URL is required",
                        pattern: {
                        value: /^(https?:\/\/).+/,
                        message: "Enter a valid URL"
                        }
                    })}
                    placeholder=" "
                    className={`peer w-full rounded-lg bg-zinc-800 border px-4 pt-6 pb-2 text-white outline-none transition
                        ${errors.Image
                        ? "border-red-500 focus:ring-red-500"
                        : "border-zinc-700 focus:border-white focus:ring-white"}
                    `}
                />
                <label className="absolute left-4 top-2 text-sm text-zinc-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
                    Image URL
                </label>
                {errors.Image && (
                    <p className="mt-1 text-sm text-red-500">
                        {`${errors.Image.message}`}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
            >
                Create Product
            </button>
        </form>
    </>
}

export default AddProductPage