import styled from "styled-components";

export const FooterWrapper = styled.footer`
  border-top: 1px solid #e9ecef;
  background-color: white;
  margin-top: auto;
  padding: 60px 0 20px;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FooterTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--mantine-color-dark-9);
  margin: 0;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: var(--mantine-color-gray-7);
  font-size: 14px;
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`;

export const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--mantine-color-gray-1);
  color: var(--mantine-color-dark-9);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background-color: var(--mantine-color-blue-6);
    color: white;
  }
`;

export const Copyright = styled.div`
  border-top: 1px solid var(--mantine-color-gray-2);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;
