'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Category } from "../types/category";

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = () => console.log('kelaz');
    const [categories, setCategories] = useState<Category[]>([])
    console.log(errors);

    useEffect(() => {
        async function fetchData(){
            const res = await axios.get<Category[]>('https://api.escuelajs.co/api/v1/categories')
    
            setCategories(await res.data)
        }

        fetchData()
    }, [])

    useEffect(() => {
        console.log('Products updated:', categories)
    }, [categories])
  
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Title" {...register("Title", {required: true})} />
            <input type="number" placeholder="Price" {...register("Price", {required: true})} />
            <input type="text" placeholder="Description" {...register("Description", {required: true})} />
            <select {...register("Category", { required: true })}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id} className="text-black">
                        {category.name}
                    </option>
                ))}
            </select>
            <input type="url" placeholder="Image" {...register("Image", {required: true})} />

            <input type="submit" />
        </form>
    );
}