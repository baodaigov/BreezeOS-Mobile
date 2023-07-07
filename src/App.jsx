import Wallpaper from "./components/Wallpaper";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
    return (
        <div className='h-screen w-full max-w-md select-none cursor-default'>
            <div className='relative h-full'>
                <Wallpaper />
                <div className='absolute top-0 overflow-hidden h-full w-full flex flex-col'>
                    <Header/>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}