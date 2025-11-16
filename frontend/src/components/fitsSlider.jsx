import { react, useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useAuth } from '@/context/authContext';
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
    const { token } = useAuth();

    useEffect(() => {
        async function fetchData() {
        
            const res = await fetch("http://localhost:8000/api/posts/get-recent", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }

            var data = await res.json();
            console.log("Raw data:", data); // ← Check what this logs
            console.log("Is array?", Array.isArray(data)); // ← Check if it's an array

            setFits(data && data.map((item, index) => ({
                id: index + 1,
                image: item.image_url,
            })))
        }

        fetchData();
    }, [token]);

    const renderEvent = (fit) => {
        return (
            <Card className="">
                <CardContent className="p-0 flex flex-col space-y-4">
                    <div className="relative w-full h-[55dvh] overflow-hidden rounded-3xl">
                        <Image
                            src={fit.image}
                            alt="blank"
                            fill
                            className="object-fill p-1.5"
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