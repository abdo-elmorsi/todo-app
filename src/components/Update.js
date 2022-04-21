import React, { useContext, useState } from "react";
import { Tasks } from "../App";
export default function Update({ index, editSt, seteditSt }) {
    const [data, setdata] = useContext(Tasks);
    const newData = data[index];
    const [Name, setName] = useState(newData.name);
    const [Price, setPrice] = useState(newData.price);

    const HandleUpdate = (e) => {
        e.preventDefault();
        setdata([
            ...data.slice(0, index),
            {
                name: Name || newData.name,
                price: Price || newData.price,
                id: newData.id,
            },
            ...data.slice(index + 1),
        ]);
        seteditSt({
            index: "",
            isEdit: false,
        });
    };
    return (
        editSt.isEdit &&
        editSt.index === index && (
            <form onSubmit={(e) => HandleUpdate(e)}>
                <div className="update">
                    <div>
                        <input
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            type="text"
                            className=""
                            placeholder={`✍️ Edit name...`}
                            style={{ textTransform: "capitalize" }}
                        />
                        <input
                            value={Price}
                            onChange={(e) => setPrice(e.target.value)}
                            name="price"
                            type="text"
                            className=""
                            placeholder={`✍️ Edit price...`}
                        />
                    </div>
                    <input type="submit" value="update" />
                </div>
            </form>
        )
    );
}
