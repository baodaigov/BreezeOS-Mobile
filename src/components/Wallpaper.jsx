import { useSelector } from "react-redux"

export default function Wallpaper(){
    const wallpaper = useSelector(state => state.global.wallpaper);

    return (
        <div className='bg-center bg-no-repeat bg-cover h-screen w-full transition-all duration-200' style={{ backgroundImage: `url('${wallpaper}')` }}></div>
    )
}