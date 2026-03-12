import { toggleCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IStore } from "@ecomerce/shared";
import { Indicator } from "@mantine/core";
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
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector((state) => 
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

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
          <NavLink href="/products">Produtos</NavLink>
          <NavLink href="/contact">Contatos</NavLink>
        </NavLinks>

        <NavActions>
          <ActionButton aria-label="Search">
            <FiSearch size={20} />
          </ActionButton>
          <ActionButton aria-label="Account">
            <FiUser size={20} />
          </ActionButton>
          <Indicator 
            label={cartItemsCount} 
            size={16} 
            offset={4} 
            color="red" 
            disabled={cartItemsCount === 0}
            inline
            position="bottom-end"
          >
            <ActionButton 
              aria-label="Cart"
              onClick={() => dispatch(toggleCart())}
            >
              <FiShoppingBag size={20} />
            </ActionButton>
          </Indicator>
          <MobileMenuButton aria-label="Menu">
            <FiMenu size={20} />
          </MobileMenuButton>
        </NavActions>
      </HeaderContainer>
    </HeaderWrapper>
  );
}
