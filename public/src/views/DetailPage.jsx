import { Link } from "react-router-dom";


export default function DetailPage() {
    return (
        <>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500 flex flex-col bg-base-100 my-6 items-center p-20">
    <h2 className="text-xl font-semibold text-green-500">Nasi Goreng Spesial</h2>
    <p className="text-gray-600 mt-4">
      Nasi goreng dengan campuran telur, ayam, dan bumbu rempah yang khas. Nikmati kelezatan dalam setiap suapan!
    </p>
    <p className="text-green-500 mt-2 font-bold">Rp 25,000</p>
  </div>
  <br />
        <Link to='/' className="btn btn-accent bg-green-500 items-center">Back</Link>
        </>
    )
}