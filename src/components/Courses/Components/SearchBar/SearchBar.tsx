import { Button } from '../../../../common/Button/Button';

type SearchBarProps = {
  children: React.ReactNode;
};

export const SearchBar = (props: SearchBarProps) => {
  return (
    <div>
      {props.children}
      <Button
        buttonText='SEARCH'
        onClick={() => console.log('SEARCH button was clicked')}
        style={{
          width: '148px',
          height: '50px',
        }}
      />
    </div>
  );
};
