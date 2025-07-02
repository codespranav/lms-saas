"use client"
import { formUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('')

    useEffect(()=>{
      if(searchQuery){
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
        
        router.push(newUrl, {scroll: false});
      } 
    }, [searchQuery, searchParams, pathName])
  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src=  '/icons/search.svg' alt="Search" width={15} height={15}/>
      <input type="text" 
      placeholder="Search companions ..."
      value={searchQuery}
      onChange={(e)=>{setSearchQuery(e.target.value)}}
      />
    </div>
  )
}

export default SearchInput
