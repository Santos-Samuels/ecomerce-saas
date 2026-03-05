import { Title } from "@mantine/core";
import styled from "styled-components";

export const LandingWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
`;

export const Header = styled.header`
  padding: 20px;
  background: white;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #228be6;
  letter-spacing: -1px;
`;

export const Hero = styled.section`
  padding: 80px 20px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

export const StyledTitle = styled(Title)`
  font-size: 48px;
  font-weight: 900;
  color: #1a1b1e;
  margin-bottom: 20px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const Subtitle = styled.p`
  font-size: 20px;
  color: #868e96;
  margin-bottom: 40px;
  line-height: 1.5;
`;

export const Features = styled.section`
  padding: 60px 20px;
  background: white;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto;
`;

export const FeatureCard = styled.div`
  padding: 30px;
  border-radius: 12px;
  background: #f8f9fa;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CTASection = styled.section`
  padding: 80px 20px;
  text-align: center;
  background: #228be6;
  color: white;
`;

export const Footer = styled.footer`
  padding: 40px 20px;
  text-align: center;
  color: #868e96;
  font-size: 14px;
`;
