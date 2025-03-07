"use server";

import { ProfileSchema } from "@/types/model/User";
import connectDB from "../db";
import { User } from "../schema";

export async function getUserData(userId: string) {
  if (!userId) {
    return { state: false, message: "유효한 id가 없습니다." };
  }
  await connectDB();

  try {
    const result: ProfileSchema | null = await User.findById(userId);

    if (!result) {
      return { state: false, message: "사용자 데이터를 찾을 수 없습니다." };
    }

    const data = JSON.parse(JSON.stringify(result));

    return { state: true, data };
  } catch (error: any) {
    console.error("error", error.message);
    return { state: false, message: "잘못된 시도입니다. userId: " + userId };
  }
}
