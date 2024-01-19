import React, { useEffect, useRef, useState } from 'react';
import {ReactComponent as FocusableIconSVG} from '../../img/dots.svg';
import {ReactComponent as IconCheckSVG} from '../../img/check.svg';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import {addColorCategory, addCurrentCategory, removeCategory} from '../../redux/reducers/categoryReducer';
import useOutsideClick from "../../hooks/useOutsideClick";
import CategoryServices from "../../api/services/CategoryServices";
import CustomInput from "../../shared/Input";

export default function Dropdown({conf, currentCategory}) {

    

    const colorsState = [
        {id: 1, color: "rgba(206, 205, 202, 0.5)", name: "Default", checked: true},
        {id: 2, color: "rgba(155, 154, 151, 0.4)", name: "Gray", checked: false},
        {id: 3, color: "rgba(140, 46, 0, 0.2)", name: "Brown", checked: false},
        {id: 4, color: "rgba(245, 93, 0, 0.2)", name: "Orange", checked: false},
        {id: 5, color: "rgba(233, 168, 0, 0.2)", name: "Yellow", checked: false},
        {id: 6, color: "rgba(0, 135, 107, 0.2)", name: "Green", checked: false},
        {id: 7, color: "rgba(0, 120, 223, 0.2)", name: "Blue", checked: false},
        {id: 8, color: "rgba(103, 36, 222, 0.2)", name: "Purple", checked: false},
        {id: 9, color: "rgba(221, 0, 129, 0.2)", name: "Pink", checked: false},
        {id: 10, color: "rgba(255, 0, 26, 0.2)", name: "Red", checked: false},
    ];

    const [toggle, setToggle] = useState(false);
    const [colors, setColors] = useState(colorsState);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);


    const dropdownHideHandler = () => {
       setToggle(false);
    }
    const dropdownHandler = () => {
       setToggle(!toggle);
    }

    const checkColorHandler = async (colorItem) => {
        setColors([...colors.map(item => {
            return item.id === colorItem.id
                    ? {...item, checked: true}
                    : {...item, checked: false}
        })]);
        delete currentCategory.user
        const response = await CategoryServices.updateCategory({...currentCategory, color: colorItem.color})
        if(response) {
            dispatch(addColorCategory({id:response.id, color: colorItem.color}))
            dispatch(addCurrentCategory(response))
        }

    }

    const renameCurrentCategory = () => {
        // delete currentCategory.user
        // const response = await CategoryServices.updateCategory({...currentCategory, color: colorItem.color})
        // if(response) {
        //     dispatch(addColorCategory({id:response.id, color: colorItem.color}))
        //     dispatch(addCurrentCategory(response))
        // }
    }

    const removeCurrentCategory = async () => {
        await CategoryServices.removeCategory(currentCategory.id)
        dispatch(removeCategory(currentCategory.id))
        setToggle(false)
    }

    const dropdownRef = useOutsideClick(dropdownHideHandler);

    return (
        <>
        <div className="c-component-menu" ref={dropdownRef}>
            <div className="c-focusable" style={{width: conf.width, height: conf.height}} onClick={dropdownHandler}>
                <FocusableIconSVG />                
            </div>
            
            {
                toggle && 
                <div className="c-dropdown" style={{[conf.side]: 'auto'}}>
                    <div className="c-dropdown-body">
                        
                        <div className="c-dropdown-box">
                            <div className="c-dropdown-item" onClick={renameCurrentCategory}>
                                <div className="c-dropdown-item__icon"></div>
                                <div className="c-dropdown-item__text">Переименовать</div>
                                <div className="c-dropdown-item__arrow"></div>
                            </div>
                            <div className="c-dropdown-item" onClick={removeCurrentCategory}>
                                <div className="c-dropdown-item__icon"></div>
                                <div className="c-dropdown-item__text">Удалить</div>
                                <div className="c-dropdown-item__arrow"></div>
                            </div>
                        </div>
                        <div className="c-dropdown-box">
                            <div className="c-dropdown-box__title">
                                <span>Цвета</span>
                            </div>
                            <div className="c-dropdown-color">
                                {
                                    colors.map(item => {
                                        return (
                                        <div className="c-dropdown-color-card" key={item.id} onClick={() => checkColorHandler(item)}>
                                            <div className="c-dropdown-color-card__icon" style={{backgroundColor: item.color}}></div>
                                            <div className="c-dropdown-color-card__text"><span>{item.name}</span></div>
                                            {item.checked &&  <div className="c-dropdown-color-card__arrow"><IconCheckSVG /></div> }
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </div>
        
        </>
        
    )
}
