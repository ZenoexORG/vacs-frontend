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
import { Vehicle, VehicleType } from "../../../../types/vehicles";
import { User } from "../../../../types/users";
import VehicleAPI from "@hooks/configuration/vehicle/vehicle";
import VehicleTypeAPI from "@hooks/configuration/vehicle/vehicleType";
import UserAPI from "@hooks/configuration/user/user";

export default function Page() {
  const { isDark } = useTheme();
  const { t } = useT('vehicle');

  const [data, setData] = useState<Vehicle[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const [viewForm, setViewForm] = useState(false);
  const [deletingItem, setDeletingItem] = useState<Vehicle | null>(null);

  const limit = 6;

  const formData = useForm({
    initialValues: {
      id: '',
      type_id: 0,
      owner_id: '',
      soat: '',
    },
  });

  const columns = [
    { key: 'id', label: t('id') },
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
    { key: 'fullname', label: t('user_name') },
    { key: 'actions', label: t('actions') },
  ];

  const fetchData = async (pageToFetch = 1) => {
    setLoading(true);

    try {
      const response = await VehicleAPI.list(pageToFetch, limit);
      setData(response.data);
      setPage(response.meta.page);
      setTotalPages(response.meta.total_pages);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching vehicles', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchVehicleType = async () => {
    try {
      const response = await VehicleTypeAPI.list(1, 100);
      setVehicleTypes(response.data);
    } catch (error) {
      console.error('Error fetching vehicle types', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await UserAPI.list(1, 100);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    formData.setValues(vehicle);
    setViewForm(true);
  };

  const handleDelete = async () => {
    if (!deletingItem) return;

    try {
      await VehicleAPI.delete(deletingItem.id);
      setDeletingItem(null);
      fetchData(page);
    } catch (error) {
      console.error('Error deleting vehicle', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVehicleType();
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Title size="3xl" isDark={isDark}>
          {viewForm ? t('create_user') : t('vehicles')}
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
          vehicleTypes={vehicleTypes}
          users={users}
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
          onDelete={(item: Vehicle) => setDeletingItem(item)}
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
          itemName={deletingItem.id}
        />
      )}
    </div>
  );
}
