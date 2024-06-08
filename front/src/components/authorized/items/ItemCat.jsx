import React, { useEffect, useState } from "react";
import ItemCatItem from "./ItemCatItem";

function ItemCat(props){
    const [items, setItems] = useState(props.itemsTypes);
    useEffect(() => {
        setItems(props.itemsTypes);
    }, [props.itemsTypes]);
    function addNew(){
        const newItem = {
            type_id: "",
            type_name: "",
            type_descr: "",
            type_flag: "-1"
        };
        setItems([...items, newItem]);
    }

    const updateCategoryItem = (updatedItem) => {
        const index = items.findIndex(item => item.type_id == updatedItem.type_id);
    
        if (index !== -1) {
            let updatedItems = [...items];
            updatedItems[index] = updatedItem;
            setItems(updatedItems);
            props.onUpdateCategories(updatedItems)
        } else {
            const filteredItems = items.filter(item => item.type_flag !== '-1');
            setItems([...filteredItems, updatedItem]);
            props.onUpdateCategories([...filteredItems, updatedItem]);
        }
    };

    return(
        <span>
            <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target={`#categories`}>
                Категории
            </button>
            <div className="modal fade text-dark" id={`categories`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Категории</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Название</th>
                                        <th scope="col">Описание</th>
                                        <th scope="col">Статус</th>
                                        <th scope="col">Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => 
                                        <ItemCatItem key={index} item={item} onUpdateItem={(updatedItem) => updateCategoryItem(updatedItem, index)}/> // Передача ключа для каждого элемента
                                    )} 
                                </tbody>
                            </table> 
                            <button type="button" className="btn btn-secondary" onClick={() => addNew()}>Добавить</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    );
}

export default ItemCat;
