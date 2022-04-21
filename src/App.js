import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { FaPlusSquare } from "react-icons/fa";
import Todos from "./components/Item";
export const Tasks = React.createContext();
export const Update = React.createContext();

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
        const { data, price } = fetch();
        setdata(data || []);
        setprice(price || "15");
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
        document.querySelector(".todo-input").focus();
        if (name.trim().length < 3) {
            return false;
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
    const clearAll = () => setdata([]);
    // clear Item
    const clearItem = (_, i) => {
        let newData = data;
        newData.splice(i, 1);
        setdata([...newData]);
    };

    // drag and drop

    const onDragEnd = (result) => {
        const newItems = Array.from(data);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result?.destination?.index, 0, removed);
        setdata(newItems);
    };

    return (
        <Tasks.Provider value={[data, setdata]}>
            <Update.Provider value={[editSt, seteditSt]}>
                <div className="container">
                    <header>My Todo List</header>
                    {/* form */}
                    <form onSubmit={(e) => handleSubmt(e)}>
                        <input
                            value={name}
                            name="item_name"
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
                    {/* title info */}
                    <div className="clear-all">
                        {data?.length > 1 && (
                            <>
                                <button title="Total price" className="Total">
                                    {"Total = " +
                                        data
                                            ?.map((ele) => ele.price)
                                            ?.reduce(
                                                (a, b) =>
                                                    parseInt(a) + parseInt(b),
                                                0
                                            )}
                                </button>
                                <button
                                    onClick={clearAll}
                                    title="Clear all"
                                    className="trash-btn"
                                >
                                    Clear all
                                </button>
                            </>
                        )}
                    </div>
                    {/* todos */}
                    <div className="todo-container">
                        <ul className="todo-list">
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {data.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <Todos
                                                            provided={provided}
                                                            snapshot={snapshot}
                                                            item={item}
                                                            i={index}
                                                            clearItem={
                                                                clearItem
                                                            }
                                                        />
                                                    )}
                                                </Draggable>
                                            ))}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </ul>
                    </div>
                </div>
            </Update.Provider>
        </Tasks.Provider>
    );
}
