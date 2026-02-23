import { IStore } from "@ecomerce/shared";
import { ActionIcon, Tooltip } from "@mantine/core";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  IconWrapper,
  InfoCard,
  InfoContent,
  InfoItem,
  InfoLabel,
  InfoValue,
  SocialGrid,
} from "./styles";

interface ContactInfoProps {
  store: IStore;
}

export function ContactInfo({ store }: ContactInfoProps) {
  const primaryColor = store.primaryColor || undefined;

  return (
    <InfoCard>
      {store.address && (
        <InfoItem>
          <IconWrapper $color={primaryColor}>
            <FiMapPin size={24} />
          </IconWrapper>
          <InfoContent>
            <InfoLabel>Endereço</InfoLabel>
            <InfoValue>{store.address}</InfoValue>
          </InfoContent>
        </InfoItem>
      )}

      {store.phone && (
        <InfoItem>
          <IconWrapper $color={primaryColor}>
            <FiPhone size={24} />
          </IconWrapper>
          <InfoContent>
            <InfoLabel>Telefone / WhatsApp</InfoLabel>
            <InfoValue>{store.phone}</InfoValue>
          </InfoContent>
        </InfoItem>
      )}

      {store.email && (
        <InfoItem>
          <IconWrapper $color={primaryColor}>
            <FiMail size={24} />
          </IconWrapper>
          <InfoContent>
            <InfoLabel>E-mail</InfoLabel>
            <InfoValue>{store.email}</InfoValue>
          </InfoContent>
        </InfoItem>
      )}

      <SocialGrid>
        {store.instagramHandle && (
          <Tooltip label="Instagram">
            <ActionIcon
              component="a"
              href={`https://instagram.com/${store.instagramHandle.replace(
                "@",
                ""
              )}`}
              target="_blank"
              size="xl"
              radius="md"
              variant="light"
              color="pink"
            >
              <FaInstagram size={24} />
            </ActionIcon>
          </Tooltip>
        )}

        {store.phone && (
          <Tooltip label="WhatsApp">
            <ActionIcon
              component="a"
              href={`https://wa.me/${store.phone.replace(/\D/g, "")}`}
              target="_blank"
              size="xl"
              radius="md"
              variant="light"
              color="green"
            >
              <FaWhatsapp size={24} />
            </ActionIcon>
          </Tooltip>
        )}
      </SocialGrid>
    </InfoCard>
  );
}
