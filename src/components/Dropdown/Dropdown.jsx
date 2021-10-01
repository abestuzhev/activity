import React, { useEffect, useRef, useState } from 'react';
import {ReactComponent as FocusableIconSVG} from '../../img/dots.svg';
import {ReactComponent as IconCheckSVG} from '../../img/check.svg';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { addColorCategory } from '../../redux/reducers/categoryReducer';

export default function Dropdown({conf}) {

    

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
    const dropdownRef = useRef();
    const {idCategory} = useParams(); 
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick)
    }, [])

    const dropdownHandler = () => {
        setToggle(!toggle);
    }

    const handleOutsideClick = (e) => {
        if(!e.path.includes(dropdownRef.current)) {
            setToggle(false);
        }
        
    }    

    const checkColorHandler = (colorItem) => {
        setColors([...colors.map(item => {
            // debugger
            return item.id === colorItem.id
                    ? {...item, checked: true}
                    : {...item, checked: false}
        })]);
        
        dispatch(addColorCategory({id:idCategory, color: colorItem.color}))
    }    

    return (
        <>
        <div className="c-component-menu" ref={dropdownRef}>
            <div className="c-focusable" style={{width: conf.width, height: conf.height}} onClick={dropdownHandler}>
                <FocusableIconSVG />                
            </div>
            
            {
                toggle && 
                <div className="c-dropdown" >
                    <div className="c-dropdown-body">
                        
                        <div className="c-dropdown-box">
                            <div className="c-dropdown-item">
                                <div className="c-dropdown-item__icon"></div>
                                <div className="c-dropdown-item__text">Add</div>
                                <div className="c-dropdown-item__arrow"></div>
                            </div>
                            <div className="c-dropdown-item">
                                <div className="c-dropdown-item__icon"></div>
                                <div className="c-dropdown-item__text">Rename</div>
                                <div className="c-dropdown-item__arrow"></div>
                            </div>
                            <div className="c-dropdown-item">
                                <div className="c-dropdown-item__icon"></div>
                                <div className="c-dropdown-item__text">Delete</div>
                                <div className="c-dropdown-item__arrow"></div>
                            </div>
                        </div>
                        <div className="c-dropdown-box">
                            <div className="c-dropdown-box__title">
                                <span>Color</span>
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
