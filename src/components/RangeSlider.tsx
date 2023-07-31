import React from 'react';
import './RangeSlider.scss';

interface RangeSliderProps {
    value?: string | number
    min?: string | number
    max?: string | number
    onClick?: React.MouseEventHandler<HTMLInputElement>
    onInput?: React.FormEventHandler<HTMLInputElement>
}

export default function RangeSlider({ value, min = 0, max = 100, onClick, onInput }: RangeSliderProps){
    return <input className='range' type='range' value={value} min={min} max={max} onClick={onClick} onInput={onInput}/>
}