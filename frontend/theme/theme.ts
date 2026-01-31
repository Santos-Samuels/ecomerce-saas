"use client";

import React, { ReactNode, useEffect, useMemo } from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import { useAppSelector } from "@/store/hooks";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const defaultPrimaryColor = "#2563EB";

const buildColorScale = (
  color: string
): [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
] => [color, color, color, color, color, color, color, color, color, color];

export const theme = createTheme({
  primaryColor: "brand",
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
  colors: {
    brand: buildColorScale(defaultPrimaryColor),
  },
  components: {
    Button: {
      defaultProps: {
        size: "md",
      },
    },
    TextInput: {
      defaultProps: {
        size: "md",
      },
    },
    PasswordInput: {
      defaultProps: {
        size: "md",
      },
    },
  },
});

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const storePrimaryColor = useAppSelector(
    (state) => state.storeSettings.store?.primaryColor ?? null
  );

  const cookiePrimaryColor =
    typeof window !== "undefined"
      ? (() => {
          const value = getCookie("ecomerce-store-primary-color");
          if (typeof value === "string" && value.trim().length > 0) {
            return value;
          }
          return null;
        })()
      : null;

  useEffect(() => {
    if (storePrimaryColor && storePrimaryColor.trim().length > 0) {
      setCookie("ecomerce-store-primary-color", storePrimaryColor);
    }

    if (storePrimaryColor === null) {
      deleteCookie("ecomerce-store-primary-color");
    }
  }, [storePrimaryColor]);

  const primaryColor =
    storePrimaryColor || cookiePrimaryColor || defaultPrimaryColor;

  const dynamicTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        colors: {
          ...theme.colors,
          brand: buildColorScale(primaryColor),
        },
      }),
    [primaryColor]
  );

  return React.createElement(
    MantineProvider,
    { theme: dynamicTheme, defaultColorScheme: "light" },
    children
  );
}
