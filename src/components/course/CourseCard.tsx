import functional from "@/utils/functional";

// components/CourseCard.tsx
interface CourseCardProps {
  id: string,
  title: string;
  price: number;
  chapters: number;
  orders: number;
  reviews: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  price,
  chapters,
  orders,
  reviews,
}) => {

  const handleRoot=(key:string)=>{
    window.location.href="/teacher/courses/"+key
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 cursor-pointer" onClick={()=>{
      handleRoot(id)
    }}>
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div>
          <p className="text-2xl font-semibold">{functional.formatUSD(price)}</p>
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
        {/* <div>
            <p className="text-xl">{certificates}</p>
            <p className="text-gray-500">CERTIFICATES</p>
          </div> */}
        <div>
          <p className="text-xl">{reviews}</p>
          <p className="text-gray-500">REVIEWS</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;