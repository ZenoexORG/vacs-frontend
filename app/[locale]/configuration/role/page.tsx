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
import RoleAPI from "@hooks/configuration/role/role";
import PermissionAPI from "@hooks/no-modules/permission";

export default function Roles() {
  const { isDark } = useTheme();
  const { t } = useT('role');

  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const limit = 6;

  const [loading, setLoading] = useState(true);

  const [permissions, setPermissions] = useState([]);

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

  const fetchData = async () => {
    setLoading(true);

    try {
      const dataResponse = await RoleAPI.list(1, limit);
      setData(dataResponse.data);
      setPage(dataResponse.meta.page);
      setTotal(dataResponse.meta.total_pages);

      const permissionsResponse = await PermissionAPI.list(1, 100);
      console.log(dataResponse);

      setPermissions(permissionsResponse.data);
      console.log(permissionsResponse);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item: any) => {
    formData.setValues(item);
    setViewForm(true);
  };

  const handleDelete = (item: Role) => {
    setToDelete(true);

    try {
      RoleAPI.delete(item.id);
    } catch (error) {
      console.error(error);
    }
  };

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
        ? <Form formData={formData} setViewForm={setViewForm} permissions={permissions} />
        : <Table
          data={data}
          columns={columns}
          page={page}
          total={total}
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
