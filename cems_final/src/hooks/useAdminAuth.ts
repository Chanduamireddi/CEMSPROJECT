import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAdminAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || role !== "admin") {
        router.push("/login");
      }
    }
  }, [router]);
};