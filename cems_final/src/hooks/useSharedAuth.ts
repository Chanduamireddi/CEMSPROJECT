import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useSharedAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || (role !== "admin" && role !== "user")) {
      router.push("/login");
    }
  }, [router]);
};