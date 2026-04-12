import React, { createContext, useContext, useState } from "react";

interface BudgetContextType {
  openBudget: () => void;
  closeBudget: () => void;
  isBudgetOpened: boolean;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [isBudgetOpened, setIsBudgetOpened] = useState(false);

  const openBudget = () => setIsBudgetOpened(true);
  const closeBudget = () => setIsBudgetOpened(false);

  return (
    <BudgetContext.Provider value={{ openBudget, closeBudget, isBudgetOpened }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}
