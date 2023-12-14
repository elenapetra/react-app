import React from 'react';
import './Button.css';

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size:
    | 'very-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'super-large'
    | 'extra-large'
    | 'costum-btn';
  label: React.ReactNode;
  type?: string;
  form?: string;
  className?: string;
};

const Button = ({ label, onClick, size, form, className }: ButtonProps) => {
  const getSizeStyles = (width: string) => {
    switch (width) {
      case 'very-small':
        return '70px';
      case 'small':
        return '150px';
      case 'medium':
        return '180px';
      case 'large':
        return '185px';
      case 'super-large':
        return '230px';
      case 'extra-large':
        return '287px';
      case 'costum-btn':
        return '60px';
      default:
        return '180px';
    }
  };
  const buttonStyles = {
    width: getSizeStyles(size),
  };

  return (
    <button
      style={buttonStyles}
      className={className}
      form={form}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
