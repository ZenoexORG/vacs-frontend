'use client';

import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { Table } from "@organisms/Table";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button } from "@atoms/Button";
import Form from "./form";

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type', type: 'badge', badgeColorMap: { 'Software': '#00B69B', 'UTB': '#857238' } },
  { key: 'permissions', label: 'Permissions' },
  { key: 'color', label: 'Color' },
  { key: 'actions', label: 'Actions' },
];

const data = [
  {
    name: 'Admin',
    type: 'Software',
    permissions: [
      { category: 'Users', actions: ['Create', 'Read', 'Write', 'Delete'] },
      { category: 'Access Logs', actions: ['Read'] },
      { category: 'Settings', actions: ['Read', 'Write'] },
    ],
    color: '#739163',
  },
  {
    name: 'Admin',
    type: 'Software',
    permissions: [
      { category: 'Users', actions: ['Create', 'Read', 'Write', 'Delete'] },
      { category: 'Access Logs', actions: ['Read'] },
      { category: 'Settings', actions: ['Read', 'Write'] },
    ],
    color: '#739163',
  },
  {
    name: 'Admin',
    type: 'Software',
    permissions: [
      { category: 'Users', actions: ['Create', 'Read', 'Write', 'Delete'] },
      { category: 'Access Logs', actions: ['Read'] },
      { category: 'Settings', actions: ['Read', 'Write'] },
    ],
    color: '#739163',
  },
  {
    name: 'Admin',
    type: 'Software',
    permissions: [
      { category: 'Users', actions: ['Create', 'Read', 'Write', 'Delete'] },
      { category: 'Access Logs', actions: ['Read'] },
      { category: 'Settings', actions: ['Read', 'Write'] },
    ],
    color: '#739163',
  },
  {
    name: 'Admin',
    type: 'Software',
    permissions: [
      { category: 'Users', actions: ['Create', 'Read', 'Write', 'Delete'] },
      { category: 'Access Logs', actions: ['Read'] },
      { category: 'Settings', actions: ['Read', 'Write'] },
    ],
    color: '#739163',
  },
  {
    name: 'Admin',
    type: 'Software',
    permissions: [
      { category: 'Users', actions: ['Create', 'Read', 'Write', 'Delete'] },
      { category: 'Access Logs', actions: ['Read'] },
      { category: 'Settings', actions: ['Read', 'Write'] },
    ],
    color: '#739163',
  },
];

export default function Roles() {
  const { isDark } = useTheme();

  const [viewForm, setViewForm] = useState(false);

  const formData = useForm({
    mode: 'uncontrolled',

    initialValues: {
      name: '',
      type: '',
      permissions: [],
      color: '',
    },


  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Title size="3xl" isDark={isDark}>{viewForm ? 'Create Role' : 'Roles'}</Title>

        {!viewForm && (
          <Button onClick={() => setViewForm(true)} isDark={isDark} isSubmit>
            Add New
          </Button>
        )}
      </div>

      {viewForm
        ? <Form formData={formData} setViewForm={setViewForm} />
        : <Table data={data} columns={columns} isDark={isDark} />
      }
    </div>
  );
}
