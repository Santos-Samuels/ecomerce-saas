import { IStore } from "@ecomerce/shared";
import Image from "next/image";
import { extractGoogleMapsEmbedUrl } from "@/lib/googleMapsEmbed";
import {
  LocationCard,
  LocationGrid,
  LocationMapCard,
  LocationSection,
  LocationTitle,
  MapEmbedWrapper,
  StorefrontImageWrapper,
} from "./styles";

interface ContactLocationSectionProps {
  store: IStore;
}

export function ContactLocationSection({ store }: ContactLocationSectionProps) {
  const mapUrl = extractGoogleMapsEmbedUrl(store.mapEmbedUrl);
  const imageUrl = store.storefrontImageUrl?.trim();

  if (!mapUrl && !imageUrl) return null;

  const single = Boolean(mapUrl) !== Boolean(imageUrl);

  return (
    <LocationSection>
      <LocationTitle>Localização e fachada</LocationTitle>
      <LocationGrid $single={single}>
        {imageUrl && (
          <LocationCard>
            <StorefrontImageWrapper style={{ marginBottom: 0 }}>
              <Image
                src={imageUrl}
                alt="Fachada da loja"
                width={1200}
                height={675}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </StorefrontImageWrapper>
          </LocationCard>
        )}

        {mapUrl && (
          <LocationMapCard>
            <MapEmbedWrapper style={{ paddingBottom: "56.25%" }}>
              <iframe
                title="Localização no Google Maps"
                src={mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </MapEmbedWrapper>
          </LocationMapCard>
        )}
      </LocationGrid>
    </LocationSection>
  );
}
