import React, { useRef, useEffect, useState } from "react";
import "./Appp.css";

function App() {
  const ref = useRef(null);
  const resizerRefs = {
    left: useRef(null),
    right: useRef(null),
    top: useRef(null),
    bottom: useRef(null),
    bottomRight: useRef(null), // Right-Bottom Resizer
  };

  const [size, setSize] = useState({ width: 200, height: 200 });
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Track position for dragging

  useEffect(() => {
    const resizableElement = ref.current;
    let startWidth = 0;
    let startHeight = 0;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    // Function to handle resizing
    const handleMouseMove = (direction, event) => {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction === "right") {
        newWidth = startWidth + dx;
      } else if (direction === "left") {
        newWidth = startWidth - dx;
      } else if (direction === "bottom") {
        newHeight = startHeight + dy;
      } else if (direction === "top") {
        newHeight = startHeight - dy;
      } else if (direction === "bottomRight") {
        // Right-Bottom case: Adjust both width and height
        newWidth = startWidth + dx;
        newHeight = startHeight + dy;
      }

      setSize({
        width: Math.max(newWidth, 100),
        height: Math.max(newHeight, 100),
      });
    };

    const startResizing = (direction, event) => {
      startWidth = resizableElement.offsetWidth;
      startHeight = resizableElement.offsetHeight;
      startX = event.clientX;
      startY = event.clientY;

      const handleMouseMoveWithDirection = (event) =>
        handleMouseMove(direction, event);
      const stopResizing = () => {
        document.removeEventListener("mousemove", handleMouseMoveWithDirection);
        document.removeEventListener("mouseup", stopResizing);
      };

      document.addEventListener("mousemove", handleMouseMoveWithDirection);
      document.addEventListener("mouseup", stopResizing);
    };

    Object.keys(resizerRefs).forEach((direction) => {
      resizerRefs[direction].current.addEventListener("mousedown", (e) =>
        startResizing(direction, e)
      );
    });

    // Handle dragging
    const startDragging = (e) => {
      startX = e.clientX;
      startY = e.clientY;
      startLeft = position.x;
      startTop = position.y;

      const handleMouseMove = (event) => {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        setPosition({ x: startLeft + dx, y: startTop + dy });
      };

      const stopDragging = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", stopDragging);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopDragging);
    };

    resizableElement.addEventListener("mousedown", startDragging);

    return () => {
      Object.keys(resizerRefs).forEach((direction) => {
        resizerRefs[direction].current.removeEventListener("mousedown", (e) =>
          startResizing(direction, e)
        );
      });
      resizableElement.removeEventListener("mousedown", startDragging);
    };
  }, [position]);

  return (
    <div className="container">
      <div
        ref={ref}
        className="resizeable draggable"
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div ref={resizerRefs.left} className="resizer resizer-l"></div>
        <div ref={resizerRefs.right} className="resizer resizer-r"></div>
        <div ref={resizerRefs.top} className="resizer resizer-t"></div>
        <div ref={resizerRefs.bottom} className="resizer resizer-b"></div>
        <div
          ref={resizerRefs.bottomRight}
          className="resizer resizer-br"
        ></div> {/* Right-Bottom Resizer */}
      </div>
    </div>
  );
}

export default App;
