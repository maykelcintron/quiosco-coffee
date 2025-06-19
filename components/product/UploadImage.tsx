"use client"

import { getImagePathCloudinary } from "@/utils/getImagePathCloudinary"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from 'react-icons/tb'

type UploadImageProps = {
    image?: string | undefined
}

const UploadImage = ({ image }: UploadImageProps) => {
    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget 
            onSuccess={(result, {widget}) => {
                if(result.event === 'success') {
                    widget.close()
                    // @ts-ignore*
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset="jxz0b6z4"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return <>
                    <div className="space-y-3">
                        <label className="text-slate-800">Imagen Producto</label>
                        <p className="text-sm text-slate-500 mt-2">Sube una imagen del producto</p>
                        <div className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-200"
                            onClick={() => open()}
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className="text-lg font-semibold">Agregar Imagen</p>
                            {imageUrl && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        src={imageUrl}
                                        alt="Imagen de Producto"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageUrl && (
                        <div className="space-y-2">
                            <div>
                                <label>Imagen Actual:</label>
                                <div className="relative w-64 h-64 mt-5">
                                    <Image 
                                        fill
                                        src={getImagePathCloudinary(image)}
                                        alt="Imagen Producto"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <input 
                        type="hidden" 
                        name="image"
                        value={imageUrl? imageUrl : image}
                    />
                </>
            }}
        </CldUploadWidget>
    )
}

export default UploadImage
