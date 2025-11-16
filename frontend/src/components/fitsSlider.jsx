"use client";

import React, { useRef, useState } from "react";

export default function FitsSlider({ items = [], onSlideChange }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  const total = items.length || 1;

  const goTo = (newIndex) => {
    const safeIndex = ((newIndex % total) + total) % total; // wrap around
    setIndex(safeIndex);
    if (onSlideChange) onSlideChange(safeIndex);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        goTo(index - 1); // swipe right -> previous
      } else {
        goTo(index + 1); // swipe left -> next
      }
    }

    touchStartX.current = null;
  };

  const currentItem = items[index] ?? {};
  const imageSrc = currentItem.image || currentItem.avatar || "/fits/guy.jpg";

  return (
    <div
      className="w-full relative rounded-3xl border-[3px] border-[#1A3D2F] overflow-hidden bg-[#E7EEE3]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Outfit image */}
      <div className="aspect-[3/4] w-full">
        <img
          src={imageSrc}
          alt={currentItem.name || "Outfit"}
          className="w-full h-full object-fits"
        />
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-4 bg-white" : "w-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
