import { Box, Loader, Stack, Text } from "@mantine/core";
import { ReactNode } from "react";

interface AdminContentLoaderProps {
  loading: boolean;
  label?: string;
  children: ReactNode;
}

export function AdminContentLoader({
  loading,
  label,
  children,
}: AdminContentLoaderProps) {
  return (
    <Box pos="relative">
      {loading && (
        <Box
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 1,
            backdropFilter: "blur(1px)",
          }}
        >
          <Stack gap="xs" align="center">
            <Loader size="sm" color="brand" />
            {label && (
              <Text size="sm" c="dimmed">
                {label}
              </Text>
            )}
          </Stack>
        </Box>
      )}
      {children}
    </Box>
  );
}

