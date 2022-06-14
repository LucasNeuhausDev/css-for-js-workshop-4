import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
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
        <ImageWrapper variant={variant}>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
}


const Link = styled.a`
  text-decoration: none;
  color: inherit;

  flex-basis: 340px;
  flex-grow: 1;
`;


const Wrapper = styled.article`

`;

const ImageWrapper = styled.div`
  position: relative;

  &::before {
    position: absolute;
    display: ${p => p.variant === "default" ? "none" : ""};
    top: 12px;
    right: -4px;
    background-color: ${p => p.variant === "on-sale" ? COLORS.primary : COLORS.secondary};
    color: ${COLORS.white};
    font-family: "Raleway", sans-serif;
    content: '${p => p.variant === "on-sale" ? "Sale" : p.variant === "new-release" ? "Just Released" : ""}';
    padding: 9px 11px 7px 9px ;
    border-radius: 2px;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: auto;
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
