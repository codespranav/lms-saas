import Image from "next/image"
import Link from "next/link"

interface CompanionCardProps {
  id: string,
  name: string,
  topic: string,
  subject: string,
  duration: string,
  color: string
}
const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => {
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge rounded-sm">{subject}</div>
        <button className="companion-bookmark rounded-sm">
          <Image src="/icons/bookmark.svg" width={12.5} height={15} alt="bookmark companion" />
        </button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p>Topic: {topic}</p>

      <div className="flex items-center gap-2">
        <Image src="/icons/clock.svg" width={13.5} height={13.5} alt="duration" />
        <p className="text-sm">{duration} mins duration</p>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">Launch Lesson</button>
      </Link>
    </article>
  )
}

export default CompanionCard
