import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

// Define the keyframes for the spinning animation
const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

// Define the size mapping for different types
const sizeMap: Record<string, string> = {
  sm: '1.3rem', // Small size
  md: '2.4rem', // Medium size (default)
  lg: '3.2rem', // Large size
};

// Define the props interface
interface SpinnerMiniProps {
  type?: 'sm' | 'md' | 'lg'; // Optional type prop
}

// Create the styled component with props
const SpinnerMini = styled(BiLoaderAlt)<SpinnerMiniProps>`
  width: ${({ type }) => sizeMap[type || 'md']}; // Default to md
  height: ${({ type }) => sizeMap[type || 'md']}; // Default to md
  animation: ${rotate} 1.5s infinite linear;
`;

// Set default props
SpinnerMini.defaultProps = {
  type: 'md', // Default prop value
};

export default SpinnerMini;