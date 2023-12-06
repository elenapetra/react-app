import { Button } from 'common/Button/Button';
import './AuthorItem.css';
type AuthorItemProps = {
  buttonText: string;
  onClick: any;
  authorName: string;
  value?: string;
  style: {
    width: string;
    height: string;
  };
};

export const AuthorItem = (props: AuthorItemProps) => {
  return (
    <div className='author-item-wrapper'>
      <Button
        className='author-item-btn'
        buttonText={props.buttonText}
        style={props.style}
        onClick={props.onClick}
      />
      <p className='author-item-name'>{props.authorName}</p>
    </div>
  );
};
