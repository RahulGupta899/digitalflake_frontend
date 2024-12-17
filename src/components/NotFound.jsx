import { Link } from "react-router-dom"
const NotFound = () => {
  return (
    <div>
      <div className="block text-lg my-4 font-medium text-gray-600 text-center">
          Page Not Found
        </div>
      <Link to='/'>
        <button
          type="submit"
          className="w-full py-2 px-4 text-white bg-[#5C218B] hover:bg-[#5C218B] rounded-lg focus:ring-2 focus:ring-[#5C218B] focus:outline-none flex justify-center"
        >
          Back to Dashboard
        </button>
      </Link>
    </div>
  )
}

export default NotFound