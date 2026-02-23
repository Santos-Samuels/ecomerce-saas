import { IStore } from "@ecomerce/shared";
import { ReactNode } from "react";
import { CartDrawer } from "../../cart/CartDrawer";
import { StoreHeader } from "../StoreHeader";
import { ScreenWrapper } from "./styles";

interface BaseScreenProps {
  store: IStore | null;
  children: ReactNode;
  footer?: ReactNode;
}

export function BaseScreen({ store, children, footer }: BaseScreenProps) {
  return (
    <ScreenWrapper>
      <StoreHeader store={store} />
      <CartDrawer />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
      {footer}
    </ScreenWrapper>
  );
}
