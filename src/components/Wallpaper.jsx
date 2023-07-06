import Wallpaper1 from '../images/default.jpg'

export default function Wallpaper(){
    return (
        <div className='bg-center bg-no-repeat bg-cover h-full w-full transition-all duration-200' style={{ backgroundImage: `url('${Wallpaper1}')` }}></div>
    )
}