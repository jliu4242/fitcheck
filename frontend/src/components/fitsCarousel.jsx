"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAuth } from "@/context/authContext";

const fallbackImage = "/fits/guy.jpg";

export default function FitsCarousel({
  onSlideChange = () => {},
}) {
  const [api, setApi] = useState(null);
  const [fits, setFits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/api/posts/get-recent", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await res.json();
        console.log("Raw data:", data);
        console.log("Is array?", Array.isArray(data));

        if (Array.isArray(data)) {
          setFits(data.map((item, index) => ({
            id: item.id || index + 1,
            image: item.image_url,
            name: item.caption || `Outfit ${index + 1}`,
          })));
        } else {
          console.error("Data is not an array:", data);
          setFits([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setFits([]);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const idx = api.selectedScrollSnap?.();
      if (typeof idx === "number") {
        onSlideChange(idx);
      }
    };

    handleSelect();

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api, onSlideChange]);

  if (loading) {
    return (
      <div className="w-full rounded-3xl border-[3px] border-[#1A3D2F] bg-[#E7EEE3] flex items-center justify-center aspect-[3/4]">
        <span className="text-sm text-gray-600">Loading outfits...</span>
      </div>
    );
  }

  if (!fits || fits.length === 0) {
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
        {fits.map((item, i) => {
          const imageSrc = item.image || fallbackImage;

          return (
            <CarouselItem key={item.id ?? i}>
              <div className="w-full h-[450px] relative rounded-3xl border-[3px] border-[#1A3D2F] overflow-hidden bg-[#E7EEE3]">
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