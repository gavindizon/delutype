import React, { FC, Fragment } from "react";
import Image from "next/image";
import { FaGithub } from 'react-icons/fa'
import { BsLinkedin, BsGlobe } from 'react-icons/bs'
import Link from "next/link";

type Props = {
    name: string;
    imageURL: string;
    githubURL?: string;
    linkedInURL?: string;
    websiteURL?: string;
};

const Researcher: FC<Props> = (values) => {
  return (
    <div className="grid place-items-center gap-8 mb-8 w-fit">
         <div className="rounded-full overflow-hidden relative w-32 h-32 sm:w-48 sm:h-48 md:w-32 md:h-32 lg:w-44 lg:h-44">
            <Image
                src={values.imageURL}
                alt="404"
                objectFit="contain"
                objectPosition={"center"}
                layout="fill"
            />
        </div>
        <h3 className='font-medium text-lg text-center'>{values.name}</h3>

        <div className='flex justify-center space-x-4 text-2xl w-3/4'>
            <Fragment>
                {values.linkedInURL && (
                    <Link href={values.linkedInURL}>
                        <a target="_blank"><BsLinkedin/></a>
                    </Link>
                )}
            </Fragment>
            <Fragment>
                {values.githubURL && (
                    <Link href={values.githubURL}>
                        <a target="_blank"><FaGithub/></a>
                    </Link>
                )}
            </Fragment>
            <Fragment>
                {values.websiteURL && (
                    <Link href={values.websiteURL}>
                        <a target="_blank"><BsGlobe/></a>
                    </Link>
                )}
            </Fragment>
        </div>
    </div>
  )
}

export default Researcher;