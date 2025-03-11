import type { CSSProperties, TextProps } from '@lynx-js/types';
import "./styles/ThemedText.css";

export type TextType =
  | 'default'
  | 'title'
  | 'defaultSemiBold'
  | 'subtitle'
  | 'link';

export type ThemedTextProps = Omit<TextProps, 'style'> & {
  style?: CSSProperties;
  className?: string;
  lightColor?: string;
  darkColor?: string;
  type?: TextType;
};

export function ThemedText({
  style,
  type = 'default',
  className,
  children,
  ...rest
}: ThemedTextProps) {

  return (
    <text
      style={style}
      className={`${type} ${className ? className : ""}`}
      {...rest}
    >
      {children}
    </text>
  );
}
