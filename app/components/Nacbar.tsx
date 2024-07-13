import Link from "next/link"
import { ModeToggle } from "./ModeToggle"
import LikeButton from "./Like"

const Navbar=()=>{
return (
    <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
<Link href='/' className="font-bold text-3xl">
GuoDaXia <span className="text-primary">Blog</span>
</Link>
<div style={{position:'absolute', right:'70px'}}> 
<LikeButton/>
</div>

<ModeToggle/>
    </nav>
)
}



export default Navbar