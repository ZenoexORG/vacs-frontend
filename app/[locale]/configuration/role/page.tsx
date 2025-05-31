'use client';

import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Title } from "@atoms/Title";
import { Button } from "@atoms/Button";
import { Table } from "@organisms/Table";
import { useTheme } from "@contexts/themeContext";
import { useT } from "../../../i18n/useT";
import RoleAPI from "@hooks/configuration/role/role";
import PermissionAPI from "@hooks/no-modules/permission";
import Form from "./form";
import Deleting from "@components/modals/Deleting";
import { Role } from "../../../../types/roles";

export default function Page() {
  const { isDark } = useTheme();
  const { t } = useT('role');

  const [data, setData] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const [viewForm, setViewForm] = useState(false);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);

  const limit = 6;

  const formData = useForm({
    initialValues: {
      name: '',
      type: '',
      permissions: [],
      color: '',
    },
  });

  const columns = [
    { key: 'name', label: t('name') },
    {
      key: 'type',
      label: t('type'),
      type: 'badge',
      badgeColorMap: {
        software: '#00B69B',
        utb: '#FFA756',
      },
    },
    { key: 'permissions', label: t('permissions') },
    { key: 'color', label: t('color') },
    { key: 'actions', label: t('actions') },
  ];

  const fetchData = async (pageToFetch = 1) => {
    setLoading(true);
    try {
      const response = await RoleAPI.list(pageToFetch, limit);
      setData(response.data);
      setPage(response.meta.page);
      setTotalPages(response.meta.total_pages);
    } catch (error) {
      console.error('Error fetching roles', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await PermissionAPI.list(1, 100);
      setPermissions(response.data);
    } catch (error: any) {
      console.error('Error fetching permissions', error);
    }
  };

  const handleEdit = (role: Role) => {
    formData.setValues(role as any);
    setViewForm(true);
  };

  const handleDelete = async () => {
    if (!deletingRole) return;

    try {
      await RoleAPI.delete(deletingRole.id);
      setDeletingRole(null);
      fetchData(page);
    } catch (error) {
      console.error('Error deleting role', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPermissions();
  }, []);

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

      {viewForm ? (
        <Form
          formData={formData}
          setViewForm={setViewForm}
          permissions={permissions}
          onSuccess={() => fetchData(1)}
        />
      ) : loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      ) : (
        <Table
          data={data}
          columns={columns}
          page={page}
          total={totalPages}
          isDark={isDark}
          onEdit={handleEdit}
          onDelete={(role: Role) => setDeletingRole(role)}
          onPageChange={(newPage: number) => {
            if (newPage < 1 || newPage > totalPages) return;
            fetchData(newPage);
          }}
        />
      )}

      {deletingRole && (
        <Deleting
          isOpen={!!deletingRole}
          onClose={() => setDeletingRole(null)}
          onDelete={handleDelete}
          itemName={deletingRole.name}
        />
      )}
    </div>
  );
}
