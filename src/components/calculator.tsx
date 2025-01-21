import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

type Operator = '+' | '-' | '×' | '÷';

export function Calculator() {
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState<string>('');
  const [operation, setOperation] = useState<Operator | null>(null);

  const handleNumber = (num: string) => {
    if (currentInput === '0') {
      setCurrentInput(num);
    } else if (currentInput.length < 12) {
      setCurrentInput(currentInput + num);
    }
  };

  const handleOperator = (op: Operator) => {
    if (currentInput === '') return;
    
    setPreviousInput(currentInput);
    setOperation(op);
    setCurrentInput('');
  };

  const handleEqual = () => {
    if (!operation || !previousInput) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    let result: number;
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) {
          toast.error('Cannot divide by zero');
          return;
        }
        result = prev / current;
        break;
    }

    setCurrentInput(result.toString().slice(0, 12));
    setPreviousInput('');
    setOperation(null);
  };

  const handleClear = () => {
    setCurrentInput('0');
    setPreviousInput('');
    setOperation(null);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[350px] bg-background text-foreground">
        <CardHeader>
          <Input
            value={currentInput}
            readOnly
            className="text-right text-3xl h-16"
            aria-label="Calculator display"
          />
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            className="col-span-2 h-14"
            onClick={handleClear}
            aria-label="Clear"
          >
            C
          </Button>
          <Button
            variant="outline"
            className="h-14"
            onClick={() => handleOperator('÷')}
            aria-label="Divide"
          >
            ÷
          </Button>
          <Button
            variant="outline"
            className="h-14"
            onClick={() => handleOperator('×')}
            aria-label="Multiply"
          >
            ×
          </Button>
          
          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="h-14"
              onClick={() => handleNumber(num.toString())}
              aria-label={`Number ${num}`}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            className="h-14"
            onClick={() => handleOperator('-')}
            aria-label="Subtract"
          >
            -
          </Button>
          
          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="h-14"
              onClick={() => handleNumber(num.toString())}
              aria-label={`Number ${num}`}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            className="h-14"
            onClick={() => handleOperator('+')}
            aria-label="Add"
          >
            +
          </Button>
          
          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="h-14"
              onClick={() => handleNumber(num.toString())}
              aria-label={`Number ${num}`}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            className="h-14"
            onClick={handleEqual}
            aria-label="Equals"
          >
            =
          </Button>
          
          <Button
            variant="outline"
            className="col-span-2 h-14"
            onClick={() => handleNumber('0')}
            aria-label="Number 0"
          >
            0
          </Button>
          <Button
            variant="outline"
            className="h-14"
            onClick={() => handleNumber('.')}
            aria-label="Decimal point"
          >
            .
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
