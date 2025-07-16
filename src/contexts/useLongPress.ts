import { useRef, useCallback } from 'react';

export function useLongPress (onLongPress: () => void, ms = 2000) {
    const timer = useRef<number | null>(undefined);

    const start = useCallback(() => {
        timer.current = window.setTimeout(onLongPress, ms);
    }, [onLongPress, ms]);

    const clear = useCallback(() => {
        if (timer.current !== null) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    }, []);

    return {
        onTouchStart: start,
        onTouchEnd: clear,
        onTouchMove: clear,
        onTouchCancel: clear,
    } as const;
} 