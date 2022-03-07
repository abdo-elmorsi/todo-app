import React from "react";

export default function Update({ index, data, setdata, editSt, seteditSt }) {
    const HandleUpdate = (e) => {
        e.preventDefault();
        const newData = data[index];
        setdata([
            ...data.slice(0, index),
            {
                name: e.target.name.value || newData.name,
                price: e.target.price.value || newData.price,
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
                            name="name"
                            type="text"
                            className=""
                            placeholder={`✍️ Edit name...`}
                        />
                        <input
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
