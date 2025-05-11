import styled from "styled-components";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({ slug, name, imageSrc, price, salePrice, releaseDate, numOfColors }) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.

  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default';

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="Shoes" src={imageSrc} />
          {variant === "on-sale" && <SaleFlag>Sale</SaleFlag>}
          {variant === "new-release" && <NewFlag>Just Released!</NewFlag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isOnSale={variant === "on-sale"}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 275px;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Flag = styled.span`
  padding: 6px 8px;
  position: absolute;
  top: 12px;
  right: -4px;
  z-index: 2;
  color: white;
  font-weight: ${WEIGHTS.bold};
  font-size: ${14 / 16}rem;
  border-radius: 4px;
`;

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`;

const NewFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${({ isOnSale }) => (isOnSale ? COLORS.gray[700] : COLORS.gray[900])};
  text-decoration: ${({ isOnSale }) => (isOnSale ? "line-through" : "none")};
  font-weight: 500;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  font-weight: 500;
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
