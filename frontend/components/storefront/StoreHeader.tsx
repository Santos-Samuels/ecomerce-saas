import {
  Container,
  Title,
  Text,
  Group,
  Image as MantineImage,
} from "@mantine/core";
import { FiMapPin, FiPhone, FiMail, FiShoppingBag } from "react-icons/fi";
import { IStore } from "@ecomerce/shared";

interface StoreHeaderProps {
  store: IStore | null;
}

export function StoreHeader({ store }: StoreHeaderProps) {
  if (!store) return null;

  return (
    <div
      style={{
        backgroundColor: store.primaryColor || "#228be6",
        color: "white",
        padding: "60px 0",
      }}
    >
      <Container size="lg">
        <Group align="flex-start">
          {store.logoUrl ? (
            <MantineImage
              src={store.logoUrl}
              w={120}
              h={120}
              radius="md"
              bg="white"
              p={4}
              fit="contain"
            />
          ) : (
            <div
              style={{
                width: 120,
                height: 120,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiShoppingBag size={40} />
            </div>
          )}
          <div>
            <Title order={1}>{store.name}</Title>
            <Text opacity={0.9} size="lg">
              {store.description}
            </Text>

            <Group mt="lg" gap="xl">
              {store.address && (
                <Group gap={5}>
                  <FiMapPin /> <Text>{store.address}</Text>
                </Group>
              )}
              {store.phone && (
                <Group gap={5}>
                  <FiPhone /> <Text>{store.phone}</Text>
                </Group>
              )}
              {store.email && (
                <Group gap={5}>
                  <FiMail /> <Text>{store.email}</Text>
                </Group>
              )}
            </Group>
          </div>
        </Group>
      </Container>
    </div>
  );
}
