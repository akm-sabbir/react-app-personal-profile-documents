import React, { useState, useEffect, useRef } from 'react';

export function ResponsiveList({ items }) {
  const containerRef = useRef(null);
  const [maxVisibleItems, setMaxVisibleItems] = useState(items.length);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Create an observer to track container size changes in real-time
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Get available vertical height of the container
        const containerHeight = entry.contentRect.height;

        // Target height of a single item including padding/gaps (e.g., 40px)
        const itemHeight = 40;

        // 2. Calculate max items that can fit mathematically
        const calculatedFit = Math.floor(containerHeight / itemHeight);

        // Prevent setting a negative number or zero if space is tight
        setMaxVisibleItems(Math.max(1, calculatedFit));
      }
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect(); // Clean up observer on unmount
  }, [items]);

  // 3. Dynamically slice the data array down to the calculated maximum capacity
  const visibleItems = items.slice(0, maxVisibleItems);
}