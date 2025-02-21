"use client";

import Image from "next/image";
import { PasswordHide, PasswordShow } from "@public/icons";
import { ChangeEvent, useState } from "react";

type TUserInput = {
  id: string;
  type: string;
  name?: string;
  title: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ id, type, name, title, ...restProps }: TUserInput) {
  const [pwToggle, setPwToggle] = useState(false);

  return (
    <div className="inputWrap">
      <label htmlFor="password">{title}</label>
      <div
        className={`flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:border-main-600 ${
          type === "password" && "justify-between"
        }`}
      >
        <input
          id={id}
          type={type === "password" && pwToggle ? "text" : type}
          name={name ? name : id}
          maxLength={id === "name" ? 4 : id === "phone" ? 13 : 30}
          className="w-full p-3 focus:outline-none placeholder:text-xs"
          {...restProps}
          required
        />
        {(id === "password" || id === "pwCheck") && (
          <button
            type="button"
            className="p-1 mx-2 hover:bg-slate-50 hover:rounded-md"
            onClick={() => setPwToggle(!pwToggle)}
          >
            <Image
              src={pwToggle ? PasswordShow : PasswordHide}
              alt={pwToggle ? "비밀번호 숨기기" : "비밀번호 보기"}
            />
          </button>
        )}
      </div>
    </div>
  );
}
