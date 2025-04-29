'use client';

import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { Table } from "@organisms/Table";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button } from "@atoms/Button";
import Form from "./form";
import Deleting from "@components/modals/Deleting";
import { useT } from "../../../i18n/useT";
import { Role } from "../../../../types/roles";
import { User } from "../../../../types/users";
import UserAPI from "@hooks/configuration/user/user";
import RoleAPI from "@hooks/configuration/role/role";

export default function Page() {
  const { isDark } = useTheme();
  const { t } = useT('user');

  const [data, setData] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const [viewForm, setViewForm] = useState(false);
  const [deletingItem, setDeletingItem] = useState<User | null>(null);

  const limit = 6;

  const formData = useForm({
    initialValues: {
      id: '',
      kind_id: '',
      name: '',
      last_name: '',
      gender: '',
      role_id: '',
    },
  });

  const columns = [
    { key: 'id', label: t('id') },
    { key: 'name', label: t('name') },
    { key: 'last_name', label: t('last_name') },
    {
      key: 'role',
      label: t('role'),
      type: 'badge'
    },
    { key: 'actions', label: t('actions') },
  ];

  const fetchData = async (pageToFetch = 1) => {
    setLoading(true);

    try {
      const response = await UserAPI.list(pageToFetch, limit);
      setData(response.data);
      setPage(response.meta.page);
      setTotalPages(response.meta.total_pages);
    } catch (error) {
      console.error('Error fetching users', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await RoleAPI.list(1, 100);
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles', error);
    }
  };

  const handleEdit = (role: Role) => {
    formData.setValues(role);
    setViewForm(true);
  };

  const handleDelete = async () => {
    if (!deletingItem) return;

    try {
      await UserAPI.delete(deletingItem.id);
      setDeletingItem(null);
      fetchData(page);
    } catch (error) {
      console.error('Error deleting role', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRoles();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Title size="3xl" isDark={isDark}>
          {viewForm ? t('create_user') : t('users')}
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
          roles={roles}
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
          onDelete={(item: User) => setDeletingItem(item)}
          onPageChange={(newPage: number) => {
            if (newPage < 1 || newPage > totalPages) return;
            fetchData(newPage);
          }}
        />
      )}

      {deletingItem && (
        <Deleting
          isOpen={!!deletingItem}
          onClose={() => setDeletingItem(null)}
          onDelete={handleDelete}
          itemName={deletingItem.name}
        />
      )}
    </div>
  );
}
