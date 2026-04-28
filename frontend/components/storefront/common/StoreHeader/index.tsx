import { toggleCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IStore } from "@ecomerce/shared";
import { Indicator } from "@mantine/core";
import { useState } from "react";
import { FiMenu, FiShoppingBag, FiX } from "react-icons/fi";
import {
  ActionButton,
  FallbackLogo,
  HeaderContainer,
  HeaderWrapper,
  LogoImage,
  LogoSection,
  MobileMenuButton,
  MobileNavLinks,
  NavActions,
  NavLink,
  NavLinks,
  StoreName,
} from "./styles";

interface StoreHeaderProps {
  store: IStore | null;
  onOpenBudget?: () => void;
}

export function StoreHeader({ store, onOpenBudget }: StoreHeaderProps) {
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          <NavLink href="/gallery">Galeria</NavLink>
          <NavLink href="/contact">Contatos</NavLink>
          <NavLink as="button" onClick={onOpenBudget}>Orçamento</NavLink>
        </NavLinks>

        <NavActions>
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
          <MobileMenuButton
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </MobileMenuButton>
        </NavActions>
      </HeaderContainer>

      <MobileNavLinks $isOpen={isMobileMenuOpen}>
        <NavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
          Início
        </NavLink>
        <NavLink href="/products" onClick={() => setIsMobileMenuOpen(false)}>
          Produtos
        </NavLink>
        <NavLink href="/gallery" onClick={() => setIsMobileMenuOpen(false)}>
          Galeria
        </NavLink>
        <NavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
          Contatos
        </NavLink>
        <NavLink
          as="button"
          onClick={() => {
            onOpenBudget?.();
            setIsMobileMenuOpen(false);
          }}
        >
          Orçamento
        </NavLink>
      </MobileNavLinks>
    </HeaderWrapper>
  );
}
