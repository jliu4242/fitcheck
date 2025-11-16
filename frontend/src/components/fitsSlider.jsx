import { react, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

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

    console.log("FitsCarousel fits:", fits);

    const renderEvent = (fit) => {
        return (
            <Card className="mt-1 flex-1 rounded-3xl overflow-hidden border-0 bg-slate-50 shadow-sm">
                <CardContent className="p-0 h-full">
                    <div className="relative w-full h-[380px]">
                        <Image
                            src={fit.image}
                            alt={fit.alt}
                            fill
                            className="object-cover"
                        />
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