import { IStoreFeedback } from "@ecomerce/shared";
import { FaStar } from "react-icons/fa";
import {
  Comment,
  Container,
  CustomerAvatar,
  CustomerInfo,
  CustomerName,
  FeedbackCard,
  FeedbackGrid,
  SectionTitle,
  SectionWrapper,
  StarRating,
} from "./styles";

interface FeedbackSectionProps {
  feedbacks: IStoreFeedback[];
}

export function FeedbackSection({ feedbacks }: FeedbackSectionProps) {
  if (!feedbacks || feedbacks.length === 0) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <SectionWrapper>
      <Container>
        <SectionTitle>O que nossos clientes dizem</SectionTitle>
        <FeedbackGrid>
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id}>
              <StarRating>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={16}
                    color={i < feedback.stars ? "#fab005" : "#e9ecef"}
                  />
                ))}
              </StarRating>
              <Comment>&quot;{feedback.comment}&quot;</Comment>
              <CustomerInfo>
                <CustomerAvatar>
                  {getInitials(feedback.customerName)}
                </CustomerAvatar>
                <CustomerName>{feedback.customerName}</CustomerName>
              </CustomerInfo>
            </FeedbackCard>
          ))}
        </FeedbackGrid>
      </Container>
    </SectionWrapper>
  );
}
