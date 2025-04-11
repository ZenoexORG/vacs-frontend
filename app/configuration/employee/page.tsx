'use client';

import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { Table } from "@organisms/Table";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button } from "@atoms/Button";
import Form from "./form";
import { Role } from "../../../types/roles";
import Deleting from "@components/modals/Deleting";

const columns = [
  { key: 'id', label: 'Id' },
  { key: 'username', label: 'Username' },
  { key: 'first_name', label: 'Name' },
  { key: 'last_name', label: 'Last Name' },
  {
    key: 'role', label: 'Role', type: 'badge',
    badgeColorMap: {
      'admin': '#00B69B',
      'security': '#EF3826',
    }
  },
  { key: 'actions', label: 'Actions' },
];

const data = [
  {
    _id: '1',
    username: 'johndoe',
    first_name: 'John Alex',
    last_name: 'Doe Smith',
    id: '123456789',
    role: 'admin',
    password: '123456',
  },
  {
    _id: '2',
    username: 'janesmith',
    first_name: 'Jane Paul',
    last_name: 'Smith Doe',
    id: '987654321',
    role: 'security',
    password: '123456',
  },
  {
    _id: '3',
    username: 'alicejohnson',
    first_name: 'Alice Marie',
    last_name: 'Johnson Doe',
    id: '456789123',
    role: 'security',
    password: '123456',
  },
  {
    _id: '4',
    username: 'boblee',
    first_name: 'Bob Lee',
    last_name: 'Brown Doe',
    id: '321654987',
    role: 'admin',
    password: '123456',
  },
  {
    _id: '5',
    username: 'charlieray',
    first_name: 'Charlie Ray',
    last_name: 'Davis Doe',
    id: '654321987',
    role: 'admin',
    password: '123456',
  },
  {
    _id: '6',
    username: 'davidjames',
    first_name: 'David James',
    last_name: 'Wilson Doe',
    id: '789123456',
    role: 'security',
    password: '123456',
  }
];

export default function Vehicles() {
  const { isDark } = useTheme();

  const [viewForm, setViewForm] = useState(false);
  const [element, setElement] = useState<string>('');
  const [toDelete, setToDelete] = useState(false);

  const formData = useForm({
    initialValues: {
      username: '',
      first_name: '',
      last_name: '',
      id: '',
      role: '',
      password: '',
    },
  });

  const handleEdit = (item: any) => {
    formData.setValues(item);
    setViewForm(true);
  };

  const handleDelete = (item: Role) => {
    setToDelete(true);
    setElement(item._id);
  };

  useEffect(() => {
    console.log(element);
  }, [element]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Title size="3xl" isDark={isDark}>{viewForm ? 'Create Employee' : 'Employees'}</Title>

        {!viewForm && (
          <Button onClick={() => setViewForm(true)} isDark={isDark} isSubmit>
            Add New
          </Button>
        )}
      </div>

      {viewForm
        ? <Form formData={formData} setViewForm={setViewForm} />
        : <Table
          data={data}
          columns={columns}
          isDark={isDark}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      }

      {toDelete && (
        <Deleting
          isOpen={toDelete}
          onClose={() => setToDelete(false)}
          onDelete={() => {
            setToDelete(false);
          }}
          itemName={element}
        />
      )}
    </div>
  );
}
