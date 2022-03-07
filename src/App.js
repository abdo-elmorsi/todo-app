import React, { useState, useEffect } from "react";
import "./App.css";
import { BsTrash } from "react-icons/bs";
import { FaPlusSquare, FaPencilAlt } from "react-icons/fa";
import UpdateItem from "./components/Update";
export default function App() {
    const [name, setName] = useState("");
    const [price, setprice] = useState("15");
    const [data, setdata] = useState([]);
    const [editSt, seteditSt] = useState({
        isEdit: false,
        index: 1,
    });
    const fetch = () => {
        let Courses = JSON.parse(localStorage.getItem("courses") || "{}");
        return Courses;
    };
    // fetch data from locale
    useEffect(() => {
        setdata(fetch().data || []);
        setprice(fetch().price || "15");
    }, []);

    // save data in locale
    useEffect(() => {
        localStorage.setItem(
            "courses",
            JSON.stringify({
                data,
                price,
            })
        );
    }, [data, price]);

    // save the data
    const handleSubmt = (e) => {
        e.preventDefault();
        if (name.trim().length < 3) {
            return false;
        } else if (data?.length === 0) {
            setdata([{ name, price, id: Math.random().toString(26).slice(2) }]);
        } else {
            setdata([
                ...data,
                { name, price, id: Math.random().toString(26).slice(2) },
            ]);
            setName("");
        }
    };
    // handle price
    const handlePrice = () => {
        const newPrice = prompt("What is the new price", price) || price;
        setprice(newPrice);
    };

    // clear All
    const clearAll = () => {
        setdata([]);
    };
    // clear Item
    const clearItem = (e, i) => {
        let newData = data;
        const parent = e.target.parentElement;
        parent.classList.add("fall");
        setTimeout(() => {
            newData.splice(i, 1);
            setdata([...newData]);
        }, 1000);
    };

    return (
        <div className="container">
            <header>My Todo List</header>
            <form onSubmit={(e) => handleSubmt(e)}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="todo-input"
                    placeholder={`✍️ Add item...`}
                />
                <button
                    onDoubleClick={() => handlePrice()}
                    className="todo-button"
                    type="submit"
                >
                    <span>{price}</span>
                    <FaPlusSquare />
                </button>
            </form>
            <div className="clear-all">
                {data?.length > 1 && (
                    <>
                        <button title="Total price" className="trash-btn">
                            {"Total = " +
                                data
                                    ?.map((ele) => ele.price)
                                    ?.reduce(
                                        (a, b) => parseInt(a) + parseInt(b),
                                        0
                                    )}
                        </button>
                        <button
                            onClick={clearAll}
                            title="Clear all"
                            className="trash-btn"
                        >
                            <BsTrash />
                        </button>
                    </>
                )}
            </div>
            <div className="todo-container">
                <ul className="todo-list">
                    {data?.length ? (
                        data?.map((ele, i) => {
                            return (
                                <React.Fragment key={ele.id}>
                                    <div className="todo">
                                        <li className="todo-item">
                                            <span>{ele?.name}</span>
                                            <span>/</span>
                                            <span>{ele?.price}</span>
                                        </li>
                                        <button
                                            onClick={() => {
                                                seteditSt({
                                                    isEdit: !editSt.isEdit,
                                                    index: i,
                                                });
                                            }}
                                            title="Edit item"
                                            className="edit-btn"
                                        >
                                            <FaPencilAlt />
                                        </button>
                                        <button
                                            onClick={(e) => clearItem(e, i)}
                                            title="Clear item"
                                            className="trash-btn"
                                            style={{
                                                zIndex: 2,
                                                position: "relative",
                                            }}
                                        >
                                            <BsTrash
                                                onClick={(event) =>
                                                    event.stopPropagation()
                                                }
                                            />
                                        </button>
                                    </div>
                                    {true && (
                                        <UpdateItem
                                            data={data}
                                            setdata={setdata}
                                            editSt={editSt}
                                            seteditSt={seteditSt}
                                            index={i}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <h3>Sorry there is not data</h3>
                    )}
                </ul>
            </div>
        </div>
    );
}
