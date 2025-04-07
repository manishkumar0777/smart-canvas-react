import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

const DrawingCanvas = forwardRef(({ penColor, strokeWidth, tool }, ref) => {
  const canvasRef = useRef(null);
  const [isDrawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState(null);

  useImperativeHandle(ref, () => canvasRef.current);

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const takeSnapshot = () => {
    const ctx = canvasRef.current.getContext('2d');
    return ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const restoreSnapshot = () => {
    if (snapshot) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.putImageData(snapshot, 0, 0);
    }
  };

  const startDrawing = (e) => {
    const pos = getMousePos(e);
    setStartPos(pos);
    setDrawing(true);

    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = penColor;
    ctx.fillStyle = penColor;
    ctx.lineCap = 'round';

    if (tool === 'pen') {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    setSnapshot(takeSnapshot());
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    const ctx = canvasRef.current.getContext('2d');

    if (tool === 'pen') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      return;
    }

    restoreSnapshot();

    const x = startPos.x;
    const y = startPos.y;
    const w = pos.x - startPos.x;
    const h = pos.y - startPos.y;

    ctx.beginPath();

    switch (tool) {
      case 'rectangle':
        ctx.strokeRect(x, y, w, h);
        break;

      case 'square': {
        const side = Math.min(Math.abs(w), Math.abs(h)) * Math.sign(w);
        ctx.strokeRect(x, y, side, side);
        break;
      }

      case 'circle':
        ctx.ellipse(x + w / 2, y + h / 2, Math.abs(w) / 2, Math.abs(h) / 2, 0, 0, 2 * Math.PI);
        ctx.stroke();
        break;

      case 'triangle':
        ctx.moveTo(x + w / 2, y);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x + w, y + h);
        ctx.closePath();
        ctx.stroke();
        break;

      case 'right-triangle':
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x + w, y + h);
        ctx.closePath();
        ctx.stroke();
        break;

      default:
        break;
    }
  };

  const endDrawing = () => {
    setDrawing(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1500}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] border border-gray-300 rounded-lg"
      />
    </div>
  );
});

export default DrawingCanvas;
