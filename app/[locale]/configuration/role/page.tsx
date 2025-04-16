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
    name: 'Admin',
    type: 'software',
    permissions: [
      "users:create",
      "users:read",
      "users:write",
      "users:delete",
      "access-log:view",
      "incidents:read",
      "incidents:edit",
    ],
    color: '#739163',
  },
  {
    _id: '2',
    name: 'Cleaner',
    type: 'utb',
    permissions: [
      "dashboard:view",
      "employees:view",
      "employees:edit",
      "employees:create",
      "users:view",
      "users:edit",
      "roles:view",
      "roles:edit",
      "roles:create",
    ],
    color: '#739163',
  },
];

export default function Roles() {
  const { isDark } = useTheme();
  const { t } = useT('role');

  const columns = [
    { key: 'name', label: t('name') },
    {
      key: 'type',
      label: t('type'),
      type: 'badge',
      badgeColorMap: {
        'software': '#00B69B',
        'utb': '#FFA756'
      }
    },
    { key: 'permissions', label: t('permissions') },
    { key: 'color', label: t('color') },
    { key: 'actions', label: t('actions') },
  ];

  const [viewForm, setViewForm] = useState(false);
  const [element, setElement] = useState<string>('');
  const [toDelete, setToDelete] = useState(false);

  const formData = useForm({
    initialValues: {
      name: '',
      type: '',
      permissions: [],
      color: '',
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
          {viewForm ? t('create_role') : t('roles')}
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
