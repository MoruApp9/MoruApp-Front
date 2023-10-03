import { useState } from "react"
import {uploadImageClaudinary} from "../services/services"

const PostProduct = () => {

  const handleOnChange = async (event) => {
    await uploadImageClaudinary(event) // esta función sube la imagen a claudinary y entrega la URL para mandarselo al back
    console.log(await uploadImageClaudinary(event)); //url creada mostrada en consola
  }
  
  return (
    <div>
      <form>
        <input
          type="file"
          name="file"
          placeholder="Sube tu imagen aquí"
          onChange={handleOnChange}
        />
      </form>
    </div>
  )
}

export default PostProduct;
