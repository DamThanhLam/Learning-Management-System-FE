// components/CourseCard.tsx
interface CourseCardProps {
    title: string;
    price: string;
    chapters: number;
    orders: number;
    certificates: number;
    reviews: number;
  }
  
  const CourseCard: React.FC<CourseCardProps> = ({
    title,
    price,
    chapters,
    orders,
    certificates,
    reviews,
  }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 ">
        <h3 className="text-lg font-bold mt-2">{title}</h3>
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <p className="text-2xl font-semibold">{price}</p>
            <p className="text-gray-500">PRICE</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">{chapters}</p>
            <p className="text-gray-500">CHAPTERS</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">{orders}</p>
            <p className="text-gray-500">ORDERS</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <p className="text-xl">{certificates}</p>
            <p className="text-gray-500">CERTIFICATES</p>
          </div>
          <div>
            <p className="text-xl">{reviews}</p>
            <p className="text-gray-500">REVIEWS</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default CourseCard;