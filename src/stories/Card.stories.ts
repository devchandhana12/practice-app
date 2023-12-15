import { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CardComp from "./CardComp";
// Define a unique name for the props interface
interface CardCompProps {
  children: ReactNode[];
}

const meta = {
  title: "Example/CardComponent",
  component: CardComp,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<CardCompProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCard: Story = {
  args: {
    children: [],
  },
};
