import { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

interface HeaderProps {
  value?: any;
  onChange?: (value: any) => void;
  user?: string;
}

const meta = {
  title: "Example/Header Component",
  component: Header,
  parameters: {
    layout: "centered",
  },
} as Meta<HeaderProps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NavBar: Story = {
  args: {
    value: "Search your sh here",
    onChange: () => {},
  },
};

export const LoggedInNavbar: Story = {
  args: {
    value: "Search your sh here",
    onChange: () => {},
    user: "John Doe",
  },
};
