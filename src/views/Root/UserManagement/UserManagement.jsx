import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const columnData = ({ mutate, indexOfFirstItem }) => [
  {
    accessorKey: "",
    header: "No",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.row.index + 1 + indexOfFirstItem}
      </Typography>
    ),
  },
  {
    accessorKey: "Name_UD",
    header: "Nama",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "Email_UA",
    header: "Email",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "Address_UD",
    header: "Alamat",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "Balance_UD",
    header: "Balance",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "RoleAccess_UA",
    header: "Role",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "",
    header: "Aksi",
    cell: (props) => {
      const [open, setOpen] = useState(false);

      const handleOpen = () => {
        setOpen(!open);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handleDelete = async (UUID_UA) => {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}${
            import.meta.env.VITE_DELETE_USER
          }/${UUID_UA}`
        );
        mutate("users");
        toast.success(response.data.status, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      };

      const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append("UUID_UA", values.id);
        formData.append("Email_UA", values.email);
        formData.append("Password_UA", values.password);
        formData.append("RoleAccess_UA", values.role);
        formData.append("Name_UD", values.nama);
        formData.append("Birthplace_UD", values.tempat);
        formData.append("Birthdate_UD", values.tanggalLahir);
        formData.append("Address_UD", values.alamat);
        formData.append("Balance_UD", values.balance);

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${
              import.meta.env.VITE_UPDATE_USER
            }`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          toast.success(response.data.status, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          mutate("users");
          handleClose();
        } catch (error) {
          toast.error(error.response.data.Error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      };

      const [currentID, setCurrentID] = useState(null);

      const { values, handleChange, handleBlur, handleSubmit, setValues } =
        useFormik({
          initialValues: {
            id: "",
            email: "",
            password: "",
            role: "",
            nama: "",
            tempat: "",
            tanggalLahir: "",
            alamat: "",
            balance: "",
          },
          onSubmit,
        });

      // console.log(values);

      const handleEdit = async (UUID_UA) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}${
              import.meta.env.VITE_USER_DETAIL
            }/${UUID_UA}`
          );

          const data = response.data;

          setValues({
            id: data[0]?.UUID_UA,
            email: data[0]?.Email_UA,
            password: data[0]?.Password_UA,
            role: data[0]?.RoleAccess_UA,
            nama: data[0]?.Name_UD,
            tempat: data[0]?.Birthplace_UD,
            tanggalLahir: data[0]?.Birthdate_UD,
            alamat: data[0]?.Address_UD,
            balance: data[0]?.Balance_UD,
          });

          setCurrentID(UUID_UA);
          handleOpen();
        } catch (error) {
          console.log(error.message);
        }
      };

      return (
        <div className="flex justify-center gap-3">
          <Dialog
            open={open}
            handler={handleOpen}
            className="!min-w-[25%] !max-w-[200px]"
          >
            <DialogHeader>
              <Typography variant="h4" color="gray">
                Edit User
              </Typography>
            </DialogHeader>
            <DialogBody>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-5">
                  <Input
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Input
                    label="Nama"
                    name="nama"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nama}
                  />
                  <Input
                    label="Alamat"
                    name="alamat"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.alamat}
                  />
                </div>
                <div className="flex mt-5 justify-end">
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                  >
                    <span>Kembali</span>
                  </Button>
                  <Button type="submit" className="bg-[#004D3D]">
                    <span>Perbarui</span>
                  </Button>
                </div>
              </form>
            </DialogBody>
          </Dialog>
          <Button
            className="bg-[#004D3D]"
            onClick={() => handleEdit(props.row.original.UUID_UA)}
          >
            Ubah
          </Button>
          <Button
            className="bg-[#004D3D]"
            onClick={() => handleDelete(props.row.original.UUID_UA)}
          >
            Hapus
          </Button>
        </div>
      );
    },
  },
];

const columnDataDriver = ({ mutate, indexOfFirstItem }) => [
  {
    accessorKey: "",
    header: "No",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.row.index + 1 + indexOfFirstItem}
      </Typography>
    ),
  },
  {
    accessorKey: "Name_UD",
    header: "Nama",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "Email_UA",
    header: "Email",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "Address_UD",
    header: "Alamat",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "Balance_UD",
    header: "Balance",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "RoleAccess_UA",
    header: "Role",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "",
    header: "Aksi",
    cell: (props) => {
      const [open, setOpen] = useState(false);

      const handleOpen = () => {
        setOpen(!open);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handleDelete = async (UUID_UA) => {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}${
            import.meta.env.VITE_DELETE_DRIVER
          }/${UUID_UA}`
        );
        mutate("drivers");
        toast.success(response.data.status, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      };

      const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append("UUID_UA", values.id);
        formData.append("Email_UA", values.email);
        formData.append("Password_UA", values.password);
        formData.append("RoleAccess_UA", values.role);
        formData.append("Name_UD", values.nama);
        formData.append("Birthplace_UD", values.tempat);
        formData.append("Birthdate_UD", values.tanggalLahir);
        formData.append("Address_UD", values.alamat);
        formData.append("Balance_UD", values.balance);

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${
              import.meta.env.VITE_UPDATE_DRIVER
            }`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          toast.success(response.data.status, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          mutate("drivers");
          handleClose();
        } catch (error) {
          handleClose();
          toast.error(error.response.data.Error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      };

      const [currentID, setCurrentID] = useState(null);

      const { values, handleChange, handleBlur, handleSubmit, setValues } =
        useFormik({
          initialValues: {
            id: "",
            email: "",
            password: "",
            role: "",
            nama: "",
            tempat: "",
            tanggalLahir: "",
            alamat: "",
            balance: "",
          },
          onSubmit,
        });

      const handleEdit = async (UUID_UA) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}${
              import.meta.env.VITE_DRIVER_DETAIL
            }/${UUID_UA}`
          );

          const data = response.data;

          setValues({
            id: data[0]?.UUID_UA,
            email: data[0]?.Email_UA,
            password: data[0]?.Password_UA,
            role: data[0]?.RoleAccess_UA,
            nama: data[0]?.Name_UD,
            tempat: data[0]?.Birthplace_UD,
            tanggalLahir: data[0]?.Birthdate_UD,
            alamat: data[0]?.Address_UD,
            balance: data[0]?.Balance_UD,
          });

          setCurrentID(UUID_UA);
          handleOpen();
        } catch (error) {
          console.log(error.message);
        }
      };

      return (
        <div className="flex justify-center gap-3">
          <Dialog
            open={open}
            handler={handleOpen}
            className="!min-w-[25%] !max-w-[200px]"
          >
            <DialogHeader>
              <Typography variant="h4" color="gray">
                Edit User
              </Typography>
            </DialogHeader>
            <DialogBody>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-5">
                  <Input
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Input
                    label="Nama"
                    name="nama"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nama}
                  />
                  <Input
                    label="Alamat"
                    name="alamat"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.alamat}
                  />
                </div>
                <div className="flex mt-5 justify-end">
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                  >
                    <span>Kembali</span>
                  </Button>
                  <Button type="submit" className="bg-[#004D3D]">
                    <span>Perbarui</span>
                  </Button>
                </div>
              </form>
            </DialogBody>
          </Dialog>
          <Button
            className="bg-[#004D3D]"
            onClick={() => handleEdit(props.row.original.UUID_UA)}
          >
            Ubah
          </Button>
          <Button
            className="bg-[#004D3D]"
            onClick={() => handleDelete(props.row.original.UUID_UA)}
          >
            Hapus
          </Button>
        </div>
      );
    },
  },
];

const UserManagement = () => {
  const [dataLogin, setDataLogin] = useState(null);
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const columns = columnData({ mutate, indexOfFirstItem });
  const columnsDriver = columnDataDriver({ mutate, indexOfFirstItem });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const storedData = sessionStorage.getItem("data");
    if (storedData) {
      setDataLogin(JSON.parse(storedData));
    }
  }, []);

  const fetcher = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_USER_LIST}`
    );
    return response.data;
  };

  const fetchDriver = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DRIVER_LIST}`
    );
    return response.data;
  };

  const { data } = useSWR("users", fetcher);
  const { data: driver } = useSWR("drivers", fetchDriver);

  if (!data || !driver) return <div>Loading...</div>;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <div>
        <Card>
          <CardBody>
            <Typography variant="h6" className="py-2">
              Tabel User List
            </Typography>
            <Table columnsData={columns} tableData={currentItems} />
            <div className="flex items-center justify-between mt-5">
              <Typography variant="small" color="gray">
                Halaman {currentPage} dari {totalPages}
              </Typography>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    size="sm"
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className="bg-[#004D3D]"
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="mt-5">
        <Card>
          <CardBody>
            <Typography variant="h6" className="py-2">
              Tabel Driver List
            </Typography>
            <Table columnsData={columnsDriver} tableData={driver} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
