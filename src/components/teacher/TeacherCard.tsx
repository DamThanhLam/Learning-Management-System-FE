import Image from 'next/image'

interface TeacherCardProps {
  name: string
  // expertise: string;
  rating: number
  students: number
  urlAva: string
}

export default function TeacherCard({ name, rating, students, urlAva }: TeacherCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 text-center shadow-md">
      <Image
        src={urlAva} // Use urlAva for the image source
        alt={name}
        className="w-24 h-24 mx-auto rounded-full"
        width={96}
        height={96}
      />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      {/* <p className="text-gray-500">{expertise}</p> */}
      <p className="text-yellow-500">
        {'⭐'.repeat(Math.round(rating))} {rating}
      </p>
      <p className="text-gray-500">{students} Students</p>
    </div>
  )
}
