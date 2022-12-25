import React from "react";
import Link from "next/link";
import type { NavProps } from "./types";
import {
  IoHomeOutline,
  IoMailOutline,
  IoPeopleOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";

export default function Navbar(props: NavProps) {
  if (!props.user || !props.page) {
    return (
      <div className="flex justify-between w-full">
        <div className="flex"></div>
        <div
          onClick={() => signOut({ callbackUrl: "/" })}
          className="p-8 border h-12 w-12 bg-white border-gray-100 rounded-xl shadow-md"
        >
          <IoLogOutOutline className="scale-[1.75] -translate-y-2/4 -translate-x-1/3" />
        </div>
      </div>
    );
  }

  console.log("HI");
  return (
    <div className="flex justify-between w-full my-4">
      <div className="flex">
        <Link href="/">
          <div
            className={`${
              props.page == "home" ? "" : "shadow-md"
            } p-8 mr-4 border h-12 w-12 bg-white border-gray-100 rounded-xl`}
          >
            <IoHomeOutline className="scale-[1.75] -translate-y-2/4 -translate-x-1/2" />
          </div>
        </Link>
        {(props.user.is_mentor || props.user.is_admin) && (
          <Link href="/mentor">
            <div
              className={`${
                props.page == "mentor" ? "" : "shadow-md"
              } p-8 mr-4 border h-12 w-12 bg-white border-gray-100 rounded-xl`}
            >
              <IoMailOutline className="scale-[1.75] -translate-y-2/4 -translate-x-1/2" />
            </div>
          </Link>
        )}
        {props.user.is_admin && (
          <Link href="/admin">
            <div
              className={`${
                props.page == "admin" ? "" : "shadow-md"
              } p-8 mr-4 border h-12 w-12 bg-white border-gray-100 rounded-xl`}
            >
              <IoPeopleOutline className="scale-[1.75] -translate-y-2/4 -translate-x-1/2" />
            </div>
          </Link>
        )}
      </div>
      <div
        onClick={() => signOut({ callbackUrl: "/" })}
        className="p-8 border h-12 w-12 bg-white border-gray-100 rounded-xl shadow-md"
      >
        <IoLogOutOutline className="scale-[1.75] -translate-y-2/4 -translate-x-1/3" />
      </div>
    </div>
  );
}
