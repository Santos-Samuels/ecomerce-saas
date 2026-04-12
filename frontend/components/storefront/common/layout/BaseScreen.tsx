import { IStore } from "@ecomerce/shared";
import { Affix, Button, Transition } from "@mantine/core";
import { ReactNode } from "react";
import { FiFileText } from "react-icons/fi";
import { CartDrawer } from "../../cart/CartDrawer";
import { BudgetModal } from "../BudgetModal";
import { BudgetProvider, useBudget } from "../BudgetModal/BudgetContext";
import { StoreHeader } from "../StoreHeader";
import { ScreenWrapper } from "./styles";

interface BaseScreenProps {
  store: IStore | null;
  children: ReactNode;
  footer?: ReactNode;
}

function BaseScreenContent({ store, children, footer }: BaseScreenProps) {
  const { isBudgetOpened, closeBudget, openBudget } = useBudget();

  return (
    <ScreenWrapper>
      <StoreHeader store={store} onOpenBudget={openBudget} />
      <CartDrawer />
      
      {store && (
        <BudgetModal 
          store={store} 
          opened={isBudgetOpened} 
          onClose={closeBudget} 
        />
      )}

      {store && (
        <Affix position={{ bottom: 20, right: 20 }} zIndex={100}>
          <Transition transition="slide-up" mounted={true}>
            {(transitionStyles) => (
              <Button
                color={store.primaryColor || "brand"}
                size="lg"
                radius="xl"
                variant="filled"
                style={transitionStyles}
                onClick={openBudget}
                leftSection={<FiFileText size={20} />}
              >
                Fazer Orçamento
              </Button>
            )}
          </Transition>
        </Affix>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
      {footer}
    </ScreenWrapper>
  );
}

export function BaseScreen(props: BaseScreenProps) {
  return (
    <BudgetProvider>
      <BaseScreenContent {...props} />
    </BudgetProvider>
  );
}
