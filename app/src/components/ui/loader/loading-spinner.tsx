import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LoadingSpinnerProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    tooltipText?: string;
    color?: string;
}

const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
} as const;

export const LoadingSpinner = ({
    className = '',
    size = 'md',
    tooltipText = '',
    color = 'text-neutral-600'
}: LoadingSpinnerProps) => {
    const spinner = (
        <div className={`flex items-center justify-center ${className}`}>
            <svg className={`animate-spin ${color} ${sizes[size]}`} viewBox="0 0 24 24">
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    );

    if (tooltipText === '') {
        return spinner;
    }

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>{spinner}</TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10} className="text-sm font-medium">
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
