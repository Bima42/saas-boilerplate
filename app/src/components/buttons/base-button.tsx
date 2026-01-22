import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface BaseButtonProps extends ButtonProps {
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    tooltip?: string;
    loading?: boolean;
}

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
    ({ icon, iconPosition = 'left', tooltip, loading = false, children, size, disabled, className, ...props }, ref) => {
        const isIconOnly = !!icon && !children;
        const effectiveSize = isIconOnly && !size ? 'icon' : size;
        const isDisabled = disabled || loading;

        let leftContent: React.ReactNode = null;
        let rightContent: React.ReactNode = null;

        if (loading) {
            const spinner = <Loader2 className="animate-spin" />;
            if (icon && iconPosition === 'right') {
                rightContent = spinner;
            } else {
                leftContent = spinner;
            }
        } else if (icon) {
            if (iconPosition === 'right') {
                rightContent = icon;
            } else {
                leftContent = icon;
            }
        }

        const buttonElement = (
            <Button
                ref={ref}
                size={effectiveSize}
                disabled={isDisabled}
                className={className}
                style={isDisabled && tooltip ? { pointerEvents: 'none' } : undefined}
                aria-label={tooltip ? tooltip : undefined}
                {...props}
            >
                {leftContent}
                {children}
                {rightContent}
            </Button>
        );

        if (tooltip) {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span tabIndex={-1} className={isDisabled ? 'cursor-not-allowed' : ''}>
                                {buttonElement}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return buttonElement;
    }
);
BaseButton.displayName = 'BaseButton';
