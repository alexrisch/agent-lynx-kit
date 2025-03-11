import { forwardRef, useCallback } from '@lynx-js/react';
import './styles/ThemedInput.css';

type ThemedInputProps = {
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const ThemedInput = forwardRef<HTMLInputElement, ThemedInputProps>(
  ({ className, onChange, ...props }: ThemedInputProps, ref) => {
    const handleChange = useCallback(
      (e: {
        detail: {
          value: string;
        };
      }) => {
        onChange(e.detail.value);
      },
      [onChange],
    );

    return (
      <input
        ref={ref}
        className={`input ${className || ''}`}
        {...props}
        // @ts-ignore -- Seems like an issue with TSconfig, ignoring for now
        bindinput={handleChange}
      />
    );
  },
);
