import React, { useContext } from "react";
import UpdateItem from "./Update";
import { FaPencilAlt } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { Update } from "../App";

function Todos({ item, i, provided, snapshot, clearItem }) {
    const [editSt, seteditSt] = useContext(Update);
    return (
        <div
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div
                onDoubleClick={(e) => {
                    e.preventDefault();
                    seteditSt({
                        isEdit: !editSt.isEdit,
                        index: i,
                    });
                }}
                className="todo"
            >
                <li className="todo-item">
                    <span style={{ textTransform: "capitalize" }}>
                        {item?.name}
                    </span>
                    <span>/</span>
                    <span>{item?.price}</span>
                </li>
                <div className="controls">
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
                        <BsTrash />
                    </button>
                </div>
            </div>
            <UpdateItem editSt={editSt} seteditSt={seteditSt} index={i} />
        </div>
    );
}

export default Todos;

/* <h3>Sorry there is not data</h3> */
