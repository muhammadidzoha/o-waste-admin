import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { PiEyeSlashLight, PiEyeLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(null);
  const [role, setRole] = useState("Admin");

  useEffect(() => {
    const storedData = sessionStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values) => {
    const formDataToSend = new FormData();
    formDataToSend.append("Email_UA_Input", values.email);
    formDataToSend.append("Password_UA_Input", values.password);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN}`,
        formDataToSend,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );

      if (response.data.Role !== role) {
        toast.error("Akun ini tidak valid untuk mengakses fitur", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        sessionStorage.setItem("isLoggedIn", false);
      } else {
        sessionStorage.setItem("data", JSON.stringify(response.data));
        sessionStorage.setItem("isLoggedIn", true);

        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.status, {
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

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: null,
      password: null,
    },
    onSubmit,
  });

  console.log(values);

  return (
    <div className="flex">
      <div className="w-6/12">
        <div className="flex items-center justify-center w-full h-screen">
          <div>
            <Typography variant="h2">Masuk</Typography>
            <Typography>Masukan email dan password untuk masuk</Typography>
            <form
              className="flex flex-col space-y-5 mt-10"
              onSubmit={handleSubmit}
            >
              <Input
                label="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Password"
                type={showPassword ? "text" : "password"}
                icon={
                  <div onClick={toggleShowPassword} className="cursor-pointer">
                    {showPassword ? <PiEyeLight /> : <PiEyeSlashLight />}
                  </div>
                }
              />
              <Button type="submit" className="bg-[#004D3D]">
                Masuk
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-6/12">
        <img
          src="/bg.jpg"
          alt="bg"
          className="rounded-bl-[25%] absolute right-0 h-full w-6/12 object-cover object-center"
        />
      </div>
    </div>
  );
};

export default SignIn;
