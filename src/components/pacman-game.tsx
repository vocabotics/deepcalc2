import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type Direction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN' | null;

export function PacManGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [pacmanPos, setPacmanPos] = useState({ x: 1, y: 1 });
  const [direction, setDirection] = useState<Direction>(null);
  const [dots, setDots] = useState<boolean[][]>(() =>
    Array(15).fill(true).map(() => Array(20).fill(true))
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft': setDirection('LEFT'); break;
        case 'ArrowRight': setDirection('RIGHT'); break;
        case 'ArrowUp': setDirection('UP'); break;
        case 'ArrowDown': setDirection('DOWN'); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = 20;
    canvas.width = 20 * cellSize;
    canvas.height = 15 * cellSize;

    const moveInterval = setInterval(() => {
      setPacmanPos(prev => {
        if (!direction) return prev;
        const newPos = { ...prev };

        switch (direction) {
          case 'LEFT': newPos.x = Math.max(0, prev.x - 1); break;
          case 'RIGHT': newPos.x = Math.min(19, prev.x + 1); break;
          case 'UP': newPos.y = Math.max(0, prev.y - 1); break;
          case 'DOWN': newPos.y = Math.min(14, prev.y + 1); break;
        }

        if (dots[newPos.y][newPos.x]) {
          setDots(prev => prev.map((row, y) =>
            y === newPos.y ? row.map((dot, x) => x === newPos.x ? false : dot) : row
          ));
          setScore(s => s + 10);
          if (score + 10 === 2000) toast.success('You won!');
        }

        return newPos;
      });
    }, 150);

    const draw = () => {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dots
      dots.forEach((row, y) => row.forEach((dot, x) => {
        if (dot) {
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(x * cellSize + cellSize/2, y * cellSize + cellSize/2, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }));

      // Draw Pac-Man
      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(
        pacmanPos.x * cellSize + cellSize/2,
        pacmanPos.y * cellSize + cellSize/2,
        cellSize/2 - 2,
        0.2 * Math.PI * (direction === 'LEFT' ? 1 : 0),
        1.8 * Math.PI * (direction === 'LEFT' ? 1 : 1)
      );
      ctx.lineTo(pacmanPos.x * cellSize + cellSize/2, pacmanPos.y * cellSize + cellSize/2);
      ctx.fill();

      requestAnimationFrame(draw);
    };

    draw();
    return () => clearInterval(moveInterval);
  }, [direction, pacmanPos, dots, score]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 bg-background text-foreground">
        <div className="text-xl mb-2 font-bold">Score: {score}</div>
        <canvas
          ref={canvasRef}
          className="border-2 border-muted rounded"
          aria-label="Pac-Man game board"
        />
      </Card>
    </motion.div>
  );
}
