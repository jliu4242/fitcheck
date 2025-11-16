"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FitsSlider({ items = [], onSlideChange }) {
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api) return;

    // initial
    const initialIndex = api.selectedScrollSnap();
    if (onSlideChange) onSlideChange(initialIndex);

    // on change
    const onSelect = () => {
      const index = api.selectedScrollSnap();
      if (onSlideChange) onSlideChange(index);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSlideChange]);

  const slides = items.length > 0 ? items : [{}];

  return (
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent>
        {slides.map((item, i) => {
          const imageSrc = item.image || item.avatar || "/fits/guy.jpg";

          return (
            <CarouselItem key={item.id ?? i}>
              <div className="relative border-[4px] border-[#1A3D2F] rounded-3xl overflow-hidden bg-[#f5ebd5] shadow-sm">
                <div className="aspect-[3/4] w-full">
                  <img
                    src={imageSrc}
                    alt={item.name || "Outfit"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {/* Prev / Next buttons */}
      <CarouselPrevious className="left-2 bg-white/90 text-[#1A3D2F] border border-[#AFC7B6]/70 shadow-sm hover:bg-white">
        ‹
      </CarouselPrevious>
      <CarouselNext className="right-2 bg-white/90 text-[#1A3D2F] border border-[#AFC7B6]/70 shadow-sm hover:bg-white">
        ›
      </CarouselNext>
    </Carousel>
  );
}
