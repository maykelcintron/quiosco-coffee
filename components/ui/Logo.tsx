import Image from "next/image"

const Logo = () => {
    return (
        <Image 
            width={250}
            height={250}
            src="/logo.svg"
            alt="logo"
            className="mb-8 object-cover p-5 mx-auto"
        />
    )
}

export default Logo
