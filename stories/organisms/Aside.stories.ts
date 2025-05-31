import type { Meta, StoryObj } from "@storybook/react";
import { headerPageMenu, PageMenu, footerPageMenu } from "../../menu"; // Ajusta la ruta
import { Aside } from "./Aside";

const meta: Meta<typeof Aside> = {
  title: "Organisms/Aside",
  component: Aside,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Aside>;

export const Default: Story = {
  args: {
    menuData: { ...headerPageMenu, ...PageMenu, ...footerPageMenu },
    isDark: false,
  },
};

export const DarkMode: Story = {
  args: {
    menuData: { ...headerPageMenu, ...PageMenu, ...footerPageMenu },
    isDark: true,
  },
};

