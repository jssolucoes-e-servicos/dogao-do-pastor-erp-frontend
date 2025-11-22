'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { fetcherGet } from '@/lib/fetcher';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

export default function SorteioDogaoPage() {
  const { data, isLoading, error } = useSWR('order-online/dogs-paid-promo/names', fetcherGet);
  const [isSorting, setIsSorting] = useState(false);
  const [displayedName, setDisplayedName] = useState('');
  const [winner, setWinner] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const names: string[] = data?.names ?? [];

  function pickRandomName() {
    if (names.length === 0) return null;
    const idx = Math.floor(Math.random() * names.length);
    return names[idx];
  }

  function startSort() {
    setWinner(null);
    setIsSorting(true);

    let elapsed = 0;
    const duration = 15 * 1000; // 45 segundos
    const startTime = Date.now();

    function animate() {
      setDisplayedName(names[Math.floor(Math.random() * names.length)] ?? '');

      elapsed = Date.now() - startTime;

      // Vai ficando mais lento no final
      const minDelay = 40;
      const maxDelay = 270;
      let delay = minDelay + Math.floor((maxDelay - minDelay) * (elapsed / duration));
      if (delay > maxDelay) delay = maxDelay;

      if (elapsed < duration) {
        timerRef.current = setTimeout(animate, delay);
      } else {
        const chosen = pickRandomName();
        setDisplayedName(chosen ?? '');
        setTimeout(() => {
          setWinner(chosen ?? '');
          setIsSorting(false);
        }, 700);
      }
    }

    animate();
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto py-10 flex flex-col items-center">
      <h1 className="mb-8 text-3xl font-bold text-center">Sorteio Dogão Promocional</h1>
      {isLoading && <div>Carregando nomes...</div>}
      {error && <div>Erro ao buscar nomes</div>}

      <div className="w-full flex flex-col items-center mb-6">
        <div
          className={`h-24 w-full flex items-center justify-center border rounded-lg bg-card shadow ${isSorting ? "animate-pulse" : ""
            } transition-all duration-300`}
          style={{
            minHeight: 86,
            letterSpacing: "0.1em",
            fontSize: "2rem",
            color: isSorting ? "#F59E42" : "#EA580C", // Laranja vibrante
            fontWeight: 900,
            textAlign: "center",
          }}
        >
          {displayedName || (
            <span className="text-muted-foreground">Clique em &quot;Sortear&quot; para começar</span>
          )}
        </div>
      </div>

      <Button
        className="text-xl px-8 py-4"
        onClick={startSort}
        disabled={isSorting || names.length === 0}
      >
        {isSorting ? "Sorteando..." : "Sortear"}
      </Button>

      <Dialog open={!!winner} onOpenChange={b => !b && setWinner(null)}>
        <DialogContent className="flex flex-col items-center justify-center py-16 bg-amber-200">
          <h2 className="text-4xl sm:text-6xl font-bold text-amber-700 mb-6">🎉 Premiado! 🎉</h2>
          <div
            className="text-3xl sm:text-5xl font-extrabold text-center break-words"
            style={{
              color: "#EA580C",

              fontWeight: 900,
              lineHeight: "1.2"
            }}
          >
            {winner}
          </div>
          <Button className="mt-10 bg-amber-600 text-white text-lg px-12 py-4" onClick={() => setWinner(null)}>
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
