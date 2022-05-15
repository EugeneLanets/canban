import { CardContainer } from './style';

type CardProps = {
  text: string,
  id: string,
}

const Card = ({ text, id }: CardProps) => (
  <CardContainer>
    {id}
    {text}
  </CardContainer>
);

export default Card;
