"use client"

import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import { useRouter, useSearchParams } from "next/navigation"

const SubjectFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("subject") || ""

  const [subject, setSubject] = useState(query)

  useEffect(() => {
    let newUrl = ""
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      })
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject, // ✅ fixed
      })
    }
    router.push(newUrl, { scroll: false })
  }, [subject]) // ✅ depends on subject

  return (
    <div className="w-fit">
      <Select value={subject} onValueChange={setSubject}>
        <SelectTrigger className="relative border border-black rounded-lg px-2 h-fit ring-0 focus:ring-0 focus-visible:ring-0">
          <SelectValue placeholder="Select Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subjects</SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              <span className="capitalize">{subject}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SubjectFilter
