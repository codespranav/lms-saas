import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { recentSessions } from "@/constants"
import { cn, getSubjectColor } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
interface CompanionsListProps {
  title: string,
  companions?: Companion[]
  classNames?: string,
}
const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
  return (
    <article className={cn('companion-list', classNames)}>
      <h2 className="font-bold text-3xl">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration }) => (
            <TableRow key={subject}>
              <TableCell>
                <Link href={`/companions/${id}`}>
                  <div className="flex items-center gap-3">
                    <div className="size-[72px] flex items-center justify-center rounded-lg max:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                      <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={35}
                        height={35} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl">
                        {name}
                      </p>
                      <p className="text-lg">
                        {topic}
                      </p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                {/* Subject */}
                <div className="subject-badge w-fit hidden md:block">
                  {subject}
                </div>

                {/* Mobile devices */}
                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden">
                  <Image
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={18}
                    height={18}
                  />
                </div>
              </TableCell>
              {/* Duration */}
              <TableCell>
                <Link href={`/companions/${id}`}>{`${duration} mins`}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  )
}

export default CompanionsList
