import { react, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import CommentBar from "@/components/ui/commentBar";

const initialFits = [
    {
        id: 1,
        image: '/fits/guy.jpg',
        alt: 'buff guy in white tanktop',
    },
    {
        id: 2,
        image: '/fits/basicgirl.jpg',
        alt: 'npc girl',
    },
    {
        id: 3,
        image: '/fits/man.jpg',
        alt: 'npc man',
    },
]


export default function fitsSlider() {
    const [fits, setFits] = useState(initialFits);

    const renderEvent = (fit) => {
        return (
            <Card className="">
                <CardContent className="p-0 flex flex-col space-y-4">
                    <div className="relative w-full h-[55dvh] overflow-hidden rounded-3xl">
                        <Image
                            src={fit.image}
                            alt={fit.alt}
                            fill
                            className="object-cover p-1.5"
                        />
                    </div>
                    <div className='pl-5 pr-5'>
                        <CommentBar/>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Carousel>
            <CarouselContent>
                {fits.map((fit) => (
                    <CarouselItem key={fit.id}>{renderEvent(fit)}</CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}