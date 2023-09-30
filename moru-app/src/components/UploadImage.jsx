import { useState } from "react"
import { uploadImageClaudinary } from "../services/services"

const PublishProduct = () => {
  const [image, setImage] = useState("")
  const [loading, setloading] = useState(false)

  const uploadImage = async (event) => {
    await uploadImageClaudinary(event)

    const files = event.target.files
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "storeImages")
    setloading(true)

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsgvvje7v/image/upload",
      {
        method: "POST",
        body: data,
      }
    )
    const file = await res.json()
    //console.log(res)
    setImage(file.secure_url)
    console.log(file.secure_url)
    setloading(false)
  }

  return (
    <div>
      <input
        type="file"
        name="file"
        placeholder="Sube tu imagen aquí"
        onChange={uploadImage}
        
      />
      {loading ? (
        <h3>Cargando imagenes...</h3>
      ) : (
        <img src={image} className="max-w-xs" />
      )}
    </div>
  )
}

export default PublishProduct
