"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const fallbackImage = "/fits/guy.jpg";

export default function FitsCarousel({
  items = [],
  onSlideChange = () => {},
}) {
  const [api, setApi] = React.useState(null);

  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      // selectedScrollSnap() returns the current slide index (0-based)
      const idx = api.selectedScrollSnap?.();
      if (typeof idx === "number") {
        onSlideChange(idx);
      }
    };

    // run once when api is ready
    handleSelect();

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api, onSlideChange]);

  if (!items || items.length === 0) {
    return (
      <div className="w-full rounded-3xl border-[3px] border-[#1A3D2F] bg-[#E7EEE3] flex items-center justify-center aspect-[3/4]">
        <span className="text-sm text-gray-600">No outfits yet</span>
      </div>
    );
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: false }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, i) => {
          const imageSrc = item.image || item.avatar || fallbackImage;

          return (
            <CarouselItem key={item.id ?? i}>
              <div className="w-full h-[450px] relative rounded-3xl border-[3px] border-[#1A3D2F] overflow-hidden bg-[#E7EEE3]">
                <div className="aspect-[3/4] w-full">
                  <img
                    src={imageSrc}
                    alt={item.name || "Outfit"}
                    className="w-full h-full object-fill"
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
