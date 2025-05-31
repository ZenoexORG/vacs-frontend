import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default",
    isDark: false,
  },
};

export const Checked: Story = {
  args: {
    id: "checked",
    isDark: false,
    checked: true,
  },
};

export const DarkMode: Story = {
  args: {
    id: "dark",
    isDark: true,
  },
};

export const DarkChecked: Story = {
  args: {
    id: "dark-checked",
    isDark: true,
    checked: true,
  },
};

