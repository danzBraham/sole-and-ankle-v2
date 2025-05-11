import styled from "styled-components";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const VARIANTS = {
  "on-sale": {
    bgColor: COLORS.primary,
    display: "inline-block",
    label: "Sale",
  },
  "new-release": {
    bgColor: COLORS.secondary,
    display: "inline-block",
    label: "Just Released!",
  },
  default: {
    bgColor: "transparent",
    display: "none",
    label: "",
  },
};

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

  const variantStyles = VARIANTS[variant];
  if (!variantStyles) {
    throw new Error(`Unknown variant passed to ShoeCard: ${variant}`);
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <VariantTag
          style={{ backgroundColor: variantStyles.bgColor, display: variantStyles.display }}
        >
          {variantStyles.label}
        </VariantTag>
        <ImageWrapper>
          <Image alt="Shoes" src={imageSrc} />
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
  flex: 1 1 250px;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const VariantTag = styled.span`
  padding: 6px 8px;
  position: absolute;
  top: 12px;
  right: -4px;
  z-index: 2;
  color: white;
  font-weight: ${WEIGHTS.bold};
  font-size: 14px;
  border-radius: 2px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
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
