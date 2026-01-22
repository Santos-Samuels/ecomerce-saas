import { IStore } from "@ecomerce/shared";
import { FiMenu, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";
import {
  ActionButton,
  FallbackLogo,
  HeaderContainer,
  HeaderWrapper,
  LogoImage,
  LogoSection,
  MobileMenuButton,
  NavActions,
  NavLink,
  NavLinks,
  StoreName,
} from "./styles";

interface StoreHeaderProps {
  store: IStore | null;
}

export function StoreHeader({ store }: StoreHeaderProps) {
  if (!store) return null;

  return (
    <HeaderWrapper $primaryColor={store.primaryColor}>
      <HeaderContainer>
        <LogoSection href="/">
          {store.logoUrl ? (
            <LogoImage src={store.logoUrl} alt={store.name} />
          ) : (
            <FallbackLogo>
              <FiShoppingBag size={24} />
            </FallbackLogo>
          )}
          <StoreName>{store.name}</StoreName>
        </LogoSection>

        <NavLinks>
          <NavLink href="/">Início</NavLink>
          <NavLink href="#products">Produtos</NavLink>
          <NavLink href="#contact">Contatos</NavLink>
        </NavLinks>

        <NavActions>
          <ActionButton aria-label="Search">
            <FiSearch size={20} />
          </ActionButton>
          <ActionButton aria-label="Account">
            <FiUser size={20} />
          </ActionButton>
          <ActionButton aria-label="Cart">
            <FiShoppingBag size={20} />
          </ActionButton>
          <MobileMenuButton aria-label="Menu">
            <FiMenu size={20} />
          </MobileMenuButton>
        </NavActions>
      </HeaderContainer>
    </HeaderWrapper>
  );
}
