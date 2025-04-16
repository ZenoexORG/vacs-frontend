'use client';

import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { Table } from "@organisms/Table";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button } from "@atoms/Button";
import Form from "./form";
import { Role } from "../../../../types/roles";
import Deleting from "@components/modals/Deleting";
import { useT } from "../../../i18n/useT";

const data = [
  {
    _id: '1',
    license_plate: 'VKS-250',
    type: 'authorized',
    soat: '25-10-2022',
    user_id: '123456789',
    user_name: 'John Doe'
  },
  {
    _id: '2',
    license_plate: 'MWP-123',
    type: 'visitor',
    soat: '01-09-2026',
    user_id: '987654321',
    user_name: 'Jane Smith'
  },
  {
    _id: '3',
    license_plate: 'ABC-456',
    type: 'authorized',
    soat: '15-05-2023',
    user_id: '456789123',
    user_name: 'Alice Johnson'
  },
  {
    _id: '4',
    license_plate: 'XYZ-789',
    type: 'visitor',
    soat: '10-12-2025',
    user_id: '321654987',
    user_name: 'Bob Brown'
  },
  {
    _id: '5',
    license_plate: 'LMN-234',
    type: 'visitor',
    soat: '20-03-2024',
    user_id: '654321987',
    user_name: 'Charlie Green'
  },
  {
    _id: '6',
    license_plate: 'OPQ-567',
    type: 'authorized',
    soat: '30-06-2027',
    user_id: '789123456',
    user_name: 'Diana White'
  }
];

export default function Vehicles() {
  const { isDark } = useTheme();
  const { t } = useT('vehicle');

  const columns = [
    { key: 'license_plate', label: t('id') },
    {
      key: 'type',
      label: t('type'),
      type: 'badge',
      badgeColorMap: {
        'authorized': '#00B69B',
        'visitor': '#FFA756'
      }
    },
    { key: 'soat', label: t('soat') },
    { key: 'user_id', label: t('user_id') },
    { key: 'user_name', label: t('user_name') },
    { key: 'actions', label: t('actions') },
  ];

  const [viewForm, setViewForm] = useState(false);
  const [element, setElement] = useState<string>('');
  const [toDelete, setToDelete] = useState(false);

  const formData = useForm({
    initialValues: {
      license_plate: '',
      type: '',
      user_id: '',
      soat: '',
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
        <Title size="3xl" isDark={isDark}>
          {viewForm ? t('create_vehicle') : t('vehicles')}
        </Title>

        {!viewForm && (
          <Button onClick={() => setViewForm(true)} isDark={isDark} isSubmit>
            {t('add_new')}
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
