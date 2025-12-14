import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LoadingSpinner } from '@/components/ui/loader/loading-spinner';
import Link from 'next/link';

interface SimpleButtonProps {
    icon?: LucideIcon;
    onClick?: () => void;
    href?: string;
    onMouseDown?: (e: React.MouseEvent) => void;
    label?: string;
    disabled?: boolean;
    active?: boolean;
    className?: string;
    iconClassName?: string;
    hoverClassName?: string;
    size?: 'xs' | 'sm-' | 'sm' | 'sm+' | 'md-' | 'md' | 'md+' | 'lg-' | 'lg' | 'lg+' | 'xl-' | 'xl' | 'xl+';
    rounded?: 'sm' | 'md' | 'lg' | 'full';
    type?: 'button' | 'submit' | 'reset';
    strokeWidth?: number;
    noHover?: boolean;
    tooltipClassName?: string;
    tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
    text?: string;
    textSize?: 'xs' | 'sm' | 'base' | 'lg';
    isLoading?: boolean;
}

const iconSizes = {
    xs: 'w-2 h-2',
    'sm-': 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    'sm+': 'w-3.5 h-3.5',
    'md-': 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    'md+': 'w-[18px] h-[18px]',
    'lg-': 'w-[18px] h-[18px]',
    lg: 'w-5 h-5',
    'lg+': 'w-[22px] h-[22px]',
    'xl-': 'w-[22px] h-[22px]',
    xl: 'w-6 h-6',
    'xl+': 'w-7 h-7'
} as const;

const buttonSizes = {
    xs: 'p-0',
    'sm-': 'p-[1px]',
    sm: 'p-0.5',
    'sm+': 'p-[3px]',
    'md-': 'p-[3px]',
    md: 'p-1',
    'md+': 'p-[5px]',
    'lg-': 'p-[5px]',
    lg: 'p-1.5',
    'lg+': 'p-[7px]',
    'xl-': 'p-[7px]',
    xl: 'p-2',
    'xl+': 'p-2.5'
} as const;

const roundedSizes = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
} as const;

const hoverStyles = {
    default: 'hover:bg-accent hover:text-accent-foreground'
} as const;

const disabledStyles = {
    default: 'opacity-50 cursor-not-allowed'
} as const;

const activeStyles = {
    default: 'bg-neutral-50'
} as const;

const transitionStyles = {
    default: 'transition-colors'
} as const;

const tooltipStyles = {
    content: 'text-sm font-medium'
} as const;

const iconStyles = {
    default: 'text-neutral-700 dark:text-foreground'
} as const;

const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
} as const;

export const SimpleButton: React.FC<SimpleButtonProps> = ({
    icon: Icon,
    onClick,
    href,
    label,
    onMouseDown,
    disabled,
    active,
    className,
    iconClassName,
    hoverClassName,
    size = 'md',
    rounded = 'md',
    type = 'button',
    strokeWidth = 2,
    noHover = false,
    tooltipClassName = '',
    tooltipSide = 'bottom',
    text,
    textSize,
    isLoading
}) => {
    const buttonClassName = `
        ${buttonSizes[size]} 
        ${roundedSizes[rounded]} 
        ${!noHover && (hoverClassName || hoverStyles.default)}
        ${transitionStyles.default}
        ${disabled ? disabledStyles.default : ''}
        ${active ? activeStyles.default : ''}
        flex items-center justify-center
        ${className || ''}
    `;

    const textClassName = textSize ? textSizes[textSize] : '';

    const Content = () => (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center w-full">
                    <LoadingSpinner className="p-0.5" />
                </div>
            ) : (
                <>
                    {Icon && (
                        <Icon
                            className={`${iconSizes[size]} ${iconClassName || iconStyles.default}`}
                            strokeWidth={strokeWidth}
                        />
                    )}
                    {text && <span className={`${Icon ? 'ml-2' : ''} ${textClassName}`}>{text}</span>}
                </>
            )}
        </>
    );

    const renderButton = () => {
        if (href && !disabled && !isLoading) {
            return (
                <Link href={href} className={buttonClassName} onMouseDown={onMouseDown}>
                    <Content />
                </Link>
            );
        }

        return (
            <button
                onClick={onClick}
                onMouseDown={onMouseDown}
                disabled={disabled || isLoading}
                type={type}
                className={buttonClassName}
            >
                <Content />
            </button>
        );
    };

    if (!label) {
        return renderButton();
    }

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>{renderButton()}</TooltipTrigger>
                <TooltipContent
                    side={tooltipSide}
                    sideOffset={10}
                    className={`${tooltipStyles.content} ${tooltipClassName}`}
                >
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
