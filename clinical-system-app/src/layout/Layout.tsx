import { AccountCircleIcon, HomeIcon, LogoutIcon, MedicalServicesIcon } from "../shared/materialUI";
import { Link, Outlet as Page, useNavigate } from "react-router-dom"
import { menu } from "./menu"
import './layout.css'

export const Layout = () => {
    const navigate = useNavigate();

    const setIcon = (actionIcon: string) => {
        if (actionIcon == "home") return <HomeIcon />;
        if (actionIcon == "services") return <MedicalServicesIcon />;
    };

    const logout = () => {
        navigate('/');
    }

    return (
        <div className="w-screen h-screen">
            <div className="bg-white text-white shadow w-full p-2 flex items-center justify-between h-[5rem]">
                <div className="flex items-center">
                    <div className="hidden md:flex items-center gap-5 py-3 px-2 rounded-xl transition duration-300 cursor-pointer hover:bg-gray-300">
                        <div className="imageLogo"></div>
                        <h2 className="font-bold text-xl text-black">Laboratorio Clínico Hinestroza Ferrer C.A </h2>
                    </div>
                </div>

                <div className="text-black flex items-center justify-center gap-3 rounded-xl py-3 px-5 transition duration-300 cursor-pointer hover:bg-[#007fff]">
                    Usuario
                    <AccountCircleIcon/>
                </div>
            </div>


            <div className="flex h-[91%]">
                <div className="p-2 bg-white w-60 flex flex-col hidden md:flex h-full">
                    <nav>
                        {menu.map((list, index) => (
                            <Link to={list.redirectTo} key={index} className="flex gap-3 text-black py-2.5 px-4 my-4 rounded transition duration-300 hover:bg-[#007fff] hover:text-white">
                                {setIcon(list.icon)}<p>{list.title}</p>
                            </Link>
                        ))}
                    </nav>

                    <p onClick={logout} className="flex gap-2 text-black py-2.5 px-4 my-2 rounded transition duration-300 hover:bg-[#007fff] hover:text-white mt-auto cursor-pointer">
                        <LogoutIcon/> Cerrar sesión
                    </p>
                </div>

                <div className="flex items-start justify-center w-full bg-white rounded-2xl m-8 py-14 text-black">
                    <Page />
                </div>
            </div>
        </div>
    )
}
