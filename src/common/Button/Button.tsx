import React from 'react';
import './Button.css';
import { Link, LinkProps, To } from 'react-router-dom';

type ButtonProps = {
  onClick?: any;
  size:
    | 'very-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'super-large'
    | 'extra-large'
    | 'custom-btn';
  label: React.ReactNode;
  type?: string;
  form?: string;
  className?: string;
  component?: React.ElementType;
  to?: any;
};

const Button = ({
  label,
  onClick,
  size,
  form,
  className,
  component,
  to,
}: ButtonProps) => {
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
      case 'custom-btn':
        return '60px';
      default:
        return '180px';
    }
  };
  const buttonStyles = {
    width: getSizeStyles(size),
  };
  if (component) {
    return (
      <Link
        to={to}
        style={buttonStyles}
        className={className}
        onClick={onClick}
      >
        {label}
      </Link>
    );
  }
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
