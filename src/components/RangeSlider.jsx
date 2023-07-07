import './RangeSlider.scss';

export default function RangeSlider({ value, min, max, onClick, onInput }){
    return <input className='range' type='range' value={value} min={min} max={max} onClick={onClick} onInput={onInput}/>
}