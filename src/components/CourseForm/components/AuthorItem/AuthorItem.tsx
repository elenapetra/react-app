import Button from 'common/Button/Button';
import './AuthorItem.css';
type AuthorItemProps = {
  buttonText: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  authorName: string;
  value?: string;
};

export const AuthorItem = (props: AuthorItemProps) => {
  return (
    <div className='author-item-wrapper'>
      <Button
        className='author-item-btn'
        label={props.buttonText}
        onClick={props.onClick}
        size='very-small'
      />
      <p className='author-item-name'>{props.authorName}</p>
    </div>
  );
};
