import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Toastify from "toastify-js"


export default function UploadImage({ base_url }) {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [imageUpload, setImageUpload] = useState({})
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()

    async function fetchImage() {
        try {
            const { data } = await axios.get(`${base_url}/apis/restaurant-app/cuisines/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            // console.log(data.data);
            setName(data.data.name)
            setImgUrl(data.data.imgUrl)
        } catch (error) {
            console.log(error);
        }
    }


    async function handleSelectImage(e) {
        try {
            e.preventDefault()
            const image = e.target.files[0]
            setImageUpload(image)
            if(image) {
                const imgUrl = URL.createObjectURL(image)
                setImgUrl(imgUrl)
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async function handleSubmit(e) {
        try {
            setUploading(true)
            e.preventDefault()
            const formData = new FormData ()
            formData.append("file", imageUpload)

            const { data } = await axios.patch(`${base_url}/apis/restaurant-app/cuisines/${id}`, formData,{
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            Toastify({
                text: `${data.message}`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "#008000",
                },
                onClick: function () {}, // Callback after click
              }).showToast();
        
              navigate("/");
            
        } catch (error) {
            Toastify({
                text: error.response.data.error,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "#FF0000",
                },
                onClick: function () {}, // Callback after click
              }).showToast();
        }
    }

    useEffect(() => {
        fetchImage()
    }, [id])

    return(
        <>
  <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {name || "Upload Image"}
      </h1>

      <div className="flex justify-center mb-6">
        <img
          src={imgUrl || "https://via.placeholder.com/150"}
          alt="Product"
          className="w-48 h-48 object-cover rounded-md shadow-sm"
        />
      </div>

      <form className="space-y-4">
        <input
          type="file"
          accept="image/*"
          name="file"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          onChange={(e) => handleSelectImage(e)}
        />

        <button
          onClick={(e) => handleSubmit(e)}
          className="w-full bg-green-500 text-white font-medium py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Save Image
        </button>
      </form>
    </div>
  </div>
</>
    )
}