"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // ← your file

export default function FitsCarousel({ items = [], onSlideChange }) {
  const [api, setApi] = React.useState(null);

  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const idx = api.selectedScrollSnap();
      if (onSlideChange) onSlideChange(idx);
    };

    // fire once initially
    handleSelect();

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api, onSlideChange]);

  const fallbackImage = "/fits/guy.jpg";

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, i) => {
          const imageSrc = item.image || item.avatar || fallbackImage;

          return (
            <CarouselItem key={item.id ?? i}>
              <div className="w-full relative rounded-3xl border-[3px] border-[#1A3D2F] overflow-hidden bg-[#E7EEE3]">
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
    </Carousel>
  );
}
