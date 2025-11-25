import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

export default function CategoriseCard() {

    const [category, setCategory] = useState([])

    useEffect(() => {
        async function GetCategorise() {
            const responce = await fetch("http://localhost:3333/categories/all")
            if (responce.ok) {
                const data = await responce.json()
                setCategory(data)
            }
        }
        GetCategorise()
    }, [])

    return (
        <div className="mb-20 pt-[26px] pl-[41px] pr-[41px]">

            <h2 className="text-[64px] font-bold mb-10">Categories</h2>

            <div className="grid grid-cols-4 gap-8 place-items-center">
                {
                    category.slice(0, 4).map(categ => (
                        <NavLink to={`/categories/${categ.id}`}>
                            <div key={categ.id} className="flex flex-col gap-4 items-center">
                                <div className="w-[280px] h-[300px]">
                                    <img
                                        src={`http://localhost:3333${categ.image}`}
                                        alt="Category image"
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                </div>
                                <p className="text-xl font-medium text-center">{categ.title}</p>
                            </div>
                        </NavLink>
                    ))
                }
            </div>

        </div>
    )
}
