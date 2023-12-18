import { Meta, StoryObj } from "@storybook/react";
import ButtonComp from "./Button";
interface ButtonCompProps {
  label: string;
  variant: "primary" | "secondary" | "danger" | "success";
  color: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const meta = {
  title: "Example/Button Component",
  component: ButtonComp,

  parameters: {
    layout: "centered",
  },
} as Meta<ButtonCompProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  args: {
    variant: "primary",
    label: "Click me!",
    color: "purple",
    type: "button",
  },
};
