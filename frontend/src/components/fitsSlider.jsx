import { react } from 'react';
import { Card, CardContent } from "@/components/ui/card";


export default function sampleFits() {

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


    const renderEvent = (event) => {
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
    }

    return (

    )
}