import { StarIcon } from "lucide-react";
import { useCallback, useId, useState } from "react";

interface StarRatingProps {
    rate: number;
    onRated: (rate: number) => void;
}

export function StarRating({ onRated, rate }: StarRatingProps) {
    const id = useId();
    const [hovering, setHovering] = useState(false);
    const [_rate, setRate] = useState(0);

    return (
        <div
            className="flex items-center"
            onMouseLeave={() => {
                setRate(0);
                setHovering(false);
            }}
        >
            {new Array(5).fill(null).map((_, idx) => {
                let isFilled = false;

                if (hovering) {
                    isFilled = _rate > idx;
                } else {
                    isFilled = rate > idx;
                }

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const enter = useCallback(() => {
                    setHovering(true);
                    setRate(idx + 1);
                }, [idx]);

                return (
                    <button type="button" key={`${id}_${idx}`} onClick={() => onRated(idx + 1)} onMouseEnter={enter}>
                        {isFilled ? (
                            <StarIcon strokeWidth={1} className="h-5 w-5 text-[--orange-10]" fill="var(--orange-10)" />
                        ) : (
                            <StarIcon strokeWidth={1} className="w-5 h-5 text-[--orange-10]" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
