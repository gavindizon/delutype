import React, { FC, useEffect } from "react";
import { FaGithub } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'
import Link from "next/link";

type Props = {
    name: string;
    imageURL: string;
    githubURL: string;
    linkedinURL: string;
};

const Researcher: FC<Props> = ({name, imageURL, githubURL, linkedinURL}) => {
  return (
    <div className="grid place-items-center gap-8 mb-8">
        <img className="rounded-full" src={imageURL} alt="" />
        <h3 className='font-medium text-lg text-center'>{name}</h3>

        <div className='grid grid-cols-2 gap-4 text-2xl'>
            <Link href={githubURL}>
                <a><FaGithub/></a>
            </Link>

            <Link href={linkedinURL}>
                <a><BsLinkedin/></a>
            </Link>
        </div>
    </div>
  )
}

export default Researcher;