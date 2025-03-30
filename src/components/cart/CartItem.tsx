interface CartItemProps {
    courseId: string;
    courseName: string;
    rating: number;
    lectureQuantity: number;
    price: number;
    urlAva: string;
    teacherName: string;
  }
  
  export default function CartItem({
    courseName,
    rating,
    lectureQuantity,
    price,
    urlAva,
    teacherName,
  }: CartItemProps) {
    return (
      <div className="flex items-center border p-4 rounded-lg">
        <img
          src={urlAva}
          alt={`${courseName} Thumbnail`}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="ml-4 flex-1">
          <h2 className="text-lg font-semibold">{courseName}</h2>
          <p className="text-sm text-gray-500">By {teacherName}</p>
          <p className="text-sm text-gray-500">
            {lectureQuantity} Lectures, Rated {rating.toFixed(1)} ★
          </p>
          <div className="flex space-x-4 mt-2">
            <button className="text-blue-500 hover:underline">Save for later</button>
            <button className="text-red-500 hover:underline">Remove</button>
          </div>
        </div>
        <p className="text-lg font-bold">${price.toFixed(2)}</p>
      </div>
    );
  }