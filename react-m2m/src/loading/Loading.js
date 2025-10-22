import imgload from './loading-white.svg'
import imgload_black from './loading-black.svg'
import './loading.css'

export default function Loading({on=true,color=1}){
    if (! on) return null;
    return <div><img src={color? imgload: imgload_black} className='Apploading'  alt='Apploading'/></div>
}