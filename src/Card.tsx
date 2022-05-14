import { CardContainer } from './style';

type CardProps = {
  text: string
}

const Card = ({ text }: CardProps) => (
  <CardContainer>{text}</CardContainer>
);

export default Card;
