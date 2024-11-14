import React, { useRef, useState } from "react";

interface CanvasBoxProps {
  imageUrl: string;
  canvasBox: {
    topLeftX: number;
    topLeftY: number;
    width: number;
    height: number;
  };
  onUpdateCanvasBox: (box: {
    topLeftX: number;
    topLeftY: number;
    width: number;
    height: number;
  }) => void;
}

const CanvasBox: React.FC<CanvasBoxProps> = ({
  imageUrl,
  canvasBox,
  onUpdateCanvasBox,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoords, setStartCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStartCoords({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !startCoords) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = x - startCoords.x;
      const height = y - startCoords.y;
      onUpdateCanvasBox({
        topLeftX: startCoords.x,
        topLeftY: startCoords.y,
        width,
        height,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="relative">
      <img src={imageUrl} alt="Annotation" className="w-full h-auto" />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        width={400}
        height={300}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      {canvasBox.width > 0 && (
        <div
          className="absolute border-2 border-red-500 bg-red-200 bg-opacity-25"
          style={{
            left: canvasBox.topLeftX,
            top: canvasBox.topLeftY,
            width: canvasBox.width,
            height: canvasBox.height,
          }}
        ></div>
      )}
    </div>
  );
};

export default CanvasBox;
